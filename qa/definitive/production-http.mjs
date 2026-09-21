import {routes,redirects} from '../../scripts/site-routes.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4173', result={base,routes:[],redirects:[]};
for(const route of routes){const r=await fetch(base+route);assert.equal(r.status,200,route);const html=await r.text();assert.match(html,/<h1[ >]/,route);result.routes.push({route,status:r.status});}
for(const [route,destination] of Object.entries(redirects)){const r=await fetch(base+route+'?qa=definitive',{redirect:'manual'});const [path,anchor]=destination.split('#');assert.equal(r.status,301);assert.equal(r.headers.get('location'),path+'?qa=definitive'+(anchor?'#'+anchor:''));result.redirects.push({route,status:r.status,location:r.headers.get('location')});}
await writeFile('qa/definitive/production-http.json',JSON.stringify(result,null,2));console.log('PASS: '+routes.length+' production routes and '+Object.keys(redirects).length+' query-preserving redirects.');

