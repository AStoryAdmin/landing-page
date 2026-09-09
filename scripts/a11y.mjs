/**
 * Development helper: runs axe-core over every route at desktop and phone
 * widths. Not part of the build — run it against `npm run preview`.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const base = (process.argv[2] ?? 'http://localhost:4173').replace(/\/$/, '');
const ROUTES = ['/', '/experience', '/family', '/organizations', '/institution', '/pricing', '/your-story', '/thanks', '/card',
    '/story', '/faq', '/privacy', '/terms', '/nope-404'];

const browser = await chromium.launch();
let total = 0;

for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();

    for (const route of ROUTES) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(300);
        await page.addScriptTag({ content: axeSource });
        const results = await page.evaluate(async () =>
            // @ts-expect-error axe is injected above
            await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] })
        );

        for (const v of results.violations) {
            total += v.nodes.length;
            console.log(`\n[${label}] ${route} — ${v.id} (${v.impact}) × ${v.nodes.length}`);
            console.log(`  ${v.help}`);
            for (const n of v.nodes.slice(0, 3)) console.log(`  · ${n.target.join(' ')}`);
        }
    }
    await context.close();
}

await browser.close();
console.log(total === 0 ? '\nno WCAG A/AA violations found' : `\n${total} nodes with violations`);
