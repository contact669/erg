// Run after `npm run build`: validate the HTML and sitemap that will be deployed.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('.next/server/app');
const origin = 'https://erg-renovation.fr';
const failures = [];
const pages = new Map();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const relative = path.relative(root, file).replaceAll('\\', '/');
      if (relative === '_not-found.html') continue;
      const route = relative === 'index.html' ? '/' : '/' + relative.slice(0, -5);
      const html = fs.readFileSync(file, 'utf8');
      const privatePage = /^\/(dashboard|crm|connexion)(\/|$)/.test(route);
      if (privatePage) {
        if (!/<meta name="robots" content="[^"]*noindex/.test(html)) failures.push(`${route}: missing noindex`);
        continue;
      }
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/ )?.[1];
      if (canonical?.replace(/\/$/, '') !== (origin + route).replace(/\/$/, '')) failures.push(`${route}: canonical ${canonical ?? 'missing'}`);
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
      if ((title.match(/ERG Rénovation/g) ?? []).length !== 1) failures.push(`${route}: brand missing or repeated in title`);
      if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${route}: missing description`);
      const h1s = (html.match(/<h1(?:\s|>)/g) ?? []).length;
      if (h1s !== 1) failures.push(`${route}: ${h1s} H1 elements`);
      pages.set(route, title);
    }
  }
}
walk(root);
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml.body'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
if (new Set(urls).size !== urls.length) failures.push('Duplicate sitemap URLs');
for (const url of urls) {
  if (!url.startsWith(origin + '/')) failures.push(`Wrong sitemap origin: ${url}`);
  else if (!pages.has(new URL(url).pathname)) failures.push(`Sitemap route has no generated public page: ${url}`);
}
for (const route of pages.keys()) {
  if (!urls.includes(origin + route)) failures.push(`Public page missing from sitemap: ${route}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`SEO checks passed: ${pages.size} public pages, ${urls.length} sitemap URLs; canonicals, titles, descriptions, H1 and private noindex verified.`);
