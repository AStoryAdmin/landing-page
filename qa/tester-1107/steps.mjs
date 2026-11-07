/**
 * Plan task 1d (docs/plans/2026-11-07-tester-report.md, criteria 1-3):
 * /how-it-works opens on the four moments, then the numbered setup steps,
 * each folded (closed on load, opens by click and by Enter) beside a real
 * screenshot that loads and is listed in public/how-it-works/steps/SOURCES.md.
 *   node qa/tester-1107/steps.mjs [--base http://localhost:5311]
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5311').replace(/\/$/, '');
const sources = existsSync('public/how-it-works/steps/SOURCES.md') ? readFileSync('public/how-it-works/steps/SOURCES.md', 'utf8') : '';
let fails = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

const browser = await chromium.launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(base + '/how-it-works', { waitUntil: 'networkidle' });
  const order = await page.evaluate(() => {
    const secs = [...document.querySelectorAll('main section, section')];
    const at = (sel) => { const el = document.querySelector(sel); return el ? secs.indexOf(el.closest('section')) : -1; };
    return { moments: at('#moments-title'), setup: at('#setup-title'), asked: at('#being-asked'), film: at('#film'), firstAfterHero: secs.findIndex((s) => s.querySelector('#moments-title')) };
  });
  ok(order.moments >= 0 && order.setup > order.moments, `${w}: Four moments comes before the setup steps ${JSON.stringify(order)}`);
  ok(order.asked < 0 || order.asked > order.setup, `${w}: the storyteller's section follows the setup`);
  const nearTop = await page.evaluate(() => {
    const m = document.querySelector('#moments-title')?.closest('section');
    let prev = m?.previousElementSibling; let n = 0;
    while (prev) { if (prev.tagName === 'SECTION' || prev.querySelector('section')) n++; prev = prev.previousElementSibling; }
    return n;
  });
  ok(nearTop <= 1, `${w}: Four moments is the first section after the opening (sections before it: ${nearTop})`);
  const steps = page.locator('#setup ol > li');
  const n = await steps.count();
  ok(n >= 4, `${w}: ${n} numbered setup steps`);
  const closed = await page.$$eval('#setup details', (ds) => ds.every((d) => !d.open));
  ok(closed, `${w}: every step is folded on load`);
  await page.locator('#setup summary').first().click();
  ok(await page.$eval('#setup details', (d) => d.open), `${w}: a click opens step 1`);
  await page.locator('#setup summary').nth(1).focus();
  await page.keyboard.press('Enter');
  ok(await page.$$eval('#setup details', (d) => d[1].open), `${w}: Enter opens step 2`);
  await page.evaluate(async () => { const s = document.querySelector('#setup'); s.scrollIntoView(); await new Promise((r) => setTimeout(r, 300)); for (const i of s.querySelectorAll('img')) { i.loading = 'eager'; } });
  await page.waitForTimeout(1500);
  const imgs = await page.$$eval('#setup img', (is) => is.map((i) => ({ src: i.getAttribute('src'), w: i.naturalWidth, alt: i.alt })));
  for (const i of imgs) {
    ok(i.w > 0, `${w}: loads ${i.src}`);
    ok(sources.includes(i.src.split('/').pop()), `${w}: ${i.src.split('/').pop()} has a source in SOURCES.md`);
    ok(i.alt.length > 10, `${w}: alt text for ${i.src.split('/').pop()}`);
  }
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(over <= 0, `${w}: no horizontal scroll (${over}px)`);
}
await browser.close();
console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
