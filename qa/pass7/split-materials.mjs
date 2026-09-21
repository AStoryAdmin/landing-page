import fs from 'node:fs';
let p='src/pages/site/pass7/materials.tsx',s=fs.readFileSync(p,'utf8');
const a=s.indexOf('export const cream'),b=s.indexOf('export const Container');
fs.writeFileSync('src/pages/site/pass7/foundation.ts','import {useEffect,useRef,useState} from "react";\nimport {color} from "../../../styles/theme";\n'+s.slice(a,b));
s=s.slice(0,a)+'import {cream,useEntered} from "./foundation";\n'+s.slice(b);s=s.replace('import {useEffect,useRef,useState,type ReactNode}','import {type ReactNode}');
fs.writeFileSync(p,s);
for(const f of fs.readdirSync('src/pages/site/pass7').filter(x=>x.endsWith('.tsx')&&x!=='materials.tsx')){
p='src/pages/site/pass7/'+f;s=fs.readFileSync(p,'utf8');
let names=[];s=s.replace(/import \{([^}]+)\} from "\.\/materials";/g,(line,inside)=>{const v=inside.split(',').map(x=>x.trim());names=v.filter(x=>x==='cream'||x==='useEntered');return 'import {'+v.filter(x=>!names.includes(x)).join(',')+'} from "./materials";';});if(names.length)s='import {'+names.join(',')+'} from "./foundation";\n'+s;fs.writeFileSync(p,s);
}
p='src/lib/sitePages.json';const pages=JSON.parse(fs.readFileSync(p,'utf8'));pages[0].photo='34';pages[0].phrase=['Every family has','more to tell.'];fs.writeFileSync(p,JSON.stringify(pages,null,2)+'\n');
p='src/components/ui/RouteTransition.tsx';s=fs.readFileSync(p,'utf8').replace('320ms','280ms');fs.writeFileSync(p,s);

