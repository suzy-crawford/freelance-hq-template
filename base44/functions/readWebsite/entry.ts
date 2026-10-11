import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Get Clients: reads a business website so the Analyze step can describe what is really there.
// No AI here. It returns the page text and a few useful signals.

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
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

    const { url } = await req.json();
    if (!url) return Response.json({ ok: false, error: 'No website on file.' });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    let html = '';
    let finalUrl = url;
    try {
      const res = await fetch(url, { redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': UA } });
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
    const text = htmlToText(html).slice(0, 9000);

    return Response.json({ ok: true, url: finalUrl, title, meta_description: meta, cta_links, social_links, uses_meta_pixel, text });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
