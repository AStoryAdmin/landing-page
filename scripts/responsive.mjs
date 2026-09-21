/**
 * One-off migration: makes the older page styles responsive.
 *
 * Those files were written desktop-only — fixed multi-column grids and
 * hard-coded 150px/80px section padding — so on a phone the columns squeezed
 * to unreadable widths and the copy ran to the edge. This rewrites the two
 * offending patterns mechanically:
 *
 *   • fixed column counts gain breakpoints down to a single column
 *   • fixed section padding becomes a clamp() that scales with the viewport
 *
 * New files use the tokens and primitives directly and need none of this.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const components = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components');

const FILES = [
    'institution.styles.ts', 'family.styles.ts', 'faq.styles.ts', 'privacy.styles.ts',
    'terms.styles.ts', 'story.styles.ts', 'experience.styles.ts', 'contribute.styles.ts',
    'publicStory.styles.ts', 'demoPhone.styles.ts',
];

/** Column collapses, keyed by the exact declaration they follow. */
const GRID_RULES = [
    ['grid-template-columns: repeat(4, 1fr);', ['1024px:repeat(2, 1fr)', '640px:1fr']],
    ['grid-template-columns: repeat(3, 1fr);', ['1024px:repeat(2, 1fr)', '640px:1fr']],
    ['grid-template-columns: repeat(2, 1fr);', ['860px:1fr']],
    ['grid-template-columns: 1.1fr 0.9fr;', ['1024px:1fr']],
    ['grid-template-columns: 1fr 1fr;', ['860px:1fr']],
    ['grid-template-columns: 1.2fr 0.8fr;', ['1024px:1fr']],
];

/** Fixed section padding → fluid. */
const PADDING_RULES = [
    ['padding: 150px 80px;', 'padding: clamp(72px, 9vw, 150px) clamp(20px, 5vw, 80px);'],
    ['padding: 120px 80px;', 'padding: clamp(64px, 8vw, 120px) clamp(20px, 5vw, 80px);'],
    ['padding: 180px 0 90px;', 'padding: clamp(64px, 8vw, 120px) 0 clamp(48px, 6vw, 90px);'],
    ['padding: 100px 0 140px;', 'padding: clamp(56px, 7vw, 100px) 0 clamp(72px, 9vw, 140px);'],
    ['padding: 128px 0 96px;', 'padding: clamp(64px, 8vw, 128px) 0 clamp(56px, 7vw, 96px);'],
    ['padding: 100px 0;', 'padding: clamp(56px, 7vw, 100px) 0;'],
    ['padding: 150px 30px;', 'padding: clamp(72px, 9vw, 150px) clamp(20px, 4vw, 30px);'],
];

const indentOf = (src, index) => {
    const lineStart = src.lastIndexOf('\n', index) + 1;
    return src.slice(lineStart, index);
};

let changed = 0;

for (const file of FILES) {
    const path = join(components, file);
    let src = readFileSync(path, 'utf8');
    const before = src;

    for (const [decl, breakpoints] of GRID_RULES) {
        let from = 0;
        for (;;) {
            const at = src.indexOf(decl, from);
            if (at === -1) break;
            const end = at + decl.length;
            // Skip declarations that already sit inside a media query block,
            // and any we have already patched on a previous pass.
            const following = src.slice(end, end + 260);
            if (following.includes('@media') && following.indexOf('@media') < 40) {
                from = end;
                continue;
            }
            const pad = indentOf(src, at);
            const block = breakpoints
                .map((b) => {
                    const [width, value] = b.split(':');
                    return `\n${pad}@media (max-width: ${width}) { grid-template-columns: ${value}; }`;
                })
                .join('');
            src = src.slice(0, end) + block + src.slice(end);
            from = end + block.length;
        }
    }

    for (const [decl, replacement] of PADDING_RULES) {
        src = src.split(decl).join(replacement);
    }

    /* Two half-width panels in the experience demo need a phone fallback. */
    if (file === 'experience.styles.ts') {
        src = src.replace(
            /max-width: 50%;\n    width: 330px;/,
            'max-width: 100%;\n    width: min(330px, 86vw);'
        );
        src = src.replace(
            /grid-column: 1 \/ -1;\n    flex-direction: row;/,
            'grid-column: 1 / -1;\n    flex-direction: row;\n\n    @media (max-width: 640px) { flex-direction: column; }'
        );
    }

    if (src !== before) {
        writeFileSync(path, src);
        changed += 1;
        console.log(`responsive rules added to ${file}`);
    }
}

console.log(`\n${changed} files updated`);
