import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import {routes} from '../../scripts/site-routes.mjs';
const b=await chromium.launch({channel:'msedge',headless:true});
const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const evidence=[];
for(const route of [...routes,'/thanks','/missing-page','/p/review-example','/contribute/review-example']){
 await p.goto('http://127.0.0.1:5174'+route);await p.waitForTimeout(180);
 await p.evaluate(()=>document.fonts.ready);
 const name=route.replaceAll('/','_')||'home';
 const data=await p.evaluate(()=>({title:document.title,text:document.querySelector('main')?.innerText||document.body.innerText,images:[...document.querySelectorAll('main img')].map(x=>({src:x.getAttribute('src'),alt:x.alt})),height:document.body.scrollHeight}));
 evidence.push({route,...data});
 await p.screenshot({path:`qa/director/before${name}.png`,fullPage:true});
 await sharp(`qa/director/before${name}.png`).resize({width:360}).toFile(`qa/director/thumb${name}.png`);
}
await writeFile('qa/director/before.json',JSON.stringify(evidence,null,2));
const refs=['https://bear.plus/works/binder-consulting','https://cargokite.com/','https://www.bear.plus/works/bearpop','https://www.bear.plus/works/roxtaw'];
for(let i=0;i<refs.length;i++){
 try{await p.goto(refs[i],{timeout:25000,waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);await p.screenshot({path:`qa/director/reference-${i}.png`});await writeFile(`qa/director/reference-${i}.txt`,(await p.locator('body').innerText()).slice(0,20000)); console.log(refs[i],await p.title());}catch(e){console.log(refs[i],e.message.slice(0,140));}
}
await b.close();console.log('Captured',evidence.length,'routes');
