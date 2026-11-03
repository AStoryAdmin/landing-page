/**
 * /pricing first screen (chief log B3.1): at 390x844, count the prices and the
 * primary buttons whose box is at least partly inside the first viewport.
 *
 *   node qa/b3-first-screen.mjs [--base http://localhost:5203]
 *
 * A price is any "$<digits>" text run in <main>; a primary button is a link or
 * button whose computed background is filled (not transparent) and that has
 * text. Prints the order of the first lines (h1, status, gift, action) too.
 * Exits 1 if more than 2 prices or more than 1 primary button are seen.
 */
import { chromium } from 'playwright';

const i = process.argv.indexOf('--base');
const base = (i > -1 ? process.argv[i + 1] : 'http://localhost:5203').replace(/\/$/, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base + '/pricing/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const vh = innerHeight;
  const main = document.querySelector('main');
  const prices = [];
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const re = /\$\d[\d,.]*/g;
    let m;
    while ((m = re.exec(n.textContent))) {
      const r = document.createRange();
      r.setStart(n, m.index);
      r.setEnd(n, m.index + m[0].length);
      const b = r.getBoundingClientRect();
      if (b.height && b.top < vh && b.bottom > 0) prices.push({ text: m[0], top: Math.round(b.top) });
    }
  }
  const primaries = [...main.querySelectorAll('a, button')]
    .filter((el) => {
      const b = el.getBoundingClientRect();
      if (!b.height || b.top >= vh || b.bottom <= 0) return false;
      const bg = getComputedStyle(el).backgroundColor;
      return el.textContent.trim() && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    })
    .map((el) => ({ text: el.textContent.trim(), top: Math.round(el.getBoundingClientRect().top) }));
  const at = (sel) => {
    const el = main.querySelector(sel);
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  };
  return {
    prices,
    primaries,
    order: { h1: at('h1'), status: at('.opening-lead .status'), gift: at('.opening-lead .gift'), firstPriceCard: at('.opening-object') },
  };
});
await browser.close();
console.log(JSON.stringify(out, null, 2));
const ok = out.prices.length <= 2 && out.primaries.length <= 1 && out.order.status <= (out.prices[0]?.top ?? Infinity);
console.log(ok ? 'PASS' : 'FAIL');
process.exit(ok ? 0 : 1);
