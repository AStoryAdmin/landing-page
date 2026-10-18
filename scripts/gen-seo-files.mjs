import { writeFileSync, readFileSync } from 'node:fs';
import { canonicalPath, routes, redirects, staticPages } from './site-routes.mjs';
const SITE = (process.env.VITE_SITE_URL ?? 'https://astoryapp.com').replace(
    /\/$/,
    '',
);
/* When the pages last changed in substance — move it forward with a real
   content change, not every build, so the sitemap is not noise in every diff. */
const lastmod = '2026-10-18';
writeFileSync(
    'public/sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        [...routes, ...staticPages]
            .map(
                (path) =>
                    `  <url><loc>${SITE}${canonicalPath(path)}</loc><lastmod>${lastmod}</lastmod></url>`,
            )
            .join('\n') +
        '\n</urlset>\n',
);
writeFileSync(
    'public/robots.txt',
    `# Public editorial pages; private links remain excluded.
User-agent: *
Allow: /
Disallow: /p/
Disallow: /contribute/
Disallow: /thanks
Disallow: /__design/
Disallow: /join
Disallow: /c/
Disallow: /sign-in
Disallow: /sign-up
Disallow: /account

# Search discovery is independent of training preferences.
# No GPTBot override existed in the source; that preference is unchanged.
User-agent: OAI-SearchBot
Allow: /
Disallow: /p/
Disallow: /contribute/
Disallow: /thanks
Disallow: /__design/
Disallow: /join
Disallow: /c/
Disallow: /sign-in
Disallow: /sign-up
Disallow: /account

Sitemap: ${SITE}/sitemap.xml
`,
);
writeFileSync(
    'public/_redirects',
    Object.entries(redirects)
        .map(([from, to]) => `${from}  ${to}  301`)
        .join('\n') +
        '\n# Existing prerendered files take priority; other paths use the router.\n/*  /index.html  200\n',
);
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
config.redirects = Object.entries(redirects).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
}));
config.rewrites = [
    { source: '/__design/a-story-home-vnext', destination: '/__design/a-story-home-vnext/index.html' },
    ...[...routes, ...staticPages]
        .filter((x) => x !== '/')
        .map((source) => ({ source, destination: source + '/index.html' })),
    { source: '/((?!api/).*)', destination: '/index.html' },
];
writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(
    `Prepared ${routes.length} public routes and ${Object.keys(redirects).length} legacy redirects.`,
);

