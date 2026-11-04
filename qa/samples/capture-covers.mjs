// Re-captures the home cards' cover images from the rendered front covers at /samples:
// the whole square cover face at 720px, saved as public/book-objects/sample-<id>-{720,360}.webp
// (same crop as the existing files: the full face, no shadow, no rounded corners).
import { chromium } from 'file:///C:/Users/nguye/Desktop/a-story-landing-samples/node_modules/playwright/index.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('C:/Users/nguye/Desktop/a-story-landing-samples/package.json')('sharp');
const url = process.argv[2] || 'http://localhost:5179/samples/index.html';
const outDir = 'C:/Users/nguye/Desktop/a-story-landing-samples/public/book-objects';
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__samples && document.querySelector('.face'));
await page.evaluate(() => document.fonts && document.fonts.ready);
for (const id of ['carolyn', 'raymond', 'tom']) {
  await page.evaluate(k => window.__samples.useBook(k), id);
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    let h = document.getElementById('coverShot'); if (!h) { h = document.createElement('div'); h.id = 'coverShot'; h.className = 'single'; document.body.appendChild(h); }
    h.style.cssText = 'position:fixed;left:0;top:0;width:720px;height:720px;z-index:9999;perspective:none;background:#000';
    const f = window.__samples.faces()[0];
    h.innerHTML = `<div class="face r ${f.cls}" style="border-radius:0;box-shadow:none;transition:none">${f.html}</div>`;
  });
  await page.waitForTimeout(600);
  const face = await page.$('#coverShot .face');
  const png = await face.screenshot({ type: 'png' });
  const meta = await sharp(png).metadata();
  await sharp(png).resize(720, 720).webp({ quality: 82 }).toFile(`${outDir}/sample-${id}-720.webp`);
  await sharp(png).resize(360, 360).webp({ quality: 82 }).toFile(`${outDir}/sample-${id}-360.webp`);
  console.log(id, `captured ${meta.width}x${meta.height} -> 720 + 360 webp`);
}
await b.close();
