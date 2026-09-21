/** Local-only integration fixture. Nothing here reaches the real Supabase service. */
import { createServer as httpServer } from 'node:http';
import { createServer as viteServer } from 'vite';
import { writeFileSync } from 'node:fs';
let leadAttempts=0, contributionAttempts=0, retryAttempts=0;
const events=[];
const api=httpServer(async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5181');
    res.setHeader('Access-Control-Allow-Headers','authorization,apikey,content-type,x-client-info,prefer');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
    res.setHeader('Content-Type','application/json');
    if(req.method==='OPTIONS'){res.writeHead(204).end();return;}
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    const body=Buffer.concat(chunks).toString();
    events.push({url:req.url,method:req.method,body});writeFileSync('qa/fixture-events.json',JSON.stringify(events,null,2));
    const send=(status,data)=>{res.writeHead(status).end(JSON.stringify(data));};
    if(req.url.includes('get_public_story'))return send(200,{name:'Alexandra',last_name:'Example — a family archive',photo_url:null,intro:'Local test data. A shared archive with memories and family contributions.',relationship:'Daughter',memories:[{id:'memory-1',title:'An afternoon at the lake',body:'We each remembered a different part of the same afternoon.\nThis long memory tests wrapping and preserves paragraph breaks.',era:'Childhood',period:'Summer, approximately 1975',created_at:'2026-09-14',photos:['http://127.0.0.1:5181/mission/30-640.webp']}],testimonials:[{id:'note-1',contributor_name:'Test relative',relationship:'Sibling',body:'Another perspective on the same afternoon.',photos:[],created_at:'2026-09-14'}]});
    if(req.url.includes('get_contribute_info'))return send(200,{name:'Alexandra',last_name:'Example',photo_url:null});
    if(req.url.includes('submit_contribution')){contributionAttempts++;return contributionAttempts===1?send(503,{message:'Simulated temporary failure'}):send(200,true);}
    if(req.url.includes('waitlist_signups')){if(body.includes('Retry Fixture') && retryAttempts++===0)return send(503,{message:'Local simulated failure'});leadAttempts++;if(leadAttempts===1)return send(400,{code:'PGRST204',message:'Simulated missing migration'});if(leadAttempts===3)return send(409,{code:'23505',message:'Simulated duplicate'});return send(201,null);}
    return send(404,{message:'Unknown fixture endpoint'});
});
api.listen(5180,'127.0.0.1');
const app=await viteServer({plugins:[{name:'local-accessibility-audit',transformIndexHtml(){return [{tag:'script',attrs:{src:'/node_modules/axe-core/axe.min.js'},injectTo:'head'},{tag:'script',attrs:{src:'/qa/browser-audit.js',type:'module'},injectTo:'body'}];}}],server:{host:'127.0.0.1',port:5181,strictPort:true,proxy:{'/qa-api':{target:'http://127.0.0.1:5180',rewrite:path=>path.replace(/^\/qa-api/,'')}}},define:{'import.meta.env.VITE_SUPABASE_URL':JSON.stringify('http://127.0.0.1:5181/qa-api'),'import.meta.env.VITE_SUPABASE_ANON_KEY':JSON.stringify('local-fixture-key')}});
await app.listen();
console.log('Local fixture preview: http://127.0.0.1:5181');

