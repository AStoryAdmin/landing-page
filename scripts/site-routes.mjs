import { readFileSync } from 'node:fs';
const read = (path) =>
    JSON.parse(
        readFileSync(new URL(path, import.meta.url), 'utf8').replace(
            /^\uFEFF/,
            '',
        ),
    );
export const pages = read('../src/lib/sitePages.json');
export const guides = read('../src/lib/guides.json');
export const routes = [
    ...pages.map((p) => p.path),
    ...guides.map((g) => '/guides/' + g.slug),
];
export const redirects = {
    '/experience': '/how-it-works',
    '/family': '/for-families',
    '/your-story': '/for-families#your-own-story',
    '/institution': '/care-communities',
    '/story': '/our-story',
    '/faq': '/questions',
    '/why-it-matters': '/#why-a-story',
};
