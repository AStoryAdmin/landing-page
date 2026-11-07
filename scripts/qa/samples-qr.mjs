// Every code the sample books print scans to a real /read page (plan 2026-11-07 D3, criterion 6).
// Flips through every spread of every sample book at /samples, screenshots each printed code as it is drawn,
// decodes the pixels with jsQR, and fails unless each decodes to
//   https://app.astoryapp.com/read?sample=<book>&c=<chapter slug>
// for the book on screen, with that chapter in the web app's public/read-samples/<book>.json (what /read reads).
// Also clicks one code per book and checks the in-page "scan" phone still opens. Starts nothing itself.
//   node scripts/qa/samples-qr.mjs <http://localhost:PORT/samples/> --read-samples "<web-app>/public/read-samples"
//        --jsqr "<path to jsqr/dist/jsQR.js>" [--shot <png of a chapter opener spread>]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args.find(a => /^https?:/.test(a)) || 'http://localhost:5179/samples/';
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const readDir = opt('--read-samples');
const jsqr = opt('--jsqr');
const shot = opt('--shot', '');
if (!readDir || !fs.existsSync(readDir)) throw new Error('pass --read-samples <web-app>/public/read-samples');
if (!jsqr || !fs.existsSync(jsqr)) throw new Error('pass --jsqr <path to jsQR.js> (npm i jsqr in a scratch dir)');
const READ = /^https:\/\/app\.astoryapp\.com\/read\?sample=([a-z][a-z0-9-]*)&c=([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const books = ['carolyn', 'raymond', 'tom'];

const failures = [], decoded = [];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 4, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.goto(url, { waitUntil: 'load' });
await page.waitForFunction(() => window.__samples && document.querySelector('.face'), null, { timeout: 15000 });
await page.addScriptTag({ path: jsqr });
await page.evaluate(() => document.fonts && document.fonts.ready);

for (const book of books) {
  const file = path.join(readDir, `${book}.json`);
  const json = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  if (!json) { failures.push(`${book}: no ${file}`); continue; }
  const slugs = new Set(json.chapters.map(c => c.slug));
  await page.evaluate(k => window.__samples.useBook(k), book);
  await page.waitForTimeout(300);
  const max = await page.evaluate(() => +document.getElementById('scrubR').max);
  const seen = new Set();
  let n = 0, clicked = false;
  for (let s = 0; s <= max; s++) {
    await page.evaluate(v => { const r = document.getElementById('scrubR'); r.value = v; r.dispatchEvent(new Event('input')); }, s);
    await page.waitForTimeout(450);
    const codes = await page.$$('.leaf .qrbtn, .single .qrbtn, .stage .qrbtn');
    for (const el of codes) {
      if (!(await el.isVisible())) continue;
      const box = await el.boundingBox();
      if (!box || box.width < 20) continue;
      // every leaf of the book is in the DOM: read only a code that is on top where it is drawn (the open spread)
      const onTop = await el.evaluate(b => { const r = b.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!hit && b.contains(hit); });
      if (!onTop) continue;
      const key = await el.getAttribute('data-scan');
      const printed = await el.getAttribute('data-read');
      const png = (await el.screenshot()).toString('base64');
      const text = await page.evaluate(async b64 => {
        const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
        const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
        const g = c.getContext('2d'); g.drawImage(img, 0, 0);
        const r = window.jsQR(g.getImageData(0, 0, c.width, c.height).data, c.width, c.height);
        return r ? r.data : null;
      }, png);
      n++;
      const where = `${book} spread ${s} code "${key}"`;
      if (!text) { failures.push(`${where}: does not decode`); continue; }
      const m = READ.exec(text);
      if (!m) failures.push(`${where}: decodes to "${text}", not a /read sample URL`);
      else if (m[1] !== book) failures.push(`${where}: opens book "${m[1]}", not ${book}`);
      else if (!slugs.has(m[2])) failures.push(`${where}: chapter "${m[2]}" is not in ${book}.json`);
      if (printed && printed !== text) failures.push(`${where}: decodes to ${text} but the button says ${printed}`);
      if (!seen.has(text)) { seen.add(text); decoded.push(text); }
      // the click still opens the in-page phone (once a book, on its first chapter code)
      if (!clicked && key !== 'archive') {
        clicked = true;
        await el.click();
        const ok = await page.evaluate(() => !document.getElementById('scan').hidden && document.getElementById('phBody').textContent.trim().length > 40);
        if (!ok) failures.push(`${where}: a click did not open the in-page phone`);
        await page.click('#phClose');
      }
      if (shot && book === 'carolyn' && key && key !== 'archive' && !fs.existsSync(shot)) {
        fs.mkdirSync(path.dirname(shot), { recursive: true });
        await (await page.$('.bench')).screenshot({ path: shot });
      }
    }
  }
  // every chapter in the file has its code somewhere in the book
  for (const sl of slugs) if (![...seen].some(u => u.endsWith(`&c=${sl}`))) failures.push(`${book}: no printed code opens chapter "${sl}"`);
  if (!clicked) failures.push(`${book}: no chapter code was clicked`);
  console.log(`${book}: ${max + 1} spreads, ${n} codes read, ${seen.size} distinct URLs`);
}
if (errors.length) failures.push(`page errors: ${errors.join(' | ')}`);
await browser.close();
console.log('decoded:\n  ' + decoded.join('\n  '));
if (failures.length) { console.log(failures.join('\n')); console.log(`${failures.length} failure(s)`); process.exit(1); }
console.log(`OK: ${decoded.length} distinct codes, every one a /read sample URL whose chapter is in the JSON`);
