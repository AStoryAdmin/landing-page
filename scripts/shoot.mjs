/**
 * Development helper: screenshots every route at desktop and phone widths so
 * layout regressions are visible without clicking through the site.
 *
 * Usage: npm run preview & then `node scripts/shoot.mjs [outDir] [baseUrl]`.
 * Not part of the build.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const outDir = process.argv[2] ?? 'shots';
const base = (process.argv[3] ?? 'http://localhost:4173').replace(/\/$/, '');
const only = process.env.ROUTES?.split(',');

const ROUTES = only ?? [
    '/', '/experience', '/family', '/organizations', '/institution',
    '/pricing', '/signup', '/story', '/faq', '/privacy', '/terms', '/nope-404',
];

const VIEWPORTS = [
    { name: 'desktop', width: 1440, height: 1000, full: true },
    { name: 'mobile', width: 390, height: 844, full: true },
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.on('console', (m) => m.type() === 'error' && errors.push(`${m.location().url}: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

    for (const route of ROUTES) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        // Let reveal-on-scroll animations settle before capturing.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(400);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(250);

        const slug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
        await page.screenshot({ path: join(outDir, `${slug}.${vp.name}.png`), fullPage: vp.full });

        const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth + 1
        );
        if (overflow) errors.push(`horizontal overflow: ${route} @ ${vp.name}`);
        console.log(`${vp.name.padEnd(8)} ${route}`);
    }

    await context.close();
}

await browser.close();

if (errors.length) {
    console.log('\nISSUES:');
    for (const e of [...new Set(errors)]) console.log('  - ' + e);
} else {
    console.log('\nno console errors, no horizontal overflow');
}
