/** Round 3 fix 2: #film and #being-asked land on their section (top within the first 200 px). */
import { chromium } from 'playwright';
const b = await chromium.launch();
let bad = 0;
for (const w of [390, 1440]) {
  for (const [path, id] of [['/how-it-works/#film', 'film'], ['/how-it-works/#being-asked', 'being-asked'], ['/join/#being-asked', 'being-asked']]) {
    const p = await b.newPage({ viewport: { width: w, height: 844 } });
    await p.goto('http://localhost:5207' + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1200);
    const top = await p.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id);
    const ok = top >= -2 && top < 200;
    if (!ok) bad++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${path} @${w}: #${id} top ${top}px`);
    await p.close();
  }
}
await b.close();
process.exit(bad ? 1 : 0);
