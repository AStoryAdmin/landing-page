import fs from 'node:fs/promises';
const registry = JSON.parse(
    await fs.readFile('src/lib/assetRegistry.json', 'utf8'),
);
const placements = {
    '01': ['/family opening and sequence', 'book reader spread 1'],
    '05': [
        '/ Home everyday',
        '/family temporal pair and sequence',
        'reader spread 2',
    ],
    '07': ['/ Home supporting grid', '/family sequence'],
    '08': ['/organizations opening'],
    '09': ['/family sequence'],
    10: ['/family sequence'],
    12: ['/ Home supporting grid'],
    21: [
        '/ Home everyday',
        '/family temporal pair and sequence',
        'reader spread 2',
    ],
    22: ['/ Home supporting grid', 'sample archive', 'reader spread 4'],
    24: ['/ Home supporting grid'],
    25: [
        '/ Home supporting grid',
        '/your-story',
        'sample archive',
        'reader spread 4',
    ],
    26: ['/family sequence'],
    27: ['/family dinner'],
    28: ['/family laughter'],
    29: ['/family ordinary day'],
    30: [
        'Home and Experience memory journey',
        'shared voices',
        'sample archive',
        'reader spread 3',
        '/family',
        '/institution',
    ],
    33: ['Home opening', '/start', '/institution opening'],
    34: ['/experience shared record'],
    35: [
        'Home supporting grid',
        '/family sequence and closing',
        '/your-story',
        'sample archive',
        'reader spread 4',
    ],
    36: ['contrast reference only; never sold or placed as A Story product'],
    37: ['Home and Experience physical interior'],
    38: ['/pricing book'],
    39: ['Home and Experience book exterior'],
    40: ['Home and Experience binding detail'],
    44: ['/your-story life continuing'],
};
const alt = {
    '01': 'Two people on the porch steps of a home',
    '05': 'Hands kneading dough on a flour-covered counter',
    '07': 'A child looking out of a car window',
    '08': 'A person repairing a fan at a workbench',
    '09': 'The ordinary aftermath of a picnic',
    10: 'A child in a hallway',
    12: 'A person using a wall telephone',
    21: 'Hands preparing a lunchbox at a kitchen counter',
    22: 'A child and adult working on a project',
    24: 'A child sleeping in the backseat of a car',
    25: 'An adult and child cooking together',
    26: 'A child absorbed in imaginary play',
    27: 'A person telling a story while people at the dinner table listen',
    28: 'People sharing a laugh',
    29: 'An ordinary day at home',
    30: 'People at the edge of a lake during a summer afternoon',
    33: 'Two adults talking across a kitchen table',
    34: 'People comparing photographs and recollections',
    35: 'An adult carrying laundry through a contemporary home',
    36: 'Conventional memoir reference object, not the A Story product',
    37: 'The approved open A Story volume with its representative interior',
    38: 'The approved teal A Story closed volume',
    39: 'The approved A Story teal volume with its matching slipcase',
    40: 'A detail of the approved A Story interior pages and binding',
    44: 'Life in a first apartment',
};
for (const [id, asset] of Object.entries(registry)) {
    if (asset.sourceStatus !== 'recovered-locked-master') continue;
    asset.placement = placements[id] ?? [
        'available in the approved library; no current public-page placement',
    ];
    asset.alt = alt[id] ?? asset.caption.toLowerCase().replaceAll('_', ' ');
    asset.caption =
        (alt[id] ?? asset.alt) +
        (asset.year ? ' · intended era ' + asset.year : '');
    asset.provenance =
        'Approved synthetic illustration; not a customer photograph or a documented family.';
    asset.derivatives = asset.derivatives.map((d) => ({
        ...d,
        height: Math.round((d.width * asset.height) / asset.width),
    }));
}
for (const generated of JSON.parse(
    await fs.readFile('src/lib/generatedAssetRegistry.json', 'utf8'),
))
    registry[generated.id] = generated;
const boards = [
    '42d9c3bb-f8b9-4581-a40b-3d14731e95ee.png',
    '489d8386-06e0-4854-b072-ed4b1d81f934.png',
    'c7a36e91-3794-48dc-9934-0c1203f3b924.png',
];
for (const id of [
    'HOME',
    'COLLECTION',
    'ARCHIVE',
    'MEMORY_DETAIL',
    'AUDIO_DETAIL',
    'SHARED_MEMORY',
])
    registry['ASTORY_WEB_UI_' + id] = {
        id: 'ASTORY_WEB_UI_' + id,
        sourceStatus:
            'provisional local implementation; actual app reference boards unavailable',
        requiredSourceFiles: boards,
        resolvedSourcePath: null,
        nativeDimensions: null,
        deliveryDerivatives: [],
        cropMode: 'responsive HTML',
        focalRequirements:
            'Readable labels and source-faithful geometry pending board inspection',
        intendedPlacement: ['website product demonstration'],
        caption: 'Illustrative product preview',
        altText: null,
        generationPrompt: null,
    };
await fs.writeFile(
    'src/lib/assetRegistry.json',
    JSON.stringify(registry, null, 2) + '\n',
);
console.log(
    'Registry enriched: 60 canonical masters, 4 generated supplements, 6 provisional UI records.',
);
