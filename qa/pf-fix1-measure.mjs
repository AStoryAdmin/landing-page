/**
 * Phone-first fix 1: full-page heights and section heights at 390.
 *   node qa/pf-fix1-measure.mjs [--base http://localhost:5301]
 */
import { chromium } from 'playwright';

const arg = (n, f) => {
  const i = process.argv.indexOf('--' + n);
  return i > -1 ? process.argv[i + 1] : f;
};
const base = arg('base', 'http://localhost:5301').replace(/\/$/, '');
const pages = (arg('pages', '/care-communities/,/organizations/')).split(',');
const browser = await chromium.launch();
for (const path of pages) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const secs = [...document.querySelectorAll('main section, footer')]
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || el.getAttribute('aria-labelledby') || el.getAttribute('aria-label') || el.className.toString().slice(0, 30),
        h: Math.round(el.getBoundingClientRect().height),
      }))
      .filter((s) => s.h > 0);
    return { total: document.documentElement.scrollHeight, secs };
  });
  console.log(path, JSON.stringify(r, null, 0));
  await ctx.close();
}
await browser.close();
