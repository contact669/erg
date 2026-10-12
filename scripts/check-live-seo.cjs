// Read-only checks of the actual deployed public pages, not just the local build.
const fs = require('node:fs');
const origin = 'https://erg-renovation.fr';
const findings = [];
const pages = [];

async function request(url) {
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(25000) });
  return { status: response.status, location: response.headers.get('location'), robots: response.headers.get('x-robots-tag'), html: await response.text() };
}

async function main() {
  const sitemap = await request(`${origin}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`Sitemap HTTP ${sitemap.status}`);
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
  if (!urls.length) throw new Error('Sitemap contains no URLs');
  if (new Set(urls).size !== urls.length) findings.push('Duplicate sitemap URLs');
  const queue = [...new Set(urls)];
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      if (new URL(url).origin !== origin) { findings.push(`${url}: incorrect sitemap origin`); continue; }
      try {
        const response = await request(url);
        const errors = [];
        if (response.status !== 200) errors.push(`HTTP ${response.status}${response.location ? ` to ${response.location}` : ''}`);
        else {
          if (/\b(?:noindex|none)\b/i.test(response.robots || '')) errors.push(`X-Robots-Tag ${response.robots}`);
          const canonical = response.html.match(/<link\b(?=[^>]*rel="canonical")[^>]*href="([^"]+)"/)?.[1];
          if (canonical?.replace(/\/$/, '') !== url.replace(/\/$/, '')) errors.push(`canonical ${canonical || 'missing'}`);
          if (/<meta\b(?=[^>]*name="(?:robots|googlebot)")[^>]*content="[^"]*noindex/i.test(response.html)) errors.push('noindex in sitemap');
          const h1Count = [...response.html.matchAll(/<h1(?:\s|>)/g)].length;
          if (h1Count !== 1) errors.push(`${h1Count} H1 elements`);
          if (!/<meta name="description" content="[^"]+"/.test(response.html)) errors.push('missing description');
          if (!/<title>[^<]+<\/title>/.test(response.html)) errors.push('missing title');
        }
        pages.push({ url, status: response.status, errors });
        for (const error of errors) findings.push(`${url}: ${error}`);
      } catch (error) { findings.push(`${url}: ${error.message}`); }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  const robots = await request(`${origin}/robots.txt`);
  if (robots.status !== 200) findings.push(`robots.txt HTTP ${robots.status}`);
  else {
    if (/^Disallow:\s*\/\s*$/m.test(robots.html)) findings.push('robots.txt blocks entire website');
    if (!robots.html.includes(`${origin}/sitemap.xml`)) findings.push('robots.txt does not reference canonical sitemap');
  }
  const result = { checkedAt: new Date().toISOString(), sitemapUrls: urls.length, checkedPages: pages.length, findings, pages: pages.sort((a, b) => a.url.localeCompare(b.url)) };
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(result, null, 2));
  console.log(`Live SEO: ${pages.length}/${urls.length} pages checked; ${findings.length} findings.`);
  if (findings.length) { console.error(findings.join('\n')); process.exitCode = 1; }
  console.log('This checks crawlability signals only; Google indexation requires Search Console URL inspection.');
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
