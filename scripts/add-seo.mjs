/**
 * One-off migration: gives every marketing route its own <Seo /> block.
 *
 * Before this, all eleven pages shared the single <title> in index.html — so
 * search results and every shared link showed the same text regardless of the
 * page. Each entry below is inserted directly after the route component's
 * opening `return (` and its wrapper element.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const components = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components');

const PAGES = {
    'experience.tsx': {
        wrapper: '<ExperienceContainer>',
        title: 'How A Story works — from first question to printed book',
        description:
            'Five steps from the first question to a hardcover memoir: a guided voice interview, memory cards organised by chapter, family contributions, and a printed keepsake shipped to your door.',
        path: '/experience',
        breadcrumb: 'The experience',
    },
    'family.tsx': {
        wrapper: '<FamilyContainer>',
        title: 'A Story for families — ask before the chance passes',
        description:
            "Capture a parent's or grandparent's life story with a guided voice conversation. A private family archive, contributions from relatives anywhere, and a printed hardcover book.",
        path: '/family',
        breadcrumb: 'For families',
    },
    'institution.tsx': {
        wrapper: '<InstitutionContainer>',
        title: 'A Story for care communities — reminiscence at scale',
        description:
            'Life review for senior living, memory care, hospice and hospitals. Low burden for staff, deeply meaningful for residents, HIPAA-aligned handling and live in your community within a week.',
        path: '/institution',
        breadcrumb: 'For care communities',
    },
    'story.tsx': {
        wrapper: '<>',
        title: 'Our story — why A Story exists',
        description:
            'Two strokes in one year, and a grandson who had never asked how his grandparents met. The reason A Story was built, told by the person who built it.',
        path: '/story',
        breadcrumb: 'Our story',
    },
    'faq.tsx': {
        wrapper: '<>',
        title: 'Frequently asked questions — A Story',
        description:
            'How the guided interview works, what it costs, who owns the stories, how privacy is handled, and what organizations and care communities can expect.',
        path: '/faq',
        breadcrumb: 'FAQ',
    },
    'terms.tsx': {
        wrapper: '<>',
        title: 'Terms of service — A Story',
        description: 'The terms that govern use of A Story, written to be read rather than skipped.',
        path: '/terms',
        breadcrumb: 'Terms of service',
    },
    'privacy.tsx': {
        wrapper: '<>',
        title: 'Privacy policy — A Story',
        description:
            'What we collect, what we never do with it, and how a storyteller stays in control. We do not sell data and we do not train AI models on your stories.',
        path: '/privacy',
        breadcrumb: 'Privacy policy',
    },
};

for (const [file, page] of Object.entries(PAGES)) {
    const path = join(components, file);
    let src = readFileSync(path, 'utf8');

    if (src.includes('<Seo')) {
        console.log(`skipped ${file} — already has <Seo />`);
        continue;
    }

    const seo = `            <Seo
                title="${page.title.replace(/"/g, '&quot;')}"
                description="${page.description.replace(/"/g, '&quot;')}"
                path="${page.path}"
                schema={[
                    organizationSchema(),
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: '${page.breadcrumb}', path: '${page.path}' },
                    ]),
                ]}
            />\n`;

    const anchor = `        ${page.wrapper}\n`;
    if (!src.includes(anchor)) throw new Error(`${file}: could not find wrapper ${page.wrapper}`);
    src = src.replace(anchor, anchor + seo);

    /* Imports go above the first existing import so ordering stays stable. */
    src =
        `import Seo from './ui/Seo';\nimport { breadcrumbSchema, organizationSchema } from '../lib/seo';\n` +
        src;

    writeFileSync(path, src);
    console.log(`added <Seo /> to ${file}`);
}
