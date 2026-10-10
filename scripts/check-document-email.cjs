// Exercise the real document email route with Resend and the admin check replaced: no real emails are sent.
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),Module=require('module'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
let admin=false, sent=[];
const filename=path.resolve('src/app/api/send-document-email/route.ts');
const m=new Module(filename,module); m.filename=filename; m.paths=Module._nodeModulePaths(path.dirname(filename));
const orig=m.require.bind(m);
m.require=id=>{
 if(id==='resend')return{Resend:class{emails={send:async x=>{sent.push(x);return{error:null}}}}};
 if(id==='@/lib/server/require-admin')return{isAdminRequest:async()=>admin};
 if(id==='@/lib/company')return require(path.resolve('src/lib/company.ts'));
 if(id==='@/lib/escape-html')return require(path.resolve('src/lib/escape-html.ts'));
 return orig(id)};
m._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2020}}).outputText,filename);
const post=b=>m.exports.POST(new Request('http://x/api',{method:'POST',body:JSON.stringify(b)}));
(async()=>{process.env.RESEND_API_KEY='k';
 const body={clientEmail:'a@b.fr',clientName:'<b>X</b>',documentType:'Devis',documentNumber:'D1',customMessage:'<script>alert(1)</script>'};
 assert.equal((await post(body)).status,401); assert.equal(sent.length,0);
 admin=true; assert.equal((await post(body)).status,200);
 const html=sent[0].html; assert(!html.includes('<script>')); assert(html.includes('&lt;script&gt;')); assert(html.includes('818 676 652 00014')); assert(!/AXA|Boétie|984 729/.test(html));
 sent=[]; const r2=await post({...body,copyAdmin:false,pdfBase64:Buffer.from('%PDF-1.4 test').toString('base64'),pdfFileName:'Procès-Verbal de Réception_PV 1'}); assert.equal(r2.status,200); assert.equal(sent[0].cc,undefined); assert.equal(sent[0].attachments[0].filename,'Proces-Verbal_de_Reception_PV_1.pdf'); assert.equal(sent[0].attachments[0].content.toString(),'%PDF-1.4 test'); assert.equal((await post({...body,pdfBase64:'<bad>'})).status,400); console.log('Document email checks passed: admin required, HTML escaped, verified identity only, PDF attachment and optional copy.')})().catch(e=>{console.error(e);process.exit(1)});
