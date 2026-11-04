import { chromium } from 'playwright';
const [,, url, sel, depth='2'] = process.argv;
const b = await chromium.launch(); const p = await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto(url,{waitUntil:'networkidle'}); await p.waitForTimeout(600);
console.log(await p.evaluate(([sel,depth])=>{const out=[];const walk=(el,d)=>{const h=Math.round(el.getBoundingClientRect().height);if(h<20)return;out.push('  '.repeat(d)+el.tagName.toLowerCase()+'.'+(el.className.toString().split(' ').filter(c=>!c.startsWith('sc-')).join('.'))+(el.id?'#'+el.id:'')+' '+h);if(d<depth)for(const c of el.children)walk(c,d+1)};walk(document.querySelector(sel),0);return out.join('\n')},[sel,+depth]));
await b.close();
