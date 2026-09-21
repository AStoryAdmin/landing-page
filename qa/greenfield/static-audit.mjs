import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {routes,redirects} from '../../scripts/site-routes.mjs';
const require=createRequire(import.meta.url);
const axe=await fs.readFile(require.resolve('axe-core/axe.min.js'),'utf8');
const base='http://127.0.0.1:5191';
const browser=await chromium.launch();
const report={html:[],accessibility:[],behavior:[],performance:[]};
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
const staticPage=await nojs.newPage();
const titles=new Set(),descriptions=new Set(),images=new Set();
for(const route of routes){
 await staticPage.goto(base+route);
 const data=await staticPage.evaluate(()=>({font:getComputedStyle(document.querySelector('h1')).fontFamily,background:getComputedStyle(document.body).backgroundColor,title:document.title,h1:document.querySelectorAll('h1').length,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,og:document.querySelector('meta[property="og:image"]')?.content,schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),text:document.querySelector('main')?.textContent,links:[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href'))}));
 assert.equal(data.h1,1,route+' one H1');assert.match(data.font,/Figtree|Source Serif 4/,'unstyled static page '+route);assert.equal(data.background,'rgb(243, 235, 222)');assert.equal(new URL(data.canonical).pathname,route);assert.ok(data.text.length>(route==='/start'?300:400),'meaningful text '+route);assert.ok(!titles.has(data.title),'duplicate title');assert.ok(!descriptions.has(data.description),'duplicate description');assert.ok(!images.has(data.og),'duplicate social image');
 titles.add(data.title);descriptions.add(data.description);images.add(data.og);
 assert.ok(!/reference boards|provisional|source kit|implementation pending|composite pending/i.test(data.text),'production note visible '+route);
 const graph=data.schema.flatMap(s=>s['@graph']??[s]);assert.ok(graph.some(s=>s['@type']==='Organization'));assert.ok(graph.some(s=>s['@type']==='WebSite'));if(route.startsWith('/guides/'))assert.ok(graph.some(s=>s['@type']==='Article'));
 for(const link of data.links.filter(x=>x.startsWith('/')))assert.ok(!Object.hasOwn(redirects,link.split(/[?#]/)[0]),'legacy link '+link);
 const response=await staticPage.request.get(base+new URL(data.og).pathname);assert.equal(response.status(),200);
 report.html.push({route,oneH1:true,uniqueMetadata:true,canonical:true,meaningfulHtmlWithoutJavaScript:true,styledWithoutJavaScript:true,schemaTypes:graph.map(s=>s['@type'])});
}
await nojs.close();
const motion=await browser.newPage({viewport:{width:1440,height:900}});
await motion.goto(base);await motion.getByRole('button',{name:'Look inside',exact:true}).click();const next=motion.getByRole('dialog').getByRole('button',{name:'Next',exact:true});await next.click();assert.equal(await next.isDisabled(),true);await motion.waitForTimeout(600);assert.equal(await next.isEnabled(),true);report.behavior.push({test:'Book prevents queued turns during animation',passed:true});await motion.close();
for(const width of [1440,393])for(const route of ['/','/care-communities','/how-it-works']){
 const p=await browser.newPage({viewport:{width,height:900}});
 await p.addInitScript(()=>{window.qaPerf={lcp:null,cls:0,eventDurations:[]};new PerformanceObserver(list=>{for(const e of list.getEntries())window.qaPerf.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaPerf.cls+=e.value;}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.qaPerf.eventDurations.push(e.duration);}).observe({type:'event',durationThreshold:16,buffered:true});});
 await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1300);
 if(route==='/'){await p.getByRole('button',{name:'Follow the thread',exact:true}).click();await p.waitForTimeout(700);}
 report.performance.push({route,width,environment:'Local production build; Chromium; no network or CPU throttling; not field Web Vitals',...(await p.evaluate(()=>({...window.qaPerf,fontsLoaded:{figtree:document.fonts.check('19px Figtree'),serif:document.fonts.check('24px "Source Serif 4"')}})))});await p.close();
}
await fs.writeFile('qa/greenfield/static-audit.json',JSON.stringify(report,null,2));
await browser.close();
console.log(JSON.stringify({html:report.html.length,interactiveA11y:report.accessibility.length,violations:report.accessibility.reduce((n,r)=>n+r.violations.length,0),behavior:report.behavior,performance:report.performance},null,2));
if(report.accessibility.some(x=>x.violations.length))process.exitCode=1;


