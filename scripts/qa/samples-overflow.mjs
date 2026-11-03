// Walks every face of every sample book at /samples and fails if anything overflows its page,
// if the colophon's counts disagree with the book's DATA, or if the contents' page numbers
// disagree with the folios. Starts nothing itself: pass the URL of a running server.
//   node scripts/qa/samples-overflow.mjs [http://localhost:5179/samples/] [--books carolyn,tom] [--shots dir]
// Checks at a desktop size (1280×800, the open book) and at a phone (390×844, one page at a time).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args.find(a => /^https?:/.test(a)) || 'http://localhost:5179/samples/';
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const books = opt('--books', 'carolyn,raymond,tom').split(',');
const shots = opt('--shots', '');
const sizes = [{ name: 'desktop', width: 1280, height: 800 }, { name: 'phone', width: 390, height: 844, mobile: true }];

const failures = [];
const fail = (book, size, i, t, msg) => { failures.push(`${book} ${size} face ${i} "${t}": ${msg}`); };

const browser = await chromium.launch();
for (const size of sizes) {
  const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height }, isMobile: !!size.mobile, hasTouch: !!size.mobile, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__samples && document.querySelector('.face'), null, { timeout: 15000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  for (const book of books) {
    await page.evaluate(k => window.__samples.useBook(k), book);
    await page.waitForTimeout(250);
    const r = await page.evaluate((book) => {
      const S = window.__samples, D = S.DATA[book], B = S.BOOKS[book];
      const out = { faces: [], counts: {}, toc: [], err: [] };
      const mode = document.querySelector('.book') ? 'book' : 'single';
      // every face, rendered one at a time in single mode so each is measured at the bench's size
      const faces = S.faces();
      const host = document.getElementById('stageHost');
      const P = getComputedStyle(document.documentElement).getPropertyValue('--P').trim();
      const probe = document.createElement('div');
      probe.className = 'single';
      probe.style.cssText = `position:absolute;left:0;top:0;width:${P};height:${P};visibility:hidden;pointer-events:none`;
      host.appendChild(probe);
      const skip = new Set(['paper-grain', 'linen', 'bevel', 'pattern', 'spanphoto', 'kr']);
      faces.forEach((f, i) => {
        const side = i % 2 === 0 ? 'r' : 'l';
        probe.innerHTML = `<div class="face ${side} ${f.cls || ''}">${f.html}</div>`;
        const face = probe.firstChild;
        const fr = face.getBoundingClientRect();
        const rec = { i, t: f.t || '', cls: f.cls || '', sec: f.sec || '', problems: [], folio: '', words: 0 };
        const fo = face.querySelector('.folio'); if (fo) rec.folio = fo.textContent.trim();
        const bodyEl = face.querySelector('.pg .body');
        rec.words = bodyEl ? bodyEl.textContent.trim().split(/\s+/).filter(Boolean).length : 0;
        rec.sides = face.querySelectorAll('.side').length; rec.listen = !!face.querySelector('.listen'); rec.photos = face.querySelectorAll('.plate .photo').length;
        for (const el of face.querySelectorAll('.pg, .card, .homeletter, .lq-grid, .toc')) {
          if (el.scrollHeight > el.clientHeight + 2) rec.problems.push(`${el.className.split(' ')[0]} content ${el.scrollHeight - el.clientHeight}px taller than the page`);
        }
        const pg = face.querySelector('.pg');
        if (pg) {
          const pr = pg.getBoundingClientRect();
          const cs = getComputedStyle(pg);
          const bottom = pr.bottom - parseFloat(cs.paddingBottom), right = pr.right - parseFloat(cs.paddingRight), left = pr.left + parseFloat(cs.paddingLeft);
          let last = null;
          for (const c of pg.children) {
            const cr = c.getBoundingClientRect(); if (!cr.height) continue;
            const abs = getComputedStyle(c).position === 'absolute';
            if (!abs) last = cr.bottom;
            if (cr.bottom > bottom + 1.5) rec.problems.push(`${c.className || c.tagName} runs ${Math.round(cr.bottom - bottom)}px past the foot of the page`);
            // the opener's big number hangs into the margin by design; absolutely placed lines (.t4) span the page
            if (!abs && !c.classList.contains('num') && (cr.right > right + 1.5 || cr.left < left - 1.5)) rec.problems.push(`${c.className || c.tagName} runs past the side margin`);
          }
          rec.spare = last === null ? null : Math.round(bottom - last);
        }
        for (const el of face.querySelectorAll('*')) {
          if (skip.has(el.className && el.className.baseVal !== undefined ? '' : (el.className || '').split(' ')[0])) continue;
          if (el.closest('svg') || el.closest('.spanphoto') || el.closest('.photo')) continue;
          const r2 = el.getBoundingClientRect(); if (!r2.height || !r2.width) continue;
          if (r2.bottom > fr.bottom + 1 || r2.top < fr.top - 1 || r2.right > fr.right + 1 || r2.left < fr.left - 1) { rec.problems.push(`${el.className || el.tagName} leaves the page box`); break; }
        }
        out.faces.push(rec);
      });
      probe.remove();
      // colophon counts vs DATA
      const all = (D.chapters || []).flatMap(c => c.memories || []);
      const want = { memories: all.length, photographs: all.reduce((n, m) => n + (m.photos || []).length, 0) };
      const col = faces.find(f => f.t === 'Colophon');
      const tmp = document.createElement('div'); tmp.innerHTML = col ? col.html : '';
      const line = [...tmp.querySelectorAll('p')].map(p => p.textContent).find(t => /memor/.test(t)) || '';
      const mm = line.match(/(\d+) memor/), pm = line.match(/(\d+) photograph/);
      out.counts = { line, want, got: { memories: mm ? +mm[1] : 0, photographs: pm ? +pm[1] : 0 } };
      // contents vs folios
      const toc = faces.filter(f => f.t === 'Contents');
      toc.forEach(f => { const d = document.createElement('div'); d.innerHTML = f.html;
        d.querySelectorAll('.toc li').forEach(li => { const name = li.querySelector('.t').childNodes[0].textContent.trim(); const p = +li.querySelector('.p').textContent; out.toc.push({ name, page: p }); }); });
      out.mode = mode; out.P = P; out.n = faces.length;
      return out;
    }, book);
    const memInfo = f => f.cls === 'mem' ? ` [body ${f.words} words, ${f.photos} photo, ${f.sides} side, ${f.listen ? 'listen' : 'no listen'}]` : '';
    for (const f of r.faces) for (const p of f.problems) fail(book, size.name, f.i, f.t, p + memInfo(f));
    // --budget: how much room each memory face has left, in lines of body text (the phone wraps tightest)
    if (args.includes('--budget')) for (const f of r.faces.filter(f => f.cls === 'mem')) console.log(`  ${book} ${size.name} face ${f.i} "${f.t}":${memInfo(f)} spare ${f.spare}px = ${(f.spare / (parseFloat(r.P) * 0.0245 * 1.52)).toFixed(1)} lines`);
    if (r.counts.got.memories !== r.counts.want.memories || r.counts.got.photographs !== r.counts.want.photographs)
      fail(book, size.name, '-', 'Colophon', `says "${r.counts.line}" but DATA has ${r.counts.want.memories} memories, ${r.counts.want.photographs} photographs`);
    for (const row of r.toc) {
      const f = r.faces.find(x => x.folio === String(row.page));
      if (!f) fail(book, size.name, '-', 'Contents', `"${row.name}" says page ${row.page}, but no face carries that folio`);
      else if (f.sec !== row.name) fail(book, size.name, f.i, f.t, `contents says "${row.name}" is on page ${row.page}, but that page is "${f.sec || f.t}"`);
    }
    if (size.name === 'desktop') {
      const mem = r.faces.filter(f => f.cls === 'mem');
      const max = Math.max(0, ...mem.map(f => f.words));
      console.log(`${book}: ${r.n} faces (${r.n / 2} leaves), page ${r.P}, ${r.toc.length} contents rows, colophon "${r.counts.line}", fullest memory face ${max} words`);
    }
    if (shots && size.name === 'desktop') {
      fs.mkdirSync(shots, { recursive: true });
      const memIdx = r.faces.findIndex(f => f.cls === 'mem' && f.t && !/learned/.test(f.t));
      const spread = Math.ceil(memIdx / 2);
      await page.evaluate(s => { const S = window.__samples; const book = document.getElementById('book'); if (book) { document.querySelectorAll('.leaf').forEach(l => { l.style.transition = 'none'; }); } }, spread);
      for (const [label, sp] of [['memory', spread], ['colophon', 3]]) {
        await page.evaluate(s => { const r = document.getElementById('scrubR'); r.value = s; r.dispatchEvent(new Event('input')); }, sp);
        await page.waitForTimeout(1200);
        const bench = await page.$('.bench');
        await bench.screenshot({ path: path.join(shots, `${book}-${label}.png`) });
      }
    }
  }
  if (errors.length) failures.push(`${size.name}: page errors: ${errors.join(' | ')}`);
  await ctx.close();
}
await browser.close();
if (failures.length) { console.log(failures.join('\n')); console.log(`${failures.length} failure(s)`); process.exit(1); }
console.log('OK: nothing overflows, counts and contents agree');
