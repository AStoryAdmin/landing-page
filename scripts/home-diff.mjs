/**
 * Home pixel diff (premium pass, design spec Check 3.00).
 *
 * The home page "/" must stay pixel-identical outside the header and footer.
 * This builds a baseline from a git ref (default origin/main) with the P0
 * commit applied, and compares it with the current tree's build:
 *   - "/" full page at 390×844 and 1440×900, reduced motion, fonts loaded,
 *     every lazy image scrolled into view first;
 *   - the header, the footer and the phone sticky bar masked (chrome);
 *   - pixelmatch, threshold 0.1; pass at 0 changed pixels or ≤ 0.1 %.
 * Diff PNGs go to qa/premium-2026-11/after/home-diff-<390|1440>.png.
 *
 *   node scripts/home-diff.mjs [--base origin/main] [--p0 <sha>|auto|none]
 *                              [--rebuild-base] [--build] [--out <dir>]
 *
 * --p0 auto (the default) picks the newest commit on site-premium whose
 * message starts with "P0 deploy first:"; if there is none yet the baseline
 * is the bare ref, and the script says so.
 * The baseline worktree and build are cached in the OS temp folder, keyed by
 * ref + P0 sha. --build rebuilds the candidate (otherwise dist/ is used if
 * it exists). Exits 1 on a failing diff.
 */
import { execFileSync, execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback) => {
    const i = process.argv.indexOf('--' + name);
    return i > -1 ? process.argv[i + 1] : fallback;
};
const flag = (name) => process.argv.includes('--' + name);
const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim();
const out = resolve(arg('out', join(root, '..', 'a-story-landing-premium', 'qa', 'premium-2026-11', 'after')));
mkdirSync(out, { recursive: true });

/* ---- the baseline ------------------------------------------------------- */
const baseRef = arg('base', 'origin/main');
const baseSha = git('rev-parse', baseRef);
let p0 = arg('p0', 'auto');
if (p0 === 'auto') {
    p0 = '';
    for (const ref of ['site-premium', 'HEAD']) {
        try {
            p0 = git('log', ref, '--format=%H', '-1', '--grep=^P0 deploy first:');
        } catch {
            /* the ref may not exist here */
        }
        if (p0) break;
    }
}
if (p0 === 'none') p0 = '';
console.log(`baseline: ${baseRef} (${baseSha.slice(0, 8)})${p0 ? ' + P0 ' + p0.slice(0, 8) : ' (no P0 commit found: bare ref)'}`);

const baseDir = join(tmpdir(), `asl-home-diff-${baseSha.slice(0, 10)}${p0 ? '-' + p0.slice(0, 10) : ''}`);
const baseDist = join(baseDir, 'dist');
if (flag('rebuild-base') || !existsSync(join(baseDist, 'index.html'))) {
    if (!existsSync(baseDir)) {
        git('worktree', 'add', '--detach', baseDir, baseSha);
        if (p0) execFileSync('git', ['cherry-pick', '--no-commit', p0], { cwd: baseDir, stdio: 'inherit' });
        /* The same dependencies as this tree: a junction, not a second install. */
        symlinkSync(join(root, 'node_modules'), join(baseDir, 'node_modules'), 'junction');
    }
    console.log('building the baseline (npm run build:static)…');
    execSync('npm run build:static', { cwd: baseDir, stdio: 'inherit' });
}

/* ---- the candidate ------------------------------------------------------ */
const candDist = join(root, 'dist');
if (flag('build') || !existsSync(join(candDist, 'index.html'))) {
    console.log('building the candidate (npm run build:static)…');
    execSync('npm run build:static', { cwd: root, stdio: 'inherit' });
}

/* ---- serve both --------------------------------------------------------- */
const MIME = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
    '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.json': 'application/json',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.vtt': 'text/vtt',
    '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain',
};
const serve = (dist, port) =>
    new Promise((ok) => {
        const server = createServer((req, res) => {
            const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
            let file = resolve(dist, '.' + url);
            if (!file.startsWith(dist)) return res.writeHead(403).end();
            if (existsSync(join(file, 'index.html'))) file = join(file, 'index.html');
            let body;
            try {
                body = readFileSync(file);
            } catch {
                file = join(dist, 'index.html');
                body = readFileSync(file);
            }
            res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
            res.end(body);
        });
        server.listen(port, () => ok(server));
    });
const servers = [await serve(baseDist, 5291), await serve(candDist, 5292)];

/* ---- shoot -------------------------------------------------------------- */
const browser = await chromium.launch();
const shoot = async (port, width, height) => {
    const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    /* Bring every lazy image in, then go back to the top. */
    await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
            scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
        }
        scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    const box = await page.evaluate(() => {
        const r = (el) => (el ? el.getBoundingClientRect() : null);
        const f = r(document.querySelector('#main ~ footer'));
        return { footerTop: f ? f.top + scrollY : document.documentElement.scrollHeight };
    });
    const mask = [page.locator('header.gf-header'), page.locator('#main ~ footer'), page.locator('#main > div[data-shown]')];
    const png = PNG.sync.read(await page.screenshot({ fullPage: true, mask, maskColor: '#FF00FF', animations: 'disabled' }));
    await ctx.close();
    return { png, footerTop: Math.round(box.footerTop) };
};
const crop = (png, h) => {
    const outPng = new PNG({ width: png.width, height: h });
    PNG.bitblt(png, outPng, 0, 0, png.width, h, 0, 0);
    return outPng;
};

let failed = false;
for (const [width, height] of [[390, 844], [1440, 900]]) {
    const a = await shoot(5291, width, height);
    const b = await shoot(5292, width, height);
    const h = Math.min(a.footerTop, b.footerTop, a.png.height, b.png.height);
    const A = crop(a.png, h), B = crop(b.png, h);
    const diff = new PNG({ width, height: h });
    const changed = pixelmatch(A.data, B.data, diff.data, width, h, { threshold: 0.1 });
    const ratio = changed / (width * h);
    writeFileSync(join(out, `home-diff-${width}.png`), PNG.sync.write(diff));
    const sameHeight = a.footerTop === b.footerTop;
    const ok = sameHeight && (changed === 0 || ratio <= 0.001);
    if (!ok) failed = true;
    console.log(
        `${ok ? 'PASS' : 'FAIL'}  home @${width}: ${changed} changed px of ${width * h} (${(ratio * 100).toFixed(4)} %)` +
            `; main height base ${a.footerTop} / candidate ${b.footerTop}${sameHeight ? '' : ' (DIFFERENT)'}` +
            ` → ${join(out, `home-diff-${width}.png`)}`,
    );
}
await browser.close();
servers.forEach((s) => s.close());
process.exit(failed ? 1 : 0);
