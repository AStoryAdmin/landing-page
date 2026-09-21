import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
import assert from 'node:assert/strict';
const registryBytes = await fs.readFile('src/lib/assetRegistry.json');
const registry = JSON.parse(registryBytes);
const derivatives = [], masters = [], objects = [];
const includeMasters = process.argv.includes('--masters');
for (const [id, asset] of Object.entries(registry)) {
    for (const derivative of asset.derivatives ?? []) {
        const file = derivative.file.startsWith('public/') ? derivative.file : 'public' + derivative.file;
        const meta = await sharp(file).metadata();
        await sharp(file).raw().toBuffer();
        assert.equal(meta.width, derivative.width, file + ' actual width');
        assert.equal(meta.height, derivative.height, file + ' actual height');
        derivatives.push({ id, file: derivative.file, width: meta.width, height: meta.height, decodes: true });
    }
    if (asset.source && asset.sha256) {
        if (!includeMasters) { masters.push({ id, status: 'not-requested; masters not part of portable export' }); continue; }
        try {
            const bytes = await fs.readFile(asset.source);
            assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), asset.sha256, id + ' master hash');
            masters.push({ id, status: 'verified against accessible original' });
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            masters.push({ id, status: 'unavailable original' });
        }
    }
}
for (const file of await fs.readdir('public/book-objects')) {
    if (!file.endsWith('.webp')) continue;
    const image = sharp(path.join('public/book-objects', file));
    const meta = await image.metadata();
    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let left = info.width, right = 0, top = info.height, bottom = 0, transparent = 0;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
        const alpha = data[(y * info.width + x) * info.channels + info.channels - 1];
        if (alpha === 0) transparent++;
        if (alpha > 24) { left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); }
    }
    assert.ok(meta.hasAlpha, file + ' real alpha');
    objects.push({ file, width: meta.width, height: meta.height, hasAlpha: meta.hasAlpha, transparentPixels: transparent, objectBounds: { left, top, right, bottom } });
}
assert.deepEqual(await fs.readFile('src/lib/assetRegistry.json'), registryBytes, 'validation must not rewrite placements');
await fs.writeFile('qa/greenfield/asset-verification.json', JSON.stringify({ derivatives, masters, objects, readOnly: true }, null, 2));
console.log({ derivatives: derivatives.length, objects: objects.length, masters: masters.reduce((out, item) => ({ ...out, [item.status]: (out[item.status] ?? 0) + 1 }), {}) });
