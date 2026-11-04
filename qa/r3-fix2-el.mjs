/** Element shots for the round 3 fix 2 report: node qa/r3-fix2-el.mjs <path> <selector> <width> <file> */
import { chromium } from 'playwright';
const [path, sel, w, file] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(w), height: 900 } });
await p.goto('http://localhost:5207' + path, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.locator(sel).first().screenshot({ path: file });
await b.close();
