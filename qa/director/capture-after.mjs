import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import {routes} from '../../scripts/site-routes.mjs';
const b=await chromium.launch({channel:'msedge',headless:true});
const results=[];
for(const width of [393,1440]){
const p=await b.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
for(const route of [...routes,'/thanks','/missing-page','/p/review-example','/contribute/review-example']){
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5174'+route);await p.waitForTimeout(160);await p.evaluate(()=>document.fonts.ready);
 const h=await p.evaluate(()=>document.body.scrollHeight);for(let y=0;y<h;y+=800){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(35);}
 await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(60);
 const name=route.replaceAll('/','_');
 results.push({width,route,...await p.evaluate(()=>({height:document.body.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelector('h1')?.innerText,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)})),errors});
 await p.screenshot({path:`qa/director/after-${width}${name}.png`,fullPage:true});
 await sharp(`qa/director/after-${width}${name}.png`).resize({width:width===393?196:480}).toFile(`qa/director/overview-${width}${name}.png`);
 p.removeAllListeners('pageerror');
}
await p.close();}
await writeFile('qa/director/after.json',JSON.stringify(results,null,2));await b.close();console.log(JSON.stringify(results.filter(x=>x.overflow||x.errors.length||x.broken.length),null,2));console.log('Captured',results.length);
