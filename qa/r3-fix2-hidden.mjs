/** Round 3 fix 2 (item 12c): count reveal-marked blocks still invisible on an unscrolled page.
 *  node qa/r3-fix2-hidden.mjs [path] */
import { chromium } from 'playwright';
const path = process.argv[2] ?? '/care-communities/';
const b = await chromium.launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('http://localhost:5207' + path, { waitUntil: 'domcontentloaded' });
  const count = () => p.evaluate(() => [...document.querySelectorAll('[data-rise],[data-lines],[data-print]')].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length);
  await p.waitForTimeout(400);
  const early = await count();
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(800);
  const late = await count();
  console.log(`${path} @${w}: hidden blocks at ~0.4 s ${early}, after networkidle + 800 ms ${late}`);
  await p.close();
}
await b.close();
