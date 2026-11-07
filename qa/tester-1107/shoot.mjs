/**
 * Tester report 7 Nov 2026 (docs/plans/2026-11-07-tester-report.md): before/after shots.
 *   node qa/tester-1107/shoot.mjs --label before|after [--base https://astoryapp.com]
 * Writes qa/tester-1107/shots/<label>-<page>-<width>.png (full page) and
 * <label>-<page>-<width>-top.png (first screen).
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'https://astoryapp.com').replace(/\/$/, '');
const label = arg('label', 'after');
const out = join(dirname(fileURLToPath(import.meta.url)), 'shots');
mkdirSync(out, { recursive: true });
const PAGES = [['how-it-works', '/how-it-works'], ['home', '/'], ['samples', '/samples/']];
const WIDTHS = [[1440, 900], [390, 844]];

const browser = await chromium.launch();
for (const [name, path] of PAGES) {
  for (const [w, h] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(out, `${label}-${name}-${w}-top.png`) });
    // Walk the page so lazy images and reveals settle before the full shot.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(out, `${label}-${name}-${w}.png`), fullPage: true });
    console.log(label, name, w, 'ok');
    await ctx.close();
  }
}
await browser.close();
