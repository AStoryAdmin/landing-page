/**
 * Snapshots each route of the built site to static HTML.
 *
 * The site is a client-rendered SPA, which means a social crawler — LinkedIn,
 * Slack, X, iMessage — sees only the generic tags in index.html and shows the
 * same card no matter which page was shared. Search engines run JS, but they
 * do it slowly and inconsistently.
 *
 * This loads the production build in a headless browser, lets React render and
 * `applySeo` write the per-route head tags, then writes the resulting document
 * to dist/<route>/index.html. On a real visit React still boots and takes over;
 * the snapshot is what non-JS consumers get.
 *
 * Run with `npm run build:static`. Requires the playwright devDependency —
 * plain `npm run build` never touches it, so CI without browsers still works.
 */
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const PORT = 4179;

const ROUTES = [
    '/', '/experience', '/family', '/organizations', '/institution',
    '/pricing', '/story', '/faq', '/privacy', '/terms',
];

const MIME = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
    '.jpg': 'image/jpeg', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
    '.xml': 'application/xml', '.txt': 'text/plain',
};

/* A minimal static server with SPA fallback — enough to render the build. */
const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = resolve(dist, '.' + url);
    if (!file.startsWith(dist)) {
        res.writeHead(403).end();
        return;
    }
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

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
/*
 * Rendering with reduced motion makes Reveal start visible, so the captured
 * markup and CSS describe the finished page rather than a screen of elements
 * at opacity 0. A real visit re-renders with animation intact.
 */
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
const page = await context.newPage();

for (const route of ROUTES) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);

    const dir = route === '/' ? dist : join(dist, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    console.log(`prerendered ${route.padEnd(16)} ${(html.length / 1024).toFixed(0)} KB`);
}

await context.close();
await browser.close();
server.close();
console.log(`\n${ROUTES.length} routes written to dist/`);
