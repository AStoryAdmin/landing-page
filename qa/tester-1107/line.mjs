/**
 * Plan task 5 (docs/plans/2026-11-07-tester-report.md, criterion 10): the
 * home line under the hero says what A Story does (line A), fits inside the
 * window at 1440/390/320, and no banned words.
 *   node qa/tester-1107/line.mjs [--base http://localhost:5312] [--shots before|after]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i > -1 ? process.argv[i + 1] : f; };
const base = arg('base', 'http://localhost:5312').replace(/\/$/, '');
const shots = arg('shots', null);
const WANT = 'One question a day. Their voice, kept. A book when you’re ready.';
let fails = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
mkdirSync('qa/tester-1107/shots', { recursive: true });

const browser = await chromium.launch();
for (const [w, h] of [[1440, 900], [390, 844], [320, 640]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })).newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const h2 = page.locator('#everyday-title');
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const text = (await h2.innerText()).replace(/\s+/g, ' ').trim();
  if (!shots) {
    ok(text === WANT, `${w}: line reads "${text}"`);
    ok(!/legacy|it’s not|it's not/i.test(text), `${w}: no banned words`);
    const box = await h2.boundingBox();
    ok(box && box.x >= 0 && box.x + box.width <= w + 1, `${w}: line fits the window (${box && Math.round(box.x)}–${box && Math.round(box.x + box.width)})`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(over <= 0, `${w}: no horizontal scroll (${over}px)`);
  } else {
    const sec = page.locator('#everyday-title').locator('xpath=ancestor::section[1]');
    await sec.screenshot({ path: `qa/tester-1107/shots/${shots}-line-${w}.png` });
    console.log('shot', shots, w);
  }
}
await browser.close();
if (!shots) { console.log(fails ? `${fails} failed` : 'all passed'); process.exit(fails ? 1 : 0); }
