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
/* Finished pages shipped as files from public/<path>/index.html, outside the
   React app: in the sitemap and the hosting rewrites, never prerendered
   (the prerender would overwrite the file with the not-found route). */
export const staticPages = ['/samples'];
export const redirects = {
    '/experience': '/how-it-works',
    '/family': '/for-families',
    '/your-story': '/for-families#your-own-story',
    '/institution': '/care-communities',
    '/story': '/our-story',
    '/faq': '/questions',
    '/why-it-matters': '/#why-a-story',
};
