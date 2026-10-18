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
/* Pages that get their own prerendered file (so they answer 200 with their
   own title) but stay out of the sitemap: noindex, or doors that send people
   on to the web app. `visit` is the address the prerender opens, where the
   snapshot should show a different state from the bare path:
   - /start shows the demonstration form (plain /start goes to the app);
   - /sign-in and /sign-up show the reservation's own form, the one state in
     which someone stays on them (anything else goes to the app);
   - /l shows "Opening the recording…" rather than "This code didn't open". */
export const privateRoutes = [
    { path: '/start', visit: '/start?intent=demo' },
    { path: '/sign-in', visit: '/sign-in?next=/reserve' },
    { path: '/sign-up', visit: '/sign-up?next=/reserve' },
    { path: '/account' },
    { path: '/join' },
    { path: '/thanks' },
    { path: '/l', visit: '/l?m=prerender&k=prerender' },
];
/* The address a page is known by: with a trailing slash, because that is the
   form S3 serves with a 200 whether or not the CloudFront function is
   attached (without it, /pricing answers 301 → /pricing/). */
export const canonicalPath = (path) => (path === '/' ? '/' : path.replace(/\/?$/, '/'));
/* /your-story was in this list and in the page list at once until
   2026-10-18; it is a page (src/pages/site/YourStory.tsx), so it stays one. */
export const redirects = {
    '/experience': '/how-it-works',
    '/family': '/for-families',
    '/institution': '/care-communities',
    '/story': '/our-story',
    '/faq': '/questions',
    '/why-it-matters': '/#why-a-story',
};
