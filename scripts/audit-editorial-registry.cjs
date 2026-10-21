// Read the generated public HTML. Never modifies, redirects or removes a site page.
const fs = require('node:fs');
const path = require('node:path');
const registry = require('../docs/seo-editorial-registry.json');
const root = path.resolve('.next/server/app');
if (!fs.existsSync(root)) throw new Error('Run npm run build before the editorial audit.');
const pages = [];
function text(html) { return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (entry.name.endsWith('.html')) {
      const relative = path.relative(root, file).replaceAll('\\', '/');
      const route = relative === 'index.html' ? '/' : '/' + relative.slice(0, -5);
      if (/^\/(?:dashboard|crm|connexion|_not-found)(?:\/|$)/.test(route)) continue;
      const html = fs.readFileSync(file, 'utf8');
      pages.push({route, title:text(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''), description:html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '', h1:text(html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1] || ''), intents:registry.intents.filter(i => i.route === route).map(i=>i.id)});
    }
  }
}
scan(root);
pages.sort((a,b)=>a.route.localeCompare(b.route));
const issues = [];
for (const field of ['id','route']) {
  const seen = new Set();
  for (const intent of registry.intents) {
    if (seen.has(intent[field])) issues.push(`Duplicate registry ${field}: ${intent[field]}`);
    seen.add(intent[field]);
  }
}
for (const intent of registry.intents) if (!pages.some(p=>p.route===intent.route)) issues.push(`Missing target: ${intent.route}`);
const duplicateSignals=[];
for (const field of ['title','description','h1']) {
  const groups=new Map();
  for(const p of pages) {
    const value=p[field].toLocaleLowerCase('fr').replace(/\s+/g,' ').trim();
    if(!value) continue;
    if(!groups.has(value)) groups.set(value,[]);
    groups.get(value).push(p.route);
  }
  for(const [value,routes] of groups) if(routes.length>1) duplicateSignals.push({field,value,routes});
}
const report={reviewedAt:registry.reviewedAt, generatedAt:new Date().toISOString(), scope:'HTML local généré. Les doublons exacts sont des signaux de revue, pas une preuve de cannibalisation ou de duplication du corps de page.', pages, duplicateSignals, issues, ...registry};
const out=process.argv[2];
if(!out) throw new Error('Provide an output directory outside public/.');
const output=path.resolve(out);
if(output===path.resolve('public')||output.startsWith(path.resolve('public')+path.sep)) throw new Error('Do not publish the editorial audit in public/.');
fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,'registre-seo-erg.json'),JSON.stringify(report,null,2));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const table=(headers,rows)=>`<div class="table"><table><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const html=`<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Registre SEO ERG Rénovation</title><style>body{font:16px/1.6 system-ui;margin:0;background:#f8fafc;color:#1e293b}main{max-width:1440px;margin:auto;padding:32px}h1{font-size:30px}h2{margin-top:40px}th{background:#334155;color:white;text-align:left}td,th{padding:12px;vertical-align:top;border-bottom:1px solid #cbd5e1}table{border-collapse:collapse;width:100%;background:white}.table{overflow:auto}td:first-child{white-space:nowrap}p{max-width:95ch}summary{cursor:pointer;font-weight:600}</style><main><h1>Registre SEO ERG Rénovation</h1><p>Revue du ${esc(registry.reviewedAt)}. ${pages.length} pages publiques inventoriées. ${registry.intents.length} intentions prioritaires affectées à une URL. Les autres pages restent à qualifier individuellement.</p><h2>Ordre d'exécution</h2><ol><li>Suivre l'exploration des pages commerciales déjà soumises, sans demandes répétées.</li><li>Relire le modèle des services et le guide énergétique historique.</li><li>Clarifier les chevauchements entre guides et services avant de créer des contenus.</li><li>Qualifier les pages locales existantes et les preuves disponibles avant toute extension.</li></ol><h2>Règles de publication</h2><ul>${registry.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ul><h2>Intentions et pages prioritaires</h2>${table(['Priorité','Intention','Page principale','Action','Preuve / limite','Prochaine étape'],registry.intents.map(i=>[i.priority,i.intent,i.route,i.action,i.proof,i.next]))}<h2>Sujets à valider avant création</h2>${table(['Priorité','Sujet','Décision','Condition'],registry.backlog.map(i=>[i.priority,i.subject,i.decision,i.condition]))}<h2>Signaux de doublons exacts</h2><p>${esc(report.scope)}</p>${duplicateSignals.length?table(['Champ','Valeur','Pages'],duplicateSignals.map(i=>[i.field,i.value,i.routes.join(' ; ')])):'<p>Aucun titre, H1 ou description strictement identique après normalisation. Cela ne valide pas l’originalité des textes ni leur différenciation.</p>'}<h2>Inventaire complet</h2><details><summary>${pages.length} pages et leur affectation</summary>${table(['URL','Titre','Intention affectée'],pages.map(p=>[p.route,p.title,p.intents.join(', ')||'À qualifier']))}</details><h2>Contrôle des affectations</h2><p>${issues.length?esc(issues.join(' ; ')):'Toutes les URL cibles existent dans le HTML généré. Aucun identifiant ou propriétaire d’URL répété dans le registre.'}</p></main></html>`;
fs.writeFileSync(path.join(output,'registre-seo-erg.html'),html);
console.log(JSON.stringify({pages:pages.length,intents:registry.intents.length,backlog:registry.backlog.length,duplicateSignals:duplicateSignals.length,issues,output}));
if(issues.length) process.exitCode=1;
