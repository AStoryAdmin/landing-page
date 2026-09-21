import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({channel:'msedge',headless:true});
const out='qa/refinement';
await mkdir(out,{recursive:true});
const results=[];
const routes=['/','/how-it-works','/for-families','/our-story','/pricing','/start','/questions','/guides','/care-communities','/organizations'];
for(const width of [393,768,1024,1440,1728]) {
 const page=await browser.newPage({viewport:{width,height:width===393?852:900},reducedMotion:'reduce'});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 for(const route of routes) {
  await page.goto('http://127.0.0.1:5174'+route);
  await page.locator('h1').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length}));
  results.push({width,route,...state,errors:[...errors]});
  if([393,1440].includes(width)&&routes.indexOf(route)<6) await page.screenshot({path:`${out}/${route.slice(1)||'home'}-${width}.png`,fullPage:true});
 }
 await page.close();
}
await writeFile(`${out}/responsive.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results.filter(r=>r.overflow||r.h1!==1||r.errors.length),null,2));
console.log(`${results.length} route/viewport checks`);
await browser.close();
