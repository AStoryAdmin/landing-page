import sharp from 'sharp';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(
    'qa/locked-library/AStory_Master_Visual_Library_UIUX_LOCKED',
);
const manifest = JSON.parse(
    readFileSync(
        `${root}/05_MANIFESTS/ASTORY_MASTER_ASSET_MANIFEST.json`,
        'utf8',
    ),
);
const registry = {};
mkdirSync('public/mission', { recursive: true });
for (const asset of manifest.assets) {
    const id = asset.asset_id;
    const folder = id.startsWith('S')
        ? '02_ACTIVITY_SUPPLEMENT_S01-S08'
        : '01_PRIMARY_MASTERS_01-52';
    const source = resolve(root, folder, asset.canonical_filename);
    const bytes = readFileSync(source);
    const meta = await sharp(bytes).metadata();
    const derivatives = [];
    for (const width of [640, 1200, 1800]) {
        const file = `/mission/${id}-${width}.webp`;
        await sharp(bytes)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 87 })
            .toFile(`public${file}`);
        derivatives.push({ file, width: Math.min(width, meta.width) });
    }
    registry[id] = {
        id,
        canonicalName: asset.canonical_filename,
        source,
        sourceStatus: 'recovered-locked-master',
        sha256: createHash('sha256').update(bytes).digest('hex'),
        width: meta.width,
        height: meta.height,
        derivatives,
        cropMode: 'natural-contain',
        focalRequirements:
            asset.notes ?? 'Preserve the complete meaningful scene.',
        placement: [],
        caption: asset.subject,
        alt: asset.subject,
        year: asset.year ?? null,
        generationPrompt: null,
    };
}
for (const [alias, id] of [
    ['book-closed', '38'],
    ['book-slipcase', '39'],
])
    for (const size of [640, 1200, 1800])
        copyFileSync(
            `public/mission/${id}-${size}.webp`,
            `public/mission/${alias}-${size}.webp`,
        );
writeFileSync('src/lib/assetRegistry.json', JSON.stringify(registry, null, 2));
writeFileSync(
    'src/lib/mission.ts',
    `// Dimensions derive from the immutable canonical masters.\nexport const mission: Record<string, {width: number; height: number}> = ${JSON.stringify(Object.fromEntries([...Object.entries(registry).map(([id, a]) => [id, { width: a.width, height: a.height }]), ...['book-closed', 'book-slipcase'].map((id, i) => [id, { width: registry[i ? '39' : '38'].width, height: registry[i ? '39' : '38'].height }])]), null, 4)};\n`,
);
copyFileSync(
    `${root}/03_BOOK_OBJECT_FULL_PACKAGE/01_MASTER_ARTWORK/ASTORY_BOOK_MASTER_FRONT_COVER_FRONT_NONE_MASTER_LOCKED.svg`,
    'public/mission/book-cover-locked.svg',
);
console.log(
    `${Object.keys(registry).length} canonical assets registered (47 primary photographs, 5 books, 8 supplements).`,
);
