import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const root =
    'C:/Users/vngia/.codex/generated_images/01a0a2cc-35cb-7843-8ee8-7f80e729f1f6';
const sources = [
    [
        'g01desktop',
        'G01_PHONE_IN_HAND_PLATE_DESKTOP',
        'exec-b880a710-9da3-4428-aacb-03caf1ee6cf5.png',
    ],
    [
        'g01mobile',
        'G01_PHONE_IN_HAND_PLATE_MOBILE',
        'exec-785d518d-4285-461f-b6ee-714bda4bd8fd.png',
    ],
    [
        'g02desktop',
        'G02_EVERYDAY_CALL_DESKTOP',
        'exec-32bcb8e1-91cf-467b-a173-c05c858fc71c.png',
    ],
    [
        'g02mobile',
        'G02_EVERYDAY_CALL_MOBILE',
        'exec-6be902b0-e5ca-499e-b8a4-47bf95a2327c.png',
    ],
];
await fs.mkdir('qa/generated', { recursive: true });
await fs.mkdir('public/supplements', { recursive: true });
const prompts = JSON.parse(
    await fs.readFile('qa/generated-prompts.json', 'utf8'),
);
const registry = [];
for (const [key, name, file] of sources) {
    const bytes = await fs.readFile(path.join(root, file));
    const original = `qa/generated/ASTORY_WEB_${name}.png`;
    await fs.writeFile(original, bytes);
    const metadata = await sharp(bytes).metadata();
    const derivatives = [];
    for (const width of [640, 1200]) {
        const output = `public/supplements/${key}-${width}.webp`;
        await sharp(bytes)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 88 })
            .toFile(output);
        const dimensions = await sharp(output).metadata();
        derivatives.push({
            path: output,
            width: dimensions.width,
            height: dimensions.height,
        });
    }
    registry.push({
        id: key,
        canonicalName: `ASTORY_WEB_${name}.png`,
        resolvedSourcePath: original,
        sourceStatus: key.startsWith('g01')
            ? 'new generated plate; final app composite pending required boards'
            : 'new generated supplemental illustration',
        sourceSha256: crypto.createHash('sha256').update(bytes).digest('hex'),
        nativeDimensions: { width: metadata.width, height: metadata.height },
        deliveryDerivatives: derivatives,
        cropMode: 'natural proportions',
        focalRequirements: 'Keep head, phone, hands and gesture intact.',
        intendedPlacement: key.startsWith('g02')
            ? ['/experience', '/your-story']
            : ['pending app-reference composite'],
        altText: key.startsWith('g02')
            ? 'A woman talking on her phone at the kitchen table, gesturing with her free hand'
            : 'A phone held over a kitchen table with its screen left blank for a product composite',
        caption: 'Illustrative scene, not a customer photograph.',
        generationPrompt: prompts.find((p) => p.key === key)?.prompt,
    });
}
await fs.writeFile(
    'src/lib/generatedAssetRegistry.json',
    JSON.stringify(registry, null, 2) + '\n',
);
console.log(
    'Registered four generated assets with native dimensions and prompts.',
);
