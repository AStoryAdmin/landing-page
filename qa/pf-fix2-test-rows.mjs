// Row ranges of changed pixels in a home-diff PNG (pixelmatch red).
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
const png = PNG.sync.read(readFileSync(process.argv[2]));
const rows = [];
for (let y = 0; y < png.height; y++) {
  let n = 0;
  for (let x = 0; x < png.width; x++) {
    const i = (y * png.width + x) * 4;
    const [r, g, b] = [png.data[i], png.data[i + 1], png.data[i + 2]];
    if (r > 200 && g < 80 && b < 80) n++;
  }
  if (n) rows.push([y, n]);
}
const ranges = [];
for (const [y, n] of rows) {
  const last = ranges[ranges.length - 1];
  if (last && y - last.to <= 20) { last.to = y; last.px += n; } else ranges.push({ from: y, to: y, px: n });
}
console.log(png.width + 'x' + png.height, JSON.stringify(ranges));
