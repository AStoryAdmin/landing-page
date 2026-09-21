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

import { routes } from './site-routes.mjs';
// The design page receives a noindex HTML snapshot but never enters the sitemap.
const ROUTES = [...routes, '/__design/a-story-home-vnext'];

const MIME = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
    '.webmanifest': 'application/manifest+json',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
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
    res.writeHead(200, {
        'Content-Type': MIME[extname(file)] ?? 'application/octet-stream',
    });
    res.end(body);
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
/*
 * Rendering with reduced motion makes Reveal start visible, so the captured
 * markup and CSS describe the finished page rather than a screen of elements
 * at opacity 0. A real visit re-renders with animation intact.
 */
const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
});
const page = await context.newPage();

for (const route of ROUTES) {
    await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle',
    });
    await page.waitForTimeout(150);

    const raw = await page.evaluate(() => {
        // Use responsive CSS defaults until the real viewport is measured.
        const snapshot = document.documentElement.cloneNode(true);
        snapshot.style.removeProperty('--nav-total');
        // styled-components inserts rules through CSSOM in production. Empty
        // <style> markup alone loses those rules for non-JS readers and makes
        // the first paint jump. Serialize rules into the snapshot, leaving the
        // live stylesheet untouched for the next route.
        const liveStyles = document.querySelectorAll('style[data-styled]');
        snapshot
            .querySelectorAll('style[data-styled]')
            .forEach((style, index) => {
                const sheet = liveStyles[index].sheet;
                if (sheet)
                    style.textContent = Array.from(sheet.cssRules)
                        .map((rule) => rule.cssText)
                        .join('\n');
            });
        return '<!doctype html>\n' + snapshot.outerHTML;
    });

    /*
     * Rewrite this script's own origin out of the captured markup.
     *
     * Vite's lazy-chunk preloader resolves import() against document.baseURI
     * and injects <link rel="modulepreload" href="http://localhost:PORT/...">.
     * Captured verbatim, that absolute URL ships to production, where the
     * browser spends a failed request on a host that is not there — the chunk
     * itself still loads, by a relative path, so the page works and nothing in
     * the console explains itself. Any route with a lazy component above the
     * fold picks this up; today that is the home page and its demo phones.
     */
    const html = raw
        .replace(/<noscript>[\s\S]*?<\/noscript>/g, '')
        .replaceAll(`http://localhost:${PORT}/`, '/');

    const dir = route === '/' ? dist : join(dist, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    console.log(
        `prerendered ${route.padEnd(16)} ${(html.length / 1024).toFixed(0)} KB`,
    );
}

await context.close();
await browser.close();
server.close();
console.log(`\n${ROUTES.length} routes written to dist/`);
