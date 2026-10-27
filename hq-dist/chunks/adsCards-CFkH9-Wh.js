var e=`// SheFreelances OS - Ads Manager: turn the plan into finished ads (adsCards.js)
// Each angle becomes one ad: hook + body + offer + next step, one headline, one description.
// The member's picks and edits live in campaign.ad_choices[angleIndex].

// The practice business is saved as "Glow Aesthetics (practice)"; the app shows a Practice tag instead.
export function displayName(name) {
  return String(name || "").replace(/\\s*\\(practice\\)\\s*$/i, "");
}

export function isLegacyRecord(record) {
  return !!record && !record.angles?.[0]?.hooks;
}

export function joinPrimary(parts) {
  return parts.filter((p) => p && String(p).trim()).join("\\n\\n");
}

// Headlines are { structure, text } (older campaigns saved plain strings).
export function headlineText(h) {
  return typeof h === "string" ? h : h?.text || "";
}

export function getAds(campaign) {
  const r = campaign.record;
  if (!r) return [];
  if (isLegacyRecord(r)) {
    return (r.ads?.primary_texts || []).map((p, i) => ({
      index: i,
      name: p.angle,
      why: r.angles?.[i]?.why || "",
      parts: [{ part: "body", text: p.text }],
      primary: p.text,
      headline: r.ads.headlines?.[i] || r.ads.headlines?.[0] || "",
      description: r.ads.descriptions?.[0] || "",
      cta: r.ads.cta,
      image: { visual: r.ads.static_concepts?.[i]?.visual || "", overlay: r.ads.static_concepts?.[i]?.overlay || "", prompt: r.ads.image_prompts?.[i] || "" },
      video: r.ads.video_concepts?.[i] || null,
      angle: null,
      choice: {},
      edited: false,
    }));
  }
  const choices = campaign.ad_choices || {};
  const fill = (t) => fillBlanks(t, campaign.blank_values);
  return r.angles.map((a, i) => {
    const c = choices[i] || {};
    const edits = c.edits || {};
    const hi = c.hook ?? 0;
    const bi = c.body ?? 0;
    const hdi = c.headline ?? 0;
    // Line-by-line edits are kept per option, so the structure and the other options stay.
    const hooks = a.hooks.map((h, k) => ({ ...h, text: fill(edits[\`hook_\${k}\`] ?? h.text) }));
    const bodies = a.bodies.map((b, k) => ({ ...b, text: fill(edits[\`body_\${k}\`] ?? b.text) }));
    const headlines = a.headlines.map((h, k) => ({ structure: h?.structure || "", text: fill(edits[\`headline_\${k}\`] ?? headlineText(h)) }));
    const hook = hooks[hi] || hooks[0];
    const body = bodies[bi] || bodies[0];
    const parts = [
      { part: "hook", key: \`hook_\${hi}\`, type: hook?.type, text: hook?.text },
      { part: "body", key: \`body_\${bi}\`, type: body?.type, text: body?.text },
      { part: "offer", key: "offer", text: fill(edits.offer ?? a.offer_line) },
      { part: "trust", key: "trust", text: fill(edits.trust ?? a.trust_line) },
      { part: "next", key: "next", text: fill(edits.next ?? a.next_step) },
    ].filter((p) => p.text);
    const assembled = joinPrimary(parts.map((p) => p.text));
    return {
      index: i,
      name: a.name,
      why: a.why,
      parts,
      primary: c.text ? fill(c.text) : assembled,
      edited: !!c.text,
      headline: (headlines[hdi] || headlines[0])?.text || "",
      headlineKey: \`headline_\${hdi}\`,
      hooks,
      bodies,
      headlines,
      description: fill(edits.description ?? a.description),
      cta: r.cta,
      image: { ...a.image, overlay: fill(a.image?.overlay) },
      format: a.format || "",
      category: a.category || "",
      video: a.video?.script ? a.video : null,
      angle: a,
      choice: c,
    };
  });
}

// Blank values the member filled in apply everywhere that blank appears, in every ad.
export function fillBlanks(text, values) {
  if (!text || !values) return text;
  return String(text).replace(BLANK_RE, (m) => {
    const v = values[m.toLowerCase()];
    return v && String(v).trim() ? v : m;
  });
}

export function listBlanks(ad) {
  const all = [ad.primary, ad.headline, ad.description, ad.image?.overlay].join(" ").match(BLANK_RE) || [];
  return [...new Set(all.map((b) => b.toLowerCase()))];
}

// Facts only the client knows are written as [blanks] for the freelancer to fill in.
export const BLANK_RE = /\\[[^\\]\\n]{1,40}\\]/g;

export function countBlanks(ad) {
  return listBlanks(ad).length;
}

export function adToText(ad) {
  return [\`AD \${ad.index + 1}: \${ad.name}\`, "", "Primary text:", ad.primary, "", \`Headline: \${ad.headline}\`, \`Description: \${ad.description}\`, \`Button: \${ad.cta}\`].join("\\n");
}
`;export{e as default};