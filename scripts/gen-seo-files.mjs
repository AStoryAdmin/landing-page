/**
 * Writes public/sitemap.xml and public/robots.txt.
 *
 * Keep ROUTES in step with the router in src/App.tsx — these are the only
 * indexable pages. Shared archives (/p/:slug) and contribute links
 * (/contribute/:slug) are deliberately excluded and disallowed: they are
 * private URLs handed to specific people, not public pages.
 *
 * Run with `npm run seo` (also runs as part of `npm run build`).
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SITE = (process.env.VITE_SITE_URL ?? 'https://astoryapp.com').replace(/\/$/, '');

const ROUTES = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    /* The conversion page. High priority on purpose: it is where every CTA on
       the site lands, and it is the page paid traffic is pointed at. */
    { path: '/start', priority: '0.9', changefreq: 'monthly' },
    { path: '/experience', priority: '0.9', changefreq: 'monthly' },
    { path: '/family', priority: '0.9', changefreq: 'monthly' },
    { path: '/organizations', priority: '0.9', changefreq: 'monthly' },
    { path: '/institution', priority: '0.9', changefreq: 'monthly' },
    { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { path: '/story', priority: '0.6', changefreq: 'yearly' },
    { path: '/your-story', priority: '0.8', changefreq: 'monthly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
    (r) => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

const robots = `# A Story
User-agent: *
Allow: /

# Private, per-person links — never public pages.
Disallow: /p/
Disallow: /contribute/

Sitemap: ${SITE}/sitemap.xml
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
console.log(`sitemap.xml (${ROUTES.length} routes) and robots.txt written for ${SITE}`);
