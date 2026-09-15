// Renders pages of a PDF to PNG with pdf.js inside headless Chromium.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const [pdfPath, outPrefix, pagesArg, scaleArg, cropArg] = process.argv.slice(2);
// cropArg: "x,y,w,h" in PDF user units — lets a small region render at a huge
// scale without allocating a canvas for the whole board.
const crop = cropArg ? cropArg.split(',').map(Number) : null;
const pages = (pagesArg ?? '1').split(',').map(Number);
const scale = Number(scaleArg ?? 3);
const pdf = readFileSync(pdfPath);
const lib = 'C:/Users/nguye/Desktop/a-story-landing/node_modules/pdfjs-dist/build/';

const page404 = (res) => { res.writeHead(404); res.end(); };
const server = createServer((req, res) => {
    if (req.url === '/doc.pdf') { res.writeHead(200, {'Content-Type':'application/pdf'}); return res.end(pdf); }
    if (req.url === '/pdf.mjs') { res.writeHead(200, {'Content-Type':'text/javascript'}); return res.end(readFileSync(lib+'pdf.mjs')); }
    if (req.url === '/pdf.worker.mjs') { res.writeHead(200, {'Content-Type':'text/javascript'}); return res.end(readFileSync(lib+'pdf.worker.mjs')); }
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type':'text/html'});
        return res.end(`<!doctype html><body style="margin:0"><canvas id="c"></canvas>
<script type="module">
import * as pdfjs from '/pdf.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
window.render = async (n, scale, crop) => {
  const doc = await pdfjs.getDocument({ url: '/doc.pdf' }).promise;
  window.numPages = doc.numPages;
  const p = await doc.getPage(n);
  const vp = crop
    ? p.getViewport({ scale, offsetX: -crop[0] * scale, offsetY: -crop[1] * scale })
    : p.getViewport({ scale });
  const c = document.getElementById('c');
  c.width = crop ? crop[2] * scale : vp.width;
  c.height = crop ? crop[3] * scale : vp.height;
  await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
  return [vp.width, vp.height];
};
window.ready = true;
</script></body>`);
    }
    return page404(res);
});
await new Promise(r => server.listen(4188, r));

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await pg.goto('http://localhost:4188/');
await pg.waitForFunction(() => window.ready);
for (const n of pages) {
    const size = await pg.evaluate(([n, s, c]) => window.render(n, s, c), [n, scale, crop]);
    await pg.locator('#c').screenshot({ path: `${outPrefix}-p${n}.png` });
    console.log(`page ${n}: ${size[0]}x${size[1]} of ${await pg.evaluate(() => window.numPages)}`);
}
await browser.close();
server.close();
