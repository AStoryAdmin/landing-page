/* Full-page shots of /organizations and /care-communities, plus an overflow
   check at four widths. Usage: node qa/institutions-2026-10-29/shoot.mjs <label> [baseUrl] */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const label = process.argv[2] ?? 'after';
const base = process.argv[3] ?? 'http://localhost:5191';
const out = 'qa/institutions-2026-10-29/shots';
await fs.mkdir(out, { recursive: true });
const b = await chromium.launch();
const routes = ['/organizations', '/care-communities'];
const problems = [];
for (const [w, h] of [[1440, 900], [393, 852]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  for (const r of routes) {
    await p.goto(base + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    const name = r.slice(1);
    await p.screenshot({ path: `${out}/${label}-${name}-${w}-fold.png` });
    await p.screenshot({ path: `${out}/${label}-${name}-${w}-full.png`, fullPage: true });
  }
  await p.close();
}
for (const w of [768, 1024, 1728, 393]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const r of routes) {
    await p.goto(base + r, { waitUntil: 'networkidle' });
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (over > 1) problems.push(`${w} ${r} overflows by ${over}px`);
  }
  await p.close();
}
await b.close();
console.log(problems.length ? problems.join('\n') : 'no horizontal overflow at 768/1024/1728/393');
