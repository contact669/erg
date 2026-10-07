// Run after `npm run build`: validate the HTML and sitemap that will be deployed.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('.next/server/app');
const origin = 'https://erg-renovation.fr';
const failures = [];
const pages = new Map();
const internalLinks = [];
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
      const schemas = [];
      for (const script of html.matchAll(/<script\b(?=[^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)) {
        try { const data = JSON.parse(script[1]); schemas.push(...(Array.isArray(data) ? data : [data])); }
        catch { failures.push(`${route}: invalid JSON-LD`); }
      }
      if (route.startsWith('/blog/')) {
        const article = schemas.find(schema => schema['@type'] === 'BlogPosting');
        if (!article?.headline || !article?.datePublished || article?.mainEntityOfPage?.['@id'] !== origin + route) failures.push(`${route}: missing or incomplete article schema`);
      }
      pages.set(route, title);
      for (const image of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
        const src = image[1].replaceAll('&amp;', '&');
        const imageUrl = new URL(src, origin);
        const asset = imageUrl.pathname === '/_next/image' ? imageUrl.searchParams.get('url') : imageUrl.pathname;
        if (asset?.startsWith('/') && !asset.startsWith('/_next/') && imageUrl.origin === origin && !fs.existsSync(path.join('public', asset))) failures.push(`${route}: missing image ${asset}`);
      }
      for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
        const href = match[1].replaceAll('&amp;', '&');
        if (href.startsWith('/') || href.startsWith(origin + '/')) internalLinks.push({ route, href });
      }
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
const broken = new Map();
for (const { route, href } of internalLinks) {
  const target = new URL(href, origin).pathname.replace(/\/$/, '') || '/';
  if (/^\/(dashboard|crm|connexion|api)(\/|$)/.test(target)) continue;
  if (!pages.has(target) && !fs.existsSync(path.join('public', target))) {
    if (!broken.has(target)) broken.set(target, new Set());
    broken.get(target).add(route);
  }
}
for (const [target, sources] of broken) failures.push(`Broken internal link ${target} from ${[...sources].slice(0, 3).join(', ')}`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`SEO checks passed: ${pages.size} public pages, ${urls.length} sitemap URLs; metadata, local images, private noindex and ${internalLinks.length} internal links verified.`);
