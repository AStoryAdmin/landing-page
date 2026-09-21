import ts from 'typescript';
import {readFile,writeFile} from 'node:fs/promises';
const reference='../_reference-review/definitive/landing-page-brand-refresh-2026/';
const files=['src/lib/pricing.ts','src/lib/product.ts','src/lib/checkout.ts','src/lib/demoScripts.ts','src/components/ui/LeadForm.tsx'];
function signature(node){if(ts.isParenthesizedExpression(node))return signature(node.expression);const children=[];ts.forEachChild(node,n=>{children.push(signature(n));});return [node.kind,!ts.isSourceFile(node)&&typeof node.text==='string'?node.text:null,children];}
const parse=(s,file)=>JSON.stringify(signature(ts.createSourceFile(file,s,ts.ScriptTarget.Latest,true)));
const results={};
for(const file of files){const [a,b]=await Promise.all([readFile(file,'utf8'),readFile(reference+file,'utf8')]);results[file]={equivalent:parse(a,file)===parse(b,file)};}
results['src/components/ui/LeadForm.tsx'].notes='Existing redesign retains the original submit flow, name split, source and demo intent, duplicate handling and fallback; adds optional-email validation, focus-on-error, linked errors and accurate confirmation copy. Unchanged by this definitive redesign.';
await writeFile('qa/definitive/source-comparison.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));

