import fs from 'node:fs/promises';
import {chromium} from 'playwright';
const src=await fs.readFile('src/components/ui/logoPaths.ts','utf8');
const get=n=>src.match(new RegExp('export const '+n+'\\s*=\\s*[\x27\x22\x60]([^\x27\x22\x60]+)'))[1];
const b=await chromium.launch();const p=await b.newPage();
await p.setContent(`<svg><g id="name"><path d="${get('SIMPLE_NAME_A_PATH')}"/><path d="${get('SIMPLE_NAME_STORY_PATH')}"/></g></svg>`);
console.log(await p.locator('#name').evaluate(e=>{const b=e.getBBox();return {x:b.x,y:b.y,width:b.width,height:b.height}}));await b.close();
