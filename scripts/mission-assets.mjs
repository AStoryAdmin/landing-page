/** Derive web images from the locked mission masters; never rewrite the masters. */
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Pass the locked mission assets directory.');
const output = resolve('public/mission');
mkdirSync(output, { recursive: true });
const manifest = [];
for (const file of readdirSync(source).filter((file) => file.endsWith('.png'))) {
    const input = readFileSync(resolve(source, file));
    const name = file.startsWith('ASTORY') ? (file.includes('SLIPCASE') ? 'book-slipcase' : 'book-closed') : file.slice(0, 2);
    const metadata = await sharp(input).metadata();
    for (const width of [640, 1200, 1800]) {
        await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(resolve(output, `${name}-${width}.webp`));
    }
    manifest.push({ name, source: file, sha256: createHash('sha256').update(input).digest('hex'), width: metadata.width, height: metadata.height });
}
writeFileSync(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Prepared ${manifest.length} mission images in three responsive sizes.`);
