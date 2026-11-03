/**
 * After shots for Builder 3's pages: first viewport and full page at 390x844
 * and 1440x900.
 *
 *   node qa/b3-shots.mjs <outDir> [--base http://localhost:5203] [slug=/path/ ...]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const out = args[0];
const bi = args.indexOf('--base');
const base = (bi > -1 ? args[bi + 1] : 'http://localhost:5203').replace(/\/$/, '');
const pages = args
  .filter((a) => a.includes('='))
  .map((a) => a.split('='));
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  for (const [slug, p] of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    const file = path.join(out, `${slug}-${w}.png`);
    await page.screenshot({ path: file, fullPage: false });
    await page.screenshot({ path: path.join(out, `${slug}-${w}-full.png`), fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(file, 'overflow', overflow);
  }
  await page.close();
}
await browser.close();
