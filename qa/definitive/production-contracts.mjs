import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {routes,redirects,privateRoutes,canonicalPath} from '../../scripts/site-routes.mjs';
const failures=[];let references=0;
for(const route of [...routes,...privateRoutes.map(r=>r.path),'/__design/a-story-home-vnext']){
 const html=await readFile(`dist${route==='/'?'':route}/index.html`,'utf8');
 /* Its own canonical, with the trailing slash S3 serves without a redirect (site-routes.mjs canonicalPath). */
 if(!route.startsWith('/__design')&&!['/join','/account','/thanks','/l','/start','/sign-in','/sign-up'].includes(route)) assert(html.includes(`rel="canonical" href="https://astoryapp.com${canonicalPath(route)}"`),`${route}: canonical ${canonicalPath(route)}`);
 /* The doors into the web app ride along in every snapshot. */
 assert(html.includes('app.astoryapp.com/join/')||html.includes('"/join/" + m[1]'),`${route}: carries the invitation redirect`);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one heading`);
 // /l is the bare listening page, outside the site's chrome: no <main>.
 if(route!=='/l') assert.equal((html.match(/<main\b/g)||[]).length,1,`${route}: one main`);
 assert.match(html,/<link[^>]*rel="canonical"/);
 assert.match(html,/<style[^>]*data-styled/);
 assert(!html.includes('greenfield.css'));
 const paths=[...html.matchAll(/(?:src|href)="(\/(?:assets|mission|fonts|book-objects|og)\/[^"?#]+)"/g)].map(m=>m[1]);
 for(const asset of new Set(paths)){references++;try{await access('dist'+asset);}catch{failures.push({route,asset});}}
 const social=html.match(/<meta[^>]*(?:property="og:image"[^>]*content="([^"]+)"|content="([^"]+)"[^>]*property="og:image")/);
 if(social){const path=new URL(social[1]||social[2]).pathname;references++;try{await access('dist'+path);}catch{failures.push({route,asset:path});}}
}
assert.deepEqual(failures,[],'Every prerendered asset and social image exists');
assert.equal(Object.keys(redirects).length,6);
for(const from of Object.keys(redirects)) await access(`dist${from}/index.html`);
/* Until 2026-10-18 this also required pricing.ts, product.ts, checkout.ts and
   demoScripts.ts to match a September reference copy (compare-sources.mjs).
   That copy is gone from disk, and freezing those files is what kept the
   site saying 504 questions and "no calls" on Free after the app changed.
   The product facts are now checked against the app itself instead
   (scripts/question-bank.mjs). */
const brand=JSON.parse(await readFile('src/lib/brand.json','utf8'));
assert.deepEqual(Object.values(brand).sort(), ['#F3EBDD','#4A3327','#B85126','#0F4A58','#E0A03F','#EBC86A','#4C4C4C'].sort());
const favicon=await readFile('public/favicon.svg','utf8');
assert(favicon.includes(brand.teal)&&favicon.includes(brand.warmGold));
console.log(`PASS: ${routes.length} public snapshots with their own canonicals, ${privateRoutes.length + 1} noindex snapshots, ${references} asset references, ${Object.keys(redirects).length} old addresses, seven exact brand tokens.`);
