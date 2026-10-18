/**
 * Counts the app's question bank into src/lib/questionBank.json, which
 * src/lib/product.ts reads. Runs at the start of every build.
 *
 * The site said 504 questions for weeks after the app had 547. Counting from
 * the app's own data at build time means it cannot drift again.
 *
 * The bank lives in the web app (web-app/src/app-core/data/interview.js,
 * ALL_PROMPTS) and the phone app (phone-app/src/data/interview.js). When
 * neither checkout sits next to this one (GitHub Actions checks out this repo
 * alone), the committed JSON is used as it is and this says so.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const out = new URL('../src/lib/questionBank.json', import.meta.url);
const sources = [
    ['web-app/src/app-core/data/interview.js', new URL('../../web-app/src/app-core/data/interview.js', import.meta.url)],
    ['phone-app/src/data/interview.js', new URL('../../phone-app/src/data/interview.js', import.meta.url)],
];

const found = sources.find(([, url]) => existsSync(url));
if (!found) {
    const kept = JSON.parse(readFileSync(out, 'utf8'));
    console.log(`question bank: no app checkout beside this one; keeping ${kept.questions} questions from ${kept.source}.`);
} else {
    const [name, url] = found;
    const { ALL_PROMPTS } = await import(url.href);
    if (!Array.isArray(ALL_PROMPTS) || ALL_PROMPTS.length === 0) throw new Error(`${name}: no ALL_PROMPTS`);
    const bank = {
        questions: ALL_PROMPTS.length,
        sensitive: ALL_PROMPTS.filter((p) => p.sensitive).length,
        chapters: new Set(ALL_PROMPTS.map((p) => p.era)).size,
        source: `${name} (ALL_PROMPTS)`,
    };
    const next = JSON.stringify(bank, null, 4) + '\n';
    const before = existsSync(out) ? readFileSync(out, 'utf8') : '';
    if (before.replace(/\r/g, '') !== next) writeFileSync(out, next);
    console.log(`question bank: ${bank.questions} questions, ${bank.sensitive} sensitive, ${bank.chapters} chapters, from ${name}.`);
}
