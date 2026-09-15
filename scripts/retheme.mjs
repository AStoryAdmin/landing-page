/**
 * One-off migration: repoints the per-file colour objects in the older page
 * styles at the central brand tokens.
 *
 * Each style file used to declare its own hex values. Rather than rewrite every
 * component, this keeps the local `colors` / `fonts` object shape — so every
 * `${colors.orange}` reference still resolves — but sources each value from
 * src/styles/theme.ts. After this runs, changing a brand colour is a one-file
 * edit again.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const components = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components');

/** Old key → token expression, per file. */
const COMMON = {
    cream: 'color.ivory',
    paper: 'color.paper',
    orange: 'color.accent',
    orangeHover: 'color.accentHover',
    gold: 'color.gold',
    dark: 'color.primaryDeep',
    ink: 'color.ink',
    softInk: 'color.bodyMuted',
    mutedBrown: 'color.faint',
    darkGray: 'color.body',
    gray: 'color.onDarkMuted',
    whiteGray: 'color.primaryLine',
    line: 'color.primaryLine',
    green: 'color.live',
    success: 'color.live',
    red: 'color.error',
    ink08: "'rgba(15, 74, 88, 0.08)'",
    ink15: 'color.primaryLine',
    ink40: 'color.faint',
    ink70: 'color.body',
    fireBg: 'color.primaryDeep',
    fireText: 'color.onDark',
    fire60: 'color.onDarkMuted',
    white: 'color.paper',
    softYellow: 'color.goldWash',
    bgCream: "'rgba(243, 235, 221, 0.9)'",
    lightOrange: 'color.accentWash',
    orangeSoft: 'color.accentWash',
    darkGrayHover: 'color.primaryLine',
};

const PER_FILE = {
    'demoPhone.styles.ts': { paper2: 'color.ivory', paper3: 'color.ivoryDeep' },
    'story.styles.ts': { paper2: 'color.ivoryDeep', paper3: 'color.paper' },
    'faq.styles.ts': { paper2: 'color.paper' },
    'privacy.styles.ts': { paper2: 'color.paper', orangeHover: 'color.accentWash' },
    'terms.styles.ts': { paper2: 'color.paper', orangeHover: 'color.accentWash' },
};

const FILES = [
    'contribute.styles.ts', 'demoPhone.styles.ts', 'experience.styles.ts', 'family.styles.ts',
    'faq.styles.ts', 'flipBook.styles.ts', 'institution.styles.ts', 'privacy.styles.ts',
    'publicStory.styles.ts', 'story.styles.ts', 'terms.styles.ts',
];

for (const file of FILES) {
    const path = join(components, file);
    let src = readFileSync(path, 'utf8');
    const map = { ...COMMON, ...(PER_FILE[file] ?? {}) };

    /* Rewrite the colours object in place, key by key. */
    src = src.replace(/const colors = \{[\s\S]*?\n\};/, (block) => {
        const keys = [...block.matchAll(/^\s{4}(\w+):/gm)].map((m) => m[1]);
        const unmapped = keys.filter((k) => !map[k]);
        if (unmapped.length) throw new Error(`${file}: no token mapped for ${unmapped.join(', ')}`);
        const body = keys.map((k) => `    ${k}: ${map[k]},`).join('\n');
        return `const colors = {\n${body}\n};`;
    });

    /* And the fonts object, which is identical in every file. */
    src = src.replace(
        /const fonts = \{[\s\S]*?\n\};/,
        'const fonts = {\n    body: font.body,\n    display: font.display,\n    script: font.script,\n};'
    );

    if (!src.includes("from '../styles/theme'")) {
        src = src.replace(
            /^(import .*?;\n)/,
            `$1import { color, font } from '../styles/theme';\n`
        );
    }

    writeFileSync(path, src);
    console.log(`rethemed ${file}`);
}
