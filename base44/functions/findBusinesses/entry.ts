import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Get Clients: finds real local businesses with the built-in AI web search.
// Runs a few searches at once for more results, removes duplicates, flags chains,
// checks that every website actually loads so made-up businesses are easy to spot,
// and looks for an email on the business's own website (never guessed).

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const MAX_RESULTS = 25;

const SCHEMA = {
  type: 'object',
  properties: {
    businesses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          website: { type: 'string' },
          phone: { type: 'string' },
          address: { type: 'string' },
          instagram: { type: 'string' },
          facebook: { type: 'string' },
          source_url: { type: 'string' },
          is_chain: { type: 'boolean' },
        },
        required: ['name', 'website', 'phone', 'address', 'instagram', 'facebook', 'source_url', 'is_chain'],
      },
    },
  },
  required: ['businesses'],
};

function searchPrompt(focus: string, term: string, location: string, exclude: string[]) {
  return [
    `Find up to 12 real, currently operating ${term} in ${location}. Focus: ${focus}.`,
    exclude.length ? `Skip these businesses, they are already on the list: ${exclude.join('; ')}.` : '',
    `Only include businesses you found in actual search results.`,
    `For each one give: name, website (the business's own website, full URL, or empty string if none), phone (or empty string), address, instagram (profile URL or empty string if you did not see one), facebook (their Facebook Page URL or empty string), source_url (the web page where you found this business), and is_chain (true if it is a franchise or part of a chain with more than 3 locations).`,
    `Never invent a business, a website, a phone number, or a URL. If you cannot find 12 real ones, return fewer.`,
  ].filter(Boolean).join('\n');
}

