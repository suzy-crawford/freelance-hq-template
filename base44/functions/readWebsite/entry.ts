import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Get Clients: reads a business website so the Analyze step can describe what is really there.
// No AI here. It returns the page text and a few useful signals.

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
const CTA_WORDS = /(book|schedule|call|contact|consult|buy|shop|get started|appointment|reserve|quote|sign up|join)/i;

function htmlToText(html: string) {
  return html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
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

function looksParked(html: string) {
  if (html.length < 1500 && /location\.(href|replace)|http-equiv=["']refresh/i.test(html)) return true;
  return /(this domain (is|may be) for sale|buy this domain|domain parking|parked free|hugedomains|sedoparking)/i.test(html);
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { url, follow } = await req.json();
    if (!url) return Response.json({ ok: false, error: 'No website on file.' });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    let html = '';
    let finalUrl = url;
    try {
      const res = await safeFetch(url, { signal: controller.signal, headers: { 'User-Agent': UA } });
      if (!res.ok) return Response.json({ ok: false, error: `Their website returned an error (${res.status}).` });
      html = await res.text();
      finalUrl = res.url || url;
    } catch (e) {
      return Response.json({ ok: false, error: e.name === 'AbortError' ? 'Their website took too long to load.' : "Their website didn't load." });
    } finally {
      clearTimeout(timer);
    }
    if (looksParked(html)) return Response.json({ ok: false, error: "Their website isn't active." });

    const title = htmlToText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')).slice(0, 200);
    const meta = htmlToText(html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || '');
    const links = [...html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
      href: m[1],
      text: htmlToText(m[2]).slice(0, 80),
    }));
    const cta_links = [...new Set(links.filter((l) => l.text && CTA_WORDS.test(l.text)).map((l) => l.text))].slice(0, 15);
    const social = socialLinks(html);
    const social_links = [social.instagram, social.facebook].filter(Boolean);
    const uses_meta_pixel = /fbq\(|connect\.facebook\.net\/[^"']*fbevents/i.test(html);
    let text = htmlToText(html).slice(0, 9000);

    // Meta Ads Builder "Fill it in for me": also read up to 2 services or pricing pages on the same site.
    if (follow) {
      const base = new URL(finalUrl);
      const PAGE_WORDS = /(service|treatment|menu|pricing|prices|price list|specials|offers|packages|what we do|procedures)/i;
      const seen = new Set([base.pathname]);
      const pages = [];
      for (const l of links) {
        if (pages.length >= 2) break;
        if (!PAGE_WORDS.test(`${l.text} ${l.href}`)) continue;
        let u;
        try {
          u = new URL(l.href, base);
        } catch {
          continue;
        }
        if (u.host !== base.host || seen.has(u.pathname) || /\.(pdf|jpg|png|zip)$/i.test(u.pathname)) continue;
        seen.add(u.pathname);
        pages.push(u.toString());
      }
      for (const page of pages) {
        const c2 = new AbortController();
        const t2 = setTimeout(() => c2.abort(), 6000);
        try {
          const r2 = await safeFetch(page, { signal: c2.signal, headers: { 'User-Agent': UA } });
          if (r2.ok) text += `\n\n[PAGE: ${page}]\n` + htmlToText(await r2.text()).slice(0, 5000);
        } catch {
          /* skip a page that won't load */
        } finally {
          clearTimeout(t2);
        }
      }
    }

    // Brand colors: the theme color plus the most-used non-neutral hex colors in the page's styles.
    const theme = html.match(/<meta[^>]+name=["']theme-color["'][^>]*content=["'](#[0-9a-f]{3,6})["']/i)?.[1] || '';
    const counts: Record<string, number> = {};
    for (const m of html.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
      let h = m[1].toLowerCase();
      if (h.length === 3) h = h.split('').map((x) => x + x).join('');
      const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      if (spread < 24) continue; // skip black, white and grays
      counts['#' + h] = (counts['#' + h] || 0) + 1;
    }
    const colors = [...new Set([theme.toLowerCase(), ...Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([h]) => h)].filter(Boolean))].slice(0, 4);

    return Response.json({ ok: true, url: finalUrl, title, meta_description: meta, cta_links, social_links, uses_meta_pixel, colors, text });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
