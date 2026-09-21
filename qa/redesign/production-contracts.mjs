import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {routes,redirects} from '../../scripts/site-routes.mjs';
const failures=[];let references=0;
for(const route of [...routes,'/__design/a-story-home-vnext']){
 const html=await readFile(`dist${route==='/'?'':route}/index.html`,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one heading`);
 assert.equal((html.match(/<main\b/g)||[]).length,1,`${route}: one main`);
 assert.match(html,/<link[^>]*rel="canonical"/);
 assert.match(html,/<style[^>]*data-styled/);
 assert(!html.includes('greenfield.css'));
 const paths=[...html.matchAll(/(?:src|href)="(\/(?:assets|mission|fonts|book-objects|og)\/[^"?#]+)"/g)].map(m=>m[1]);
 for(const asset of new Set(paths)){references++;try{await access('dist'+asset);}catch{failures.push({route,asset});}}
 const social=html.match(/<meta[^>]*(?:property="og:image"[^>]*content="([^"]+)"|content="([^"]+)"[^>]*property="og:image")/);
 if(social){const path=new URL(social[1]||social[2]).pathname;references++;try{await access('dist'+path);}catch{failures.push({route,asset:path});}}
}
assert.deepEqual(failures,[],'Every prerendered asset and social image exists');
assert.equal(Object.keys(redirects).length,7);
const metadata=JSON.parse(await readFile('qa/redesign/preserved-contracts.json','utf8'));
assert(Object.values(metadata).every(Boolean),'Product facts, legal copy, and protected form logic preserved');
console.log(`PASS: ${routes.length} public snapshots, private noindex snapshot, ${references} asset references, 7 redirects, protected source contracts.`);