function normalizeUrl(url: string) {
  const u = String(url || '').trim();
  if (!u) return '';
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

function domainOf(url: string) {
  try {
    return new URL(normalizeUrl(url)).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function nameKey(name: string) {
  return String(name || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '');
}

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const JUNK_EMAIL = /(example\.|sentry|wixpress|domain\.com|email\.com|yourname|@\d|\.(png|jpe?g|gif|webp|svg)$)/i;

function emailsIn(html: string) {
  const fromMailto = [...html.matchAll(/mailto:([^"'?\s>]+)/gi)].map((m) => decodeURIComponent(m[1]));
  const fromText = html.replace(/<style[\s\S]*?<\/style>/gi, ' ').match(EMAIL_RE) || [];
  return [...new Set([...fromMailto, ...fromText].map((e) => e.trim().toLowerCase()))].filter(
    (e) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e) && !JUNK_EMAIL.test(e)
  );
}

function pickEmail(emails: string[], siteUrl: string) {
  if (!emails.length) return '';
  let host = '';
  try {
    host = new URL(siteUrl).hostname.replace(/^www\./, '').toLowerCase();
  } catch { /* ignore */ }
  const sameDomain = emails.find((e) => host && e.endsWith('@' + host));
  return sameDomain || emails[0];
}

// Pages that often list an email: contact, about, privacy policy.
function emailPageUrls(html: string, siteUrl: string) {
  const links = [...html.matchAll(/<a[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const urls: string[] = [];
  for (const pattern of [/contact/i, /about/i, /privacy/i]) {
    const hit = links.find((m) => pattern.test(m[1]) || pattern.test(m[2].replace(/<[^>]+>/g, '')));
    if (!hit) continue;
    try {
      const url = new URL(hit[1], siteUrl).toString();
      if (!urls.includes(url)) urls.push(url);
    } catch { /* ignore */ }
  }
  return urls;
}

// Profile links only: skips share buttons, tracking pixels, and links to single posts.
function cleanInstagram(url: string) {
  const m = String(url || '').match(/instagram\.com\/([A-Za-z0-9_.]+)\/?/i);
  if (!m || /^(p|reel|reels|explore|stories|accounts|share|tv)$/i.test(m[1])) return '';
  return `https://www.instagram.com/${m[1]}/`;
}

function cleanFacebook(url: string) {
  const u = String(url || '');
  const id = u.match(/facebook\.com\/profile\.php\?id=(\d+)/i);
  if (id) return `https://www.facebook.com/profile.php?id=${id[1]}`;
  // Older page addresses: facebook.com/pages/.../Business-Name-123456789/
  const legacy = u.match(/facebook\.com\/(pages\/[^?#]*?\d{6,})\/?/i);
  if (legacy) return `https://www.facebook.com/${legacy[1]}/`;
  const m = u.match(/facebook\.com\/(?:pg\/)?([A-Za-z0-9_.-]+)\/?/i);
  if (!m || /^(pages|sharer|sharer\.php|share|tr|plugins|dialog|login|events|groups|watch|hashtag|people|policies|privacy|help|business)$/i.test(m[1])) return '';
  return `https://www.facebook.com/${m[1]}`;
}

function socialLinks(html: string) {
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1].replace(/&amp;/g, '&'));
  return {
    instagram: hrefs.map(cleanInstagram).find(Boolean) || '',
    facebook: hrefs.map(cleanFacebook).find(Boolean) || '',
  };
}

// Parked or placeholder domains load fine but aren't a real business website.
function looksParked(html: string) {
  if (html.length < 1500 && /location\.(href|replace)|http-equiv=["']refresh/i.test(html)) return true;
  return /(this domain (is|may be) for sale|buy this domain|domain parking|parked free|hugedomains|sedoparking|godaddy\.com\/domainsearch)/i.test(html);
}

async function fetchHtml(url: string, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': UA } });
    const html = res.ok ? await res.text() : '';
    return { ok: res.ok && !looksParked(html), html, finalUrl: res.url || url };
  } catch {
    return { ok: false, html: '', finalUrl: url };
  } finally {
    clearTimeout(timer);
  }
}

// Looks for an email on the homepage, then the Contact, About, and Privacy pages. Never guesses.
async function findEmailOnSite(siteUrl: string, homepageHtml?: string) {
  let html = homepageHtml;
  let base = siteUrl;
  if (html === undefined) {
    const page = await fetchHtml(siteUrl);
    if (!page.ok) return { email: '', email_source: '' };
    html = page.html;
    base = page.finalUrl;
  }
  const onHome = pickEmail(emailsIn(html), base);
  if (onHome) return { email: onHome, email_source: base };
  const pages = emailPageUrls(html, base);
  const results = await Promise.all(pages.map((u) => fetchHtml(u, 6000)));
  for (let i = 0; i < pages.length; i++) {
    const found = results[i].ok ? pickEmail(emailsIn(results[i].html), base) : '';
    if (found) return { email: found, email_source: pages[i] };
  }
  return { email: '', email_source: '' };
}

async function checkWebsite(url: string) {
  const empty = { website_checked: false, page_title: '', email: '', email_source: '', site_instagram: '', site_facebook: '' };
  if (!url) return empty;
  const page = await fetchHtml(url);
  if (!page.ok) return empty;
  const social = socialLinks(page.html);
  const title = (page.html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim().slice(0, 160);
  const found = await findEmailOnSite(page.finalUrl, page.html);
  return { website_checked: true, page_title: title, ...found, site_instagram: social.instagram, site_facebook: social.facebook };
}

export default async function (req) {
  const started = Date.now();
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const term = String(body?.businessType || '').trim();
    const location = String(body?.location || '').trim();
    const exclude = (Array.isArray(body?.exclude) ? body.exclude : []).map((n) => String(n).slice(0, 80)).slice(0, 60);
    if (!term || !location) return Response.json({ error: 'Business type and location are required.' }, { status: 400 });

    const focuses = [
      'independent, locally owned businesses',
      'businesses with strong customer reviews',
      'businesses in different neighborhoods and nearby suburbs',
    ];
    const runs = await Promise.allSettled(
      focuses.map((focus) =>
        base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: searchPrompt(focus, term, location, exclude),
          add_context_from_internet: true,
          response_json_schema: SCHEMA,
        })
      )
    );

    const seen = new Set();
    const merged = [];
    let failedSearches = 0;
    for (const run of runs) {
      if (run.status !== 'fulfilled') {
        failedSearches++;
        continue;
      }
      const data = typeof run.value === 'string' ? JSON.parse(run.value) : run.value;
      for (const b of data?.businesses || []) {
        if (!b?.name) continue;
        const website = normalizeUrl(b.website);
        const keys = [domainOf(website), nameKey(b.name)].filter(Boolean);
        if (keys.some((k) => seen.has(k))) continue;
        keys.forEach((k) => seen.add(k));
        merged.push({ ...b, website, dedupe_key: domainOf(website) || nameKey(b.name) });
      }
    }
    if (failedSearches === focuses.length) {
      const reason = runs.find((r) => r.status === 'rejected')?.reason;
      throw new Error(reason?.message || 'The search failed.');
    }

    const limited = merged.slice(0, MAX_RESULTS + 10);
    const checks = await Promise.all(limited.map((b) => checkWebsite(b.website)));
    const businesses = limited.map((b, i) => {
      const title = checks[i].page_title || '';
      const looksLikeChain = /\b\d{2,}\+?\s+locations\b/i.test(title);
      const { site_instagram, site_facebook, ...check } = checks[i];
      return {
        ...b,
        ...check,
        // Links found on their own website win over search results.
        instagram: site_instagram || cleanInstagram(b.instagram),
        facebook: site_facebook || cleanFacebook(b.facebook),
        is_chain: !!b.is_chain || looksLikeChain,
      };
    });

    // Independent businesses with a working website first.
    businesses.sort((a, b) => Number(a.is_chain) - Number(b.is_chain) || Number(b.website_checked) - Number(a.website_checked));

    return Response.json({
      businesses: businesses.slice(0, MAX_RESULTS + 10),
      elapsed_ms: Date.now() - started,
      failed_searches: failedSearches,
    });
  } catch (error) {
    return Response.json({ error: error.message, elapsed_ms: Date.now() - started }, { status: 500 });
  }
}
