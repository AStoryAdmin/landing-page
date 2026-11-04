// Section top/bottom on "/" at a width (reduced motion), for reading a home-diff.
import { chromium } from 'playwright';
const [base, w] = [process.argv[2], Number(process.argv[3] || 390)];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 844 }, reducedMotion: 'reduce' });
await p.goto(base + '/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('main > *, main section')].map((e) => {
  const r = e.getBoundingClientRect();
  return [e.tagName, e.id || e.getAttribute('aria-labelledby') || '', Math.round(r.top + scrollY), Math.round(r.bottom + scrollY)];
}))));
await b.close();
