import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Get Clients: finds a business's contact info (email, Instagram, Facebook Page). First on its own website (homepage, Contact, About,
// Privacy pages), then with a web search that is double-checked against the source page.
// Never guesses an address. Also finds the right website when the one on file doesn't work.

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// Member-supplied websites only: refuses addresses inside a private network or on the server itself (SSRF),
// and checks every redirect the same way.
const BLOCKED_HOST = /^(localhost|metadata\.google\.internal|.*\.(localhost|local|internal|lan|home|corp))$/i;
function privateIp(ip: string): boolean {
  const v4 = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    return a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 198 && (b === 18 || b === 19));
  }
  const v6 = ip.toLowerCase();
  if (!v6.includes(':')) return false;
  const mapped = v6.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (mapped) {
    const [hi, lo] = [parseInt(mapped[1], 16), parseInt(mapped[2], 16)];
    return privateIp(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
  }
  if (v6.startsWith('::ffff:')) return privateIp(v6.slice(7));
  return v6 === '::' || v6 === '::1' || /^f[cd]/.test(v6) || /^fe[89ab]/.test(v6);
}
async function publicUrl(raw: string): Promise<boolean> {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if ((u.protocol !== 'http:' && u.protocol !== 'https:') || u.username || u.password) return false;
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (BLOCKED_HOST.test(host) || privateIp(host)) return false;
  if (/^[\d.]+$/.test(host) || host.includes(':')) return true;
  try {
    const ips = [...(await Deno.resolveDns(host, 'A').catch(() => [])), ...(await Deno.resolveDns(host, 'AAAA').catch(() => []))];
    return !ips.some(privateIp);
  } catch {
    return true; // no DNS lookups here: the name checks above still apply
  }
}
async function safeFetch(url: string, init: RequestInit): Promise<Response> {
  let current = url;
  for (let hop = 0; hop < 6; hop++) {
    if (!(await publicUrl(current))) throw new Error('That address is not a public website.');
    const res = await fetch(current, { ...init, redirect: 'manual' });
    const next = res.status >= 300 && res.status < 400 ? res.headers.get('location') : null;
    if (!next) return res;
    current = new URL(next, current).toString();
  }
  throw new Error('Too many redirects.');
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

// Parked or placeholder domains load fine but aren't a real business website.
function looksParked(html: string) {
  if (html.length < 1500 && /location\.(href|replace)|http-equiv=["']refresh/i.test(html)) return true;
  return /(this domain (is|may be) for sale|buy this domain|domain parking|parked free|hugedomains|sedoparking|godaddy\.com\/domainsearch)/i.test(html);
}

async function fetchHtml(url: string, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await safeFetch(url, { signal: controller.signal, headers: { 'User-Agent': UA } });
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

function domainOf(url: string) {
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

// Web search fallback: asks the built-in AI to search for the email and the current website,
// then opens the source page to confirm the email is really there.
async function searchForContact(base44, name: string, location: string, website: string) {
  const raw = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt: [
      `Find the contact email address and the official website for this business:`,
      `Business: ${name}`,
      `Location: ${location}`,
      website ? `Website on file (may be wrong or out of date): ${website}` : `No website on file.`,
      `Return: email (the business's contact email, or empty string), email_source_url (the exact web page where that email appears, or empty string), website (their current official website, full URL, or empty string), instagram (their Instagram profile URL, or empty string), facebook (their Facebook Page URL, or empty string).`,
      `Only return an email you actually saw on a web page. Never guess or build one from the domain name.`,
    ].join('\n'),
    add_context_from_internet: true,
    response_json_schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        email_source_url: { type: 'string' },
        website: { type: 'string' },
        instagram: { type: 'string' },
        facebook: { type: 'string' },
      },
      required: ['email', 'email_source_url', 'website', 'instagram', 'facebook'],
    },
  });
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const { website, name, location, needSocial } = await req.json();

    // 1. Their own website: homepage, then Contact, About, and Privacy pages.
    let siteWorks = false;
    let social = { instagram: '', facebook: '' };
    if (website) {
      const page = await fetchHtml(website);
      siteWorks = page.ok;
      if (page.ok) {
        social = socialLinks(page.html);
        const onSite = await findEmailOnSite(page.finalUrl, page.html);
        const socialDone = !needSocial || (social.instagram && social.facebook);
        if (onSite.email && socialDone) {
          return Response.json({ ...onSite, ...social, method: 'website', email_verified: true, website_works: true });
        }
        if (onSite.email) {
          // Email found; only the web search for missing social links is left.
          const found = name ? await searchForContact(base44, name, location || '', website) : {};
          return Response.json({
            ...onSite,
            instagram: social.instagram || cleanInstagram(found?.instagram),
            facebook: social.facebook || cleanFacebook(found?.facebook),
            method: 'website',
            email_verified: true,
            website_works: true,
          });
        }
      }
    }
    if (!name) return Response.json({ email: '', email_source: '', website_works: siteWorks, ...social });

    // 2. Web search, then double-check the source page.
    const found = await searchForContact(base44, name, location || '', website || '');
    const instagram = social.instagram || cleanInstagram(found?.instagram);
    const facebook = social.facebook || cleanFacebook(found?.facebook);
    const email = String(found?.email || '').trim().toLowerCase();
    let newWebsite = '';
    if (!siteWorks && found?.website && domainOf(found.website) !== domainOf(website || '')) {
      const check = await fetchHtml(found.website);
      if (check.ok) newWebsite = check.finalUrl;
    }
    if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) || JUNK_EMAIL.test(email)) {
      return Response.json({ email: '', email_source: '', website_works: siteWorks || !!newWebsite, new_website: newWebsite, instagram, facebook });
    }
    let verified = false;
    const knownDomains = [domainOf(website || ''), domainOf(newWebsite)].filter(Boolean);
    if (knownDomains.some((d) => email.endsWith('@' + d))) verified = true;
    if (!verified && found.email_source_url) {
      const source = await fetchHtml(found.email_source_url, 8000);
      verified = source.ok && source.html.toLowerCase().includes(email);
    }
    return Response.json({
      email,
      email_source: found.email_source_url || '',
      email_verified: verified,
      method: 'search',
      website_works: siteWorks || !!newWebsite,
      new_website: newWebsite,
      instagram,
      facebook,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
