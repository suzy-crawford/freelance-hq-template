var e=`// SheFreelances OS - Content Creator (contentEngine.js)
// Three screens: About the client > Strategy (1 AI call) > Content (1 AI call per 5 posts).
// Kept small on purpose: it's for the free community.

import { displayName } from "./adsCards";
import { VOICE } from "./copyVoice";
import { formatCaption } from "./adsEngine";

export const CONTENT_STAGES = [
  { id: "about", label: "About" },
  { id: "strategy", label: "Strategy" },
  { id: "content", label: "Content" },
];

export const LENGTHS = [
  { n: 5, label: "5 posts" },
  { n: 7, label: "1 week", sub: "7 posts" },
  { n: 14, label: "2 weeks", sub: "14 posts" },
];

export const FORMATS = [
  { id: "talking_head", label: "Talking head reel", short: "Talking head", text: "They talk to the camera. You get the script and what to film." },
  { id: "broll", label: "B-roll reel", short: "B-roll", text: "Clips with text on screen. You get the text and what each clip shows." },
  { id: "carousel", label: "Carousel", short: "Carousel", text: "Swipeable slides. You get the words and the look of each slide." },
];
export const formatLabel = (id) => FORMATS.find((f) => f.id === id)?.short || "Post";

export const CTAS = [
  { id: "keyword", label: "Comment a keyword", ask: "What's the keyword?", placeholder: "GLOW" },
  { id: "dm", label: "Send a DM", ask: "What should they DM?", placeholder: "Send me 'consult'" },
  { id: "book", label: "Book a call or visit", ask: "Where do they book?", placeholder: "Link in bio" },
  { id: "link", label: "Click the link in bio", ask: "What's at the link?", placeholder: "Free guide" },
  { id: "follow", label: "Just follow", ask: "", placeholder: "" },
];

export const BATCH = 5;

const s = { type: "string" };
const arr = { type: "array", items: s };
const clean = (t) => String(t || "").replace(/\\s*—\\s*/g, ", ").trim();

function ctaLine(p) {
  const c = CTAS.find((x) => x.id === p.cta_type) || CTAS[0];
  if (c.id === "follow") return "Follow the account";
  return \`\${c.label}\${p.cta_detail ? \`: \${p.cta_detail}\` : ""}\`;
}

function brief(p) {
  const nf = "Not provided";
  return \`THE CLIENT
- Business: \${displayName(p.business_name) || nf}\${p.location ? \` in \${p.location}\` : ""}
- What they do: \${p.business_description || nf}
- Services: \${(p.services || []).join(", ") || nf}
- What they sell or the offer to push: \${p.offer_text || nf}
- Who it's for: \${p.audience || nf}
- What followers should do: \${ctaLine(p)}
\${p.voice_samples ? \`- How the client writes (match this voice):\\n\${p.voice_samples}\` : ""}
\${p.audit_notes ? \`\\nWHAT THE FREELANCER FOUND WHEN THEY AUDITED THIS CLIENT'S SOCIAL MEDIA (real observations; build the plan on these)\\n\${p.audit_notes}\\n\` : ""}\`;
}

// The Client Finder's lead analysis, as plain notes the content plan can build on.
const plain = (t) => String(t || "").replace(/\\*\\*/g, "").replace(/\\s+/g, " ").trim();
export function auditNotesFrom(a) {
  if (!a) return "";
  const caught = Array.isArray(a.caught) ? a.caught : [];
  return [
    a.snapshot && \`What they do now: \${plain(a.snapshot)}\`,
    ...caught.map((c) => \`- \${plain(c)}\`),
    (a.opp_detail || a.opportunity) && \`The biggest opportunity: \${plain(a.opp_detail || a.opportunity)}\`,
    a.noticed && \`What I noticed: \${plain(a.noticed)}\`,
    a.why && \`Why it matters: \${plain(a.why)}\`,
  ]
    .filter(Boolean)
    .join("\\n");
}

const RULES = \`RULES
- Plain words their customers actually use. Specific to this business, never generic.
- Only use facts given above. Never invent results, numbers, reviews, credentials, prices or stories. If a real detail would help, write it as a short [placeholder in square brackets] for the freelancer to fill in.
- Don't invent details about the place either (a wall, a room, an event, a staff member, a ranking like "best in town"). Only mention what the facts above say is there.
- No health or medical claims about what a treatment, product or service does to the body (like "reduces inflammation", "detoxes", "burns fat") unless the facts above say it. Talk about how it feels, what it's for and why people choose it.
- No hype words, no clickbait the post can't pay off.
- No em dashes.\`;

// ---------------------------------------------------------------------------
// Strategy: positioning, 3 pillars, ~20 hooks, the calendar
// ---------------------------------------------------------------------------

export function buildStrategyCall(p, note = "") {
  const n = Number(p.length) || 5;
  const formats = (p.formats?.length ? p.formats : FORMATS.map((f) => f.id)).map((id) => \`\${id} (\${formatLabel(id)})\`).join(", ");
  return {
    prompt: \`You are a content strategist helping a beginner freelance social media manager plan organic Instagram content for a client.

\${brief(p)}
\${note || p.strategy ? \`
THIS IS A REDO. The freelancer didn't like the last plan.\${note ? \` What they want changed: \${note}\` : ""}\${p.strategy?.pillars?.length ? \`
Last pillars (make these clearly different unless told otherwise): \${p.strategy.pillars.map((x) => x.name).join(", ")}\` : ""}
\` : ""}
\${p.audit_notes ? "USE THE AUDIT: keep what's already working, fix the gaps it found, and make the biggest opportunity the heart of the plan. Don't repeat the audit back; turn it into posts.\\n\\n" : ""}RETURN
- positioning: one sentence. Who they help, the outcome, and what makes them different, using only the facts above.
- pillars: exactly 3 content pillars. name (2 to 4 words), about (one line: what the posts cover), leads_to_offer (one line: how this pillar leads people to the offer).
- hooks: 21 hooks, 7 per pillar. pillar (the pillar name) and line (the first sentence spoken or shown, under 15 words, in the customer's language). Mix types: curiosity, mistake, myth, how-to, result, relatable, question. Plain everyday words ("med spa", not "medical spa"). Don't start with "Ever wonder", "Did you know" or "Are you tired of". No slogans.
- calendar: exactly \${n} posts in posting order. For each: day (1 to \${n}), pillar (a pillar name), format (one of: \${formats}), goal (reach, trust or offer), hook (its opening line), idea (one line: what the post says), cta (the call to action for this post).
  Rotate pillars and formats so no two posts in a row share both. About 1 in 5 posts has goal "offer" and uses the client's call to action (\${ctaLine(p)}); the rest end with a soft call to action (save, share, follow) or the client's call to action when it fits.

\${RULES}\`,
    response_json_schema: {
      type: "object",
      properties: {
        positioning: s,
        pillars: { type: "array", items: { type: "object", properties: { name: s, about: s, leads_to_offer: s } } },
        hooks: { type: "array", items: { type: "object", properties: { pillar: s, line: s } } },
        calendar: {
          type: "array",
          items: { type: "object", properties: { day: { type: "number" }, pillar: s, format: s, goal: s, hook: s, idea: s, cta: s } },
        },
      },
      required: ["positioning", "pillars", "hooks", "calendar"],
    },
  };
}

export function finalizeStrategy(r, p) {
  const allowed = p.formats?.length ? p.formats : FORMATS.map((f) => f.id);
  const n = Number(p.length) || 5;
  const pillars = (r?.pillars || []).slice(0, 3).map((x) => ({ name: clean(x.name), about: clean(x.about), leads_to_offer: clean(x.leads_to_offer) }));
  const calendar = (r?.calendar || []).slice(0, n).map((x, i) => ({
    day: i + 1,
    pillar: clean(x.pillar),
    format: allowed.includes(x.format) ? x.format : allowed[i % allowed.length],
    goal: ["reach", "trust", "offer"].includes(x.goal) ? x.goal : "reach",
    hook: clean(x.hook),
    idea: clean(x.idea),
    cta: clean(x.cta),
  }));
  return {
    positioning: clean(r?.positioning),
    pillars,
    hooks: (r?.hooks || []).map((h) => ({ pillar: clean(h.pillar), line: clean(h.line) })).filter((h) => h.line),
    calendar,
  };
}

// How the posts should sound. Written from Suzy's notes on the first real output (Oct 14):
// "medical spa" instead of "med spa", slogan lines, brochure filler, stock CTAs.
const SOUND = \`HOW IT SHOULD SOUND
- Write the way the owner talks to a customer at the front desk, not the way a brochure reads. Use contractions.
- Use the short, everyday words customers use: "med spa", not "medical spa". "Botox", not "neuromodulator treatment". "Facial", not "skincare service".
- Every line has to say something specific: a real detail, a moment, a step, a thing you'd see, a thing a customer actually asks. If a line could be on any business's page, cut it or make it specific.
- Never write slogans or abstract claims. Banned: "makes a difference", "personalized care", "long-term results", "focused on", "elevate", "journey", "transform", "self-care day", "treat yourself", "you deserve", "look and feel your best", "we're passionate about", "game changer", "take the guesswork out".
- Hooks: plain and specific, the kind of thing a person would actually say out loud. Don't start with "Ever wonder", "Did you know" or "Are you tired of".
- B-roll text on screen: each line is a full, specific thought that moves a mini story or list forward, like a person texting a friend. No taglines.
- Calls to action: specific to that post. "Comment GLOW and I'll send you the price list" beats "Save this for later". Skip "save this for your next self-care day" style lines.
- Before you return, reread every line out loud. Rewrite any line that sounds like an ad, a slogan or a website.

EXAMPLES (the style, not the words to use)
- Weak hook: "Ever wonder what a medical spa facial really looks like?" Better: "Here's exactly what happens in your first facial with us, start to finish."
- Weak line: "Medical supervision makes a difference." Better: "A nurse checks your skin before anything touches it. That's why we'll sometimes say not today."
- Weak line: "Focused on long-term results, personalized care for your skin." Better: "We'd rather see you every 6 weeks for a year than fix one bad week."
- Weak CTA: "Save this for your next self-care day." Better: "Comment FACIAL and I'll send you what to do the week before."\`;

// ---------------------------------------------------------------------------
// Content: the posts, 5 at a time
// ---------------------------------------------------------------------------

const FORMAT_RULES = {
  talking_head: \`talking_head: hook (the first line they say), script (the full spoken script after the hook, 30 to 45 seconds, short lines one thought per line, ends with the call to action), visual (what to film: where they stand or sit, framing, and 2 or 3 cutaway shots to show while they talk), caption.\`,
  broll: \`broll: hook (the first text on screen), on_screen (4 to 6 short lines of text in order, one per clip, the last one is the call to action), visual (what each clip shows, numbered to match the lines, all things the client can film on a phone), caption.\`,
  carousel: \`carousel: hook (slide 1 text), slides (6 to 8 slides in order, slide 1 is the hook and the last slide is the call to action; each slide has text, the words on it, under 25 words, and visual, what the slide looks like: a photo to use or a simple design), caption.\`,
};

export function buildPostsCall(p, items) {
  const used = [...new Set(items.map((x) => x.format))];
  return {
    prompt: \`You are a social media copywriter writing organic Instagram posts for a client. The client is speaking to their own followers and customers.

\${brief(p)}

POSITIONING
\${p.strategy?.positioning || ""}

WRITE THESE \${items.length} POSTS
\${items
  .map((x) => \`Post \${x.day}: \${formatLabel(x.format)} (\${x.format}). Pillar: \${x.pillar}. Goal: \${x.goal}. Hook: \${x.hook}. Idea: \${x.idea}. Call to action: \${x.cta}.\`)
  .join("\\n")}

Use each post's hook as the starting point. If it breaks a rule below, improve it.

WHAT EACH FORMAT NEEDS
\${used.map((f) => \`- \${FORMAT_RULES[f]}\`).join("\\n")}
- caption for every post: 2 to 5 short paragraphs separated by a blank line, ending with the call to action. At most 2 emojis. 3 to 5 relevant hashtags on the last line.
Return one item per post in the same order, with day and format. Leave fields a format doesn't use empty.

VOICE
\${VOICE.text}
SPEAKER: the business owner or provider talking to their own followers, not a marketer talking to a business owner.

\${SOUND}

\${RULES}\`,
    response_json_schema: {
      type: "object",
      properties: {
        posts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              day: { type: "number" },
              format: s,
              hook: s,
              script: s,
              visual: s,
              on_screen: arr,
              slides: { type: "array", items: { type: "object", properties: { text: s, visual: s } } },
              caption: s,
            },
          },
        },
      },
      required: ["posts"],
    },
  };
}

export function finalizePosts(r, items) {
  const out = r?.posts || [];
  return items.map((x, i) => {
    const y = out.find((o) => Number(o.day) === x.day) || out[i] || {};
    return {
      day: x.day,
      format: x.format,
      hook: clean(y.hook || x.hook),
      script: clean(y.script),
      visual: clean(y.visual),
      on_screen: (y.on_screen || []).map(clean).filter(Boolean),
      slides: (y.slides || []).map((sl) => ({ text: clean(sl.text), visual: clean(sl.visual) })).filter((sl) => sl.text),
      caption: formatCaption(clean(y.caption)),
    };
  });
}

// The next batch of calendar posts that don't have content yet.
export function nextBatch(p) {
  const cal = p.strategy?.calendar || [];
  const done = new Set((p.posts || []).filter(Boolean).map((x) => x.day));
  return cal.filter((x) => !done.has(x.day)).slice(0, BATCH);
}

export function postText(p, post, item) {
  const lines = [\`DAY \${post.day}: \${formatLabel(post.format)}\${item?.pillar ? \` (\${item.pillar})\` : ""}\`, ""];
  if (post.format === "talking_head") lines.push(\`HOOK\\n\${post.hook}\`, "", \`SCRIPT\\n\${post.script}\`, "", \`WHAT TO FILM\\n\${post.visual}\`);
  if (post.format === "broll") lines.push(\`TEXT ON SCREEN\\n\${post.on_screen.map((t, i) => \`\${i + 1}. \${t}\`).join("\\n")}\`, "", \`WHAT THE CLIPS SHOW\\n\${post.visual}\`);
  if (post.format === "carousel") lines.push(\`SLIDES\\n\${post.slides.map((sl, i) => \`Slide \${i + 1}: \${sl.text}\\n(Visual: \${sl.visual})\`).join("\\n\\n")}\`);
  lines.push("", \`CAPTION\\n\${post.caption}\`);
  return lines.join("\\n");
}

// One piece, rewritten (Shorter, Punchier, Warmer, More urgent, or her own words).
export function buildContentRewriteCall(p, post, label, text, how) {
  return {
    prompt: \`You are a social media copywriter. Rewrite one piece of this client's Instagram post.

\${brief(p)}

THE POST: \${formatLabel(post.format)}. Hook: \${post.hook}

REWRITE THIS \${label.toUpperCase()}
\${text}

HOW
\${how}
Keep the same idea, facts and call to action. Keep it the right length for a \${label.toLowerCase()}.

\${SOUND}

\${RULES}

Return JSON: { "text": the new version only }.\`,
    response_json_schema: { type: "object", properties: { text: s }, required: ["text"] },
  };
}

export function finalizeContentRewrite(r, multiline) {
  const t = clean(r?.text);
  return multiline ? t : t.replace(/\\s*\\n+\\s*/g, " ");
}

// ---------------------------------------------------------------------------
// Redo one piece of the plan (each is one small AI call)
// ---------------------------------------------------------------------------

const ask = (note) => (note ? \`What the freelancer wants changed: \${note}\` : "Make it clearly different from the current one, and better.");

function planContext(p) {
  const st = p.strategy || {};
  return \`\${brief(p)}

POSITIONING
\${st.positioning || ""}

PILLARS
\${(st.pillars || []).map((x, i) => \`\${i + 1}. \${x.name}: \${x.about}\`).join("\\n")}\`;
}

// One pillar: a new pillar, 7 new hooks, and new hooks and ideas for its calendar days.
export function buildPillarRedoCall(p, index, note) {
  const st = p.strategy;
  const old = st.pillars[index];
  const days = st.calendar.filter((x) => x.pillar === old.name);
  return {
    prompt: \`You are a content strategist planning organic Instagram content for a client. Replace ONE content pillar.

\${planContext(p)}

REPLACE PILLAR \${index + 1}: \${old.name} (\${old.about})
\${ask(note)}
It must not overlap with the other pillars.

RETURN
- pillar: name (2 to 4 words), about (one line), leads_to_offer (one line).
- hooks: 7 hook lines for the new pillar, each under 15 words, plain everyday words, no "Ever wonder", "Did you know" or "Are you tired of", no slogans.
- days: for each of these calendar days, a new hook and idea that fit the new pillar, keeping the day's format and goal:
\${days.map((x) => \`  Day \${x.day}: \${x.format}, goal \${x.goal}\`).join("\\n") || "  (none)"}

\${RULES}\`,
    response_json_schema: {
      type: "object",
      properties: {
        pillar: { type: "object", properties: { name: s, about: s, leads_to_offer: s } },
        hooks: arr,
        days: { type: "array", items: { type: "object", properties: { day: { type: "number" }, hook: s, idea: s } } },
      },
      required: ["pillar", "hooks"],
    },
  };
}

export function applyPillarRedo(st, index, r) {
  const old = st.pillars[index];
  const pillar = { name: clean(r?.pillar?.name) || old.name, about: clean(r?.pillar?.about), leads_to_offer: clean(r?.pillar?.leads_to_offer) };
  const hooks = [...st.hooks.filter((h) => h.pillar !== old.name), ...(r?.hooks || []).map((l) => ({ pillar: pillar.name, line: clean(l) })).filter((h) => h.line)];
  const changed = [];
  const calendar = st.calendar.map((x) => {
    if (x.pillar !== old.name) return x;
    const d = (r?.days || []).find((y) => Number(y.day) === x.day);
    changed.push(x.day);
    return { ...x, pillar: pillar.name, hook: clean(d?.hook) || x.hook, idea: clean(d?.idea) || x.idea };
  });
  return { strategy: { ...st, pillars: st.pillars.map((x, i) => (i === index ? pillar : x)), hooks, calendar }, changed };
}

// One hook in the bank.
export function buildHookRedoCall(p, hook, note) {
  return {
    prompt: \`You are a content strategist. Write ONE new hook for this client's Instagram content.

\${planContext(p)}

PILLAR: \${hook.pillar}
CURRENT HOOK: \${hook.line}
\${ask(note)}
Under 15 words, the kind of thing a person would say out loud. Plain everyday words. No "Ever wonder", "Did you know" or "Are you tired of". No slogans.

\${RULES}

Return JSON: { "text": the new hook only }.\`,
    response_json_schema: { type: "object", properties: { text: s }, required: ["text"] },
  };
}

// One calendar day: a new hook and idea (and format, if she asks for a different one).
export function buildDayRedoCall(p, item, note) {
  const allowed = p.formats?.length ? p.formats : FORMATS.map((f) => f.id);
  return {
    prompt: \`You are a content strategist. Replace ONE post in this client's Instagram content calendar.

\${planContext(p)}

THE POST: Day \${item.day}. Pillar: \${item.pillar}. Format: \${item.format}. Goal: \${item.goal}. Hook: \${item.hook}. Idea: \${item.idea}.
\${ask(note)}
Keep the pillar and goal. Keep the format unless they asked for a different one (allowed: \${allowed.join(", ")}).

RETURN: format, hook (under 15 words, plain words, no "Ever wonder" or "Did you know", no slogans), idea (one line), cta.

\${RULES}\`,
    response_json_schema: { type: "object", properties: { format: s, hook: s, idea: s, cta: s }, required: ["hook", "idea"] },
  };
}

export function applyDayRedo(p, item, r) {
  const allowed = p.formats?.length ? p.formats : FORMATS.map((f) => f.id);
  return { ...item, format: allowed.includes(r?.format) ? r.format : item.format, hook: clean(r?.hook) || item.hook, idea: clean(r?.idea) || item.idea, cta: clean(r?.cta) || item.cta };
}

// The positioning line.
export function buildPositioningRedoCall(p, note) {
  return {
    prompt: \`You are a content strategist. Rewrite this client's one-line positioning statement.

\${planContext(p)}

\${ask(note)}
One sentence: who they help, the outcome, and what makes them different, using only the facts above. Plain words, no slogans.

\${RULES}

Return JSON: { "text": the new positioning only }.\`,
    response_json_schema: { type: "object", properties: { text: s }, required: ["text"] },
  };
}

// ---------------------------------------------------------------------------
// "Design this carousel": a prompt to paste into Claude
// ---------------------------------------------------------------------------

// B-roll: a plain shot list to send the client or film on a phone.
export function shotList(p, post) {
  const name = displayName(p.business_name) || "the business";
  const lines = (post.on_screen || []).map((t, i) => \`\${i + 1}. Text on screen: "\${t}"\`);
  return \`Shot list for \${name}: "\${post.hook}"

What to film: \${post.visual}

Film on a phone, vertical (9:16), in good light. 3 to 5 seconds per clip, steady hands, real moments at the business (no stock footage, no AI video). Film a few extra clips so there's choice.

\${lines.join("\\n")}\`;
}

export function carouselDesignPrompt(p, post, item) {
  const name = displayName(p.business_name) || "the business";
  return \`Design an Instagram carousel for \${name}\${p.location ? \` in \${p.location}\` : ""}.

Build it as one HTML page with \${post.slides.length} slides, each exactly 1080 x 1350 px (4:5), side by side or stacked, so I can screenshot or download each one. Add a button that downloads every slide as its own PNG if you can.

BRAND
- Colors: \${p.brand_colors || "pick 2 or 3 calm colors that suit this business"}
- Style: \${p.brand_style || "clean and simple, lots of space, easy to read on a phone"}
- If I upload their logo or a screenshot of their website, match it.

THE SLIDES (use this text exactly, word for word)
\${post.slides.map((sl, i) => \`Slide \${i + 1}\${i === 0 ? " (cover)" : i === post.slides.length - 1 ? " (call to action)" : ""}
Text: \${sl.text}
Look: \${sl.visual || "simple text slide"}\`).join("\\n\\n")}

DESIGN RULES
- Slide 1 has to stop the scroll: big, bold text, very few words, high contrast.
- One idea per slide. Text large enough to read on a phone without zooming.
- The same fonts, colors and layout on every slide so it looks like one set. Small slide numbers (1/\${post.slides.length}) and the handle or business name in a corner.
- Where a slide calls for a photo, leave a clearly marked photo area with a note saying what photo goes there. People are welcome in the design; just no fake names, reviews or results.
- Keep the text exactly as written. Don't add claims, prices, reviews or numbers.
- No em dashes.\${item?.pillar ? \`\\n\\nThis post is part of the "\${item.pillar}" content pillar.\` : ""}\`;
}

// ---------------------------------------------------------------------------
// The content doc: every post, laid out to read or show a client
// ---------------------------------------------------------------------------

const esc = (t) => String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const paras = (t) => esc(t).split(/\\n\\s*\\n/).map((x) => \`<p>\${x.replace(/\\n/g, "<br>")}</p>\`).join("");
const FORMAT_NAME = { talking_head: "Talking head reel", broll: "B-roll reel", carousel: "Carousel" };

export function contentDocHtml(p) {
  const cal = p.strategy?.calendar || [];
  const name = displayName(p.business_name) || "Content plan";
  const posts = (p.posts || []).slice().sort((a, b) => a.day - b.day);
  const body = posts
    .map((post) => {
      const item = cal.find((x) => x.day === post.day) || {};
      const parts = [\`<h2>Day \${post.day} · \${FORMAT_NAME[post.format] || "Post"}: "\${esc(post.hook || item.hook)}"</h2>\`];
      if (item.pillar) parts.push(\`<p><b>Pillar:</b> \${esc(item.pillar)}</p>\`);
      if (post.format === "talking_head") {
        parts.push(\`<p><b>What to film:</b> \${esc(post.visual)}</p>\`);
        parts.push(\`<p><b>Spoken hook:</b> "\${esc(post.hook)}"</p>\`);
        parts.push(\`<p><b>Script:</b></p>\${paras(post.script)}\`);
      }
      if (post.format === "broll") {
        parts.push(\`<p><b>What the clips show:</b> \${esc(post.visual)}</p>\`);
        parts.push(\`<p><b>Text on screen:</b></p><ol>\${post.on_screen.map((t) => \`<li>\${esc(t)}</li>\`).join("")}</ol>\`);
      }
      if (post.format === "carousel") {
        parts.push(\`<p><b>Slides:</b></p><ol>\${post.slides.map((sl) => \`<li>\${esc(sl.text)}\${sl.visual ? \`<br><i>Look: \${esc(sl.visual)}</i>\` : ""}</li>\`).join("")}</ol>\`);
      }
      parts.push(\`<p><b>Caption:</b></p>\${paras(post.caption)}\`);
      if (item.cta) parts.push(\`<p><b>CTA:</b> \${esc(item.cta)}</p>\`);
      return \`<section>\${parts.join("\\n")}</section>\`;
    })
    .join("\\n<hr>\\n");
  const st = p.strategy || {};
  const intro = [
    st.positioning ? \`<p><b>Positioning:</b> \${esc(st.positioning)}</p>\` : "",
    st.pillars?.length ? \`<p><b>Content pillars:</b> \${st.pillars.map((x) => esc(x.name)).join(" · ")}</p>\` : "",
  ].join("");
  return \`<h1>\${esc(name)}: content plan</h1>\${intro}<hr>\${body}\`;
}

// Plain text version for the clipboard fallback.
export function contentDocText(p) {
  const cal = p.strategy?.calendar || [];
  return [\`\${displayName(p.business_name) || "Content plan"}: content plan\`, p.strategy?.positioning ? \`Positioning: \${p.strategy.positioning}\` : "", ""]
    .concat((p.posts || []).slice().sort((a, b) => a.day - b.day).map((post) => postText(p, post, cal.find((x) => x.day === post.day))))
    .join("\\n\\n---\\n\\n");
}

// ---------------------------------------------------------------------------
// The strategy doc: positioning, pillars, hook bank, calendar
// ---------------------------------------------------------------------------

const GOAL_NAME = { reach: "Reach", trust: "Trust", offer: "Offer" };

export function strategyDocHtml(p) {
  const st = p.strategy || {};
  const name = displayName(p.business_name) || "Content strategy";
  const pillars = (st.pillars || [])
    .map((x, i) => \`<h3>\${i + 1}. \${esc(x.name)}</h3><p>\${esc(x.about)}</p><p><b>Leads to the offer:</b> \${esc(x.leads_to_offer)}</p>\`)
    .join("");
  const hooks = (st.pillars || [])
    .map((x) => \`<h3>\${esc(x.name)}</h3><ol>\${(st.hooks || []).filter((h) => h.pillar === x.name).map((h) => \`<li>\${esc(h.line)}</li>\`).join("")}</ol>\`)
    .join("");
  const rows = (st.calendar || [])
    .map((x) => \`<tr><td>Day \${x.day}</td><td>\${esc(FORMAT_NAME[x.format] || x.format)}</td><td>\${esc(x.pillar)}</td><td>\${esc(GOAL_NAME[x.goal] || x.goal)}</td><td>\${esc(x.hook)}</td><td>\${esc(x.idea)}</td><td>\${esc(x.cta)}</td></tr>\`)
    .join("");
  return \`<h1>\${esc(name)}: content strategy</h1>
\${p.offer_text || p.audience ? \`<p>\${p.offer_text ? \`<b>Offer:</b> \${esc(p.offer_text)}\` : ""}\${p.offer_text && p.audience ? "<br>" : ""}\${p.audience ? \`<b>For:</b> \${esc(p.audience)}\` : ""}</p>\` : ""}
<h2>Positioning</h2><p>\${esc(st.positioning)}</p>
<h2>Content pillars</h2>\${pillars}
<h2>Hook bank</h2>\${hooks}
<h2>Calendar</h2>
<table><thead><tr><th>Day</th><th>Format</th><th>Pillar</th><th>Goal</th><th>Hook</th><th>Idea</th><th>CTA</th></tr></thead><tbody>\${rows}</tbody></table>\`;
}

export function strategyDocText(p) {
  const st = p.strategy || {};
  return [
    \`\${displayName(p.business_name) || "Content strategy"}: content strategy\`,
    "",
    \`POSITIONING\\n\${st.positioning || ""}\`,
    "",
    \`CONTENT PILLARS\\n\${(st.pillars || []).map((x, i) => \`\${i + 1}. \${x.name}: \${x.about}\\n   Leads to the offer: \${x.leads_to_offer}\`).join("\\n")}\`,
    "",
    \`HOOK BANK\\n\${(st.pillars || []).map((x) => \`\${x.name}\\n\${(st.hooks || []).filter((h) => h.pillar === x.name).map((h) => \`- \${h.line}\`).join("\\n")}\`).join("\\n\\n")}\`,
    "",
    \`CALENDAR\\n\${(st.calendar || []).map((x) => \`Day \${x.day} · \${FORMAT_NAME[x.format] || x.format} · \${x.pillar} · \${GOAL_NAME[x.goal] || x.goal}\\n  Hook: \${x.hook}\\n  Idea: \${x.idea}\\n  CTA: \${x.cta}\`).join("\\n")}\`,
  ].join("\\n");
}

// ---------------------------------------------------------------------------
// Client-ready designed pages (open in a new tab, then Save as PDF)
// ---------------------------------------------------------------------------

// The client's first brand color, if it's dark enough to use for headings and accents.
function accentColor(p) {
  const hex = String(p.brand_colors || "").match(/#([0-9a-f]{6})\\b/gi) || [];
  for (const h of hex) {
    const n = parseInt(h.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (lum < 0.6) return h;
  }
  return "#9a4590";
}

function pageShell({ title, accent, body }) {
  return \`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>\${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--accent:\${accent};--ink:#1a2236;--muted:#5d6475;--line:#ebe6de;--paper:#fdfbf8;--soft:color-mix(in srgb,var(--accent) 9%,#fff)}
*{box-sizing:border-box}
body{margin:0;background:#efece7;color:var(--ink);font:15px/1.65 Inter,system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.bar{position:sticky;top:0;z-index:5;display:flex;justify-content:flex-end;gap:10px;padding:12px 20px;background:rgba(239,236,231,.92);backdrop-filter:blur(6px)}
.bar button{height:40px;padding:0 18px;border:0;border-radius:999px;background:var(--ink);color:#fff;font:600 14px Inter,sans-serif;cursor:pointer}
.page{max-width:820px;margin:8px auto 48px;background:var(--paper);border-radius:6px;box-shadow:0 30px 60px -40px rgba(26,34,54,.45);overflow:hidden}
.cover{padding:64px 64px 48px;background:linear-gradient(135deg,var(--soft),#fff 70%);border-bottom:1px solid var(--line)}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
h1{margin:14px 0 0;font:400 52px/1.02 Gloock,Georgia,serif;letter-spacing:-.015em}
.meta{margin-top:18px;color:var(--muted);font-size:14px}
.meta b{color:var(--ink);font-weight:600}
section{padding:44px 64px;border-bottom:1px solid var(--line);break-inside:avoid-page}
section:last-child{border-bottom:0}
.label{display:flex;align-items:center;gap:12px;margin-bottom:20px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.label:after{content:"";flex:1;height:1px;background:var(--line)}
.quote{margin:0;font:400 30px/1.3 Gloock,Georgia,serif;color:var(--ink)}
.quote:before{content:"";display:block;width:40px;height:3px;margin-bottom:18px;background:var(--accent);border-radius:2px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pillar{padding:22px;border:1px solid var(--line);border-radius:12px;background:#fff}
.num{display:inline-flex;width:28px;height:28px;border-radius:50%;align-items:center;justify-content:center;background:var(--accent);color:#fff;font:700 13px Inter,sans-serif}
.pillar h3{margin:14px 0 6px;font:400 21px/1.2 Gloock,Georgia,serif}
.pillar p{margin:0;color:var(--muted);font-size:14px}
.pillar .to{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);color:var(--ink);font-size:13.5px}
.pillar .to b{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.hooks h3{margin:0 0 10px;font:400 19px Gloock,Georgia,serif}
.hooks ol{margin:0;padding:0;list-style:none;counter-reset:h}
.hooks li{counter-increment:h;position:relative;padding:9px 0 9px 34px;border-top:1px solid var(--line);font-size:14.5px}
.hooks li:first-child{border-top:0}
.hooks li:before{content:counter(h);position:absolute;left:0;top:10px;width:22px;height:22px;border-radius:50%;background:var(--soft);color:var(--accent);font:700 11px/22px Inter,sans-serif;text-align:center}
.hooks + .hooks{margin-top:28px}
.day{display:grid;grid-template-columns:76px 1fr auto;gap:18px;padding:16px 0;border-top:1px solid var(--line);align-items:start}
.day:first-of-type{border-top:0}
.dnum{font:400 26px/1 Gloock,Georgia,serif;color:var(--accent)}
.dnum small{display:block;margin-top:4px;font:700 10.5px Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.dhook{font-weight:600;font-size:15.5px;line-height:1.4}
.didea{margin-top:4px;color:var(--muted);font-size:14px}
.dmeta{margin-top:8px;font-size:12.5px;color:var(--muted)}
.tag{display:inline-block;padding:3px 10px;border-radius:999px;background:var(--soft);color:var(--accent);font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.tag.offer{background:var(--accent);color:#fff}
.post h2{margin:0;font:400 26px/1.25 Gloock,Georgia,serif}
.post .sub{margin-top:8px;color:var(--muted);font-size:13.5px}
.block{margin-top:22px}
.block .k{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
.block p{margin:0 0 8px}
.film{padding:14px 16px;border-radius:10px;background:var(--soft);font-size:14px}
.lines{margin:0;padding-left:20px}
.lines li{margin:6px 0}
.slide{display:grid;grid-template-columns:34px 1fr;gap:12px;padding:12px 0;border-top:1px solid var(--line)}
.slide:first-child{border-top:0}
.slide .n{font:400 20px Gloock,Georgia,serif;color:var(--accent)}
.slide .look{margin-top:3px;color:var(--muted);font-size:13px}
.caption{padding:16px 18px;border:1px solid var(--line);border-radius:10px;background:#fff;font-size:14.5px}
.foot{padding:26px 64px;color:var(--muted);font-size:12.5px;display:flex;justify-content:space-between}
@media (max-width:700px){.cover,section,.foot{padding-left:24px;padding-right:24px}h1{font-size:38px}.quote{font-size:24px}.grid3{grid-template-columns:1fr}.day{grid-template-columns:56px 1fr}.day .tag{grid-column:2}}
@media print{body{background:#fff}.bar{display:none}.page{margin:0;max-width:none;box-shadow:none;border-radius:0}@page{margin:14mm}}
</style></head><body><div class="bar"><button onclick="window.print()">Save as PDF</button></div><div class="page">\${body}</div></body></html>\`;
}

function coverHtml(p, kind, by) {
  const name = displayName(p.business_name) || "Your business";
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return \`<header class="cover"><div class="eyebrow">\${kind}</div><h1>\${esc(name)}</h1>
<div class="meta">\${p.offer_text ? \`<b>Offer:</b> \${esc(p.offer_text)}<br>\` : ""}\${p.audience ? \`<b>For:</b> \${esc(p.audience)}<br>\` : ""}\${by ? \`Prepared by \${esc(by)} · \` : ""}\${date}</div></header>\`;
}

export function strategyDocPage(p, by = "") {
  const st = p.strategy || {};
  const pillars = (st.pillars || [])
    .map((x, i) => \`<div class="pillar"><span class="num">\${i + 1}</span><h3>\${esc(x.name)}</h3><p>\${esc(x.about)}</p><div class="to"><b>Leads to the offer</b>\${esc(x.leads_to_offer)}</div></div>\`)
    .join("");
  const hooks = (st.pillars || [])
    .map((x) => \`<div class="hooks"><h3>\${esc(x.name)}</h3><ol>\${(st.hooks || []).filter((h) => h.pillar === x.name).map((h) => \`<li>\${esc(h.line)}</li>\`).join("")}</ol></div>\`)
    .join("");
  const days = (st.calendar || [])
    .map(
      (x) => \`<div class="day"><div class="dnum">\${x.day}<small>Day</small></div><div><div class="dhook">\${esc(x.hook)}</div><div class="didea">\${esc(x.idea)}</div><div class="dmeta">\${esc(FORMAT_NAME[x.format] || x.format)} · \${esc(x.pillar)}\${x.cta ? \` · CTA: \${esc(x.cta)}\` : ""}</div></div><span class="tag\${x.goal === "offer" ? " offer" : ""}">\${esc(GOAL_NAME[x.goal] || x.goal)}</span></div>\`
    )
    .join("");
  const body = \`\${coverHtml(p, "Content strategy", by)}
<section><div class="label">Positioning</div><p class="quote">\${esc(st.positioning)}</p></section>
<section><div class="label">Content pillars</div><div class="grid3">\${pillars}</div></section>
<section><div class="label">Hook bank</div>\${hooks}</section>
<section><div class="label">The plan · \${(st.calendar || []).length} posts</div>\${days}</section>
<div class="foot"><span>\${esc(displayName(p.business_name) || "")} content strategy</span><span>\${by ? esc(by) : ""}</span></div>\`;
  return pageShell({ title: \`\${displayName(p.business_name) || "Content"} content strategy\`, accent: accentColor(p), body });
}

export function contentDocPage(p, by = "") {
  const cal = p.strategy?.calendar || [];
  const posts = (p.posts || []).slice().sort((a, b) => a.day - b.day);
  const lineParas = (t) => esc(t).split(/\\n\\s*\\n/).map((x) => \`<p>\${x.replace(/\\n/g, "<br>")}</p>\`).join("");
  const sections = posts
    .map((post) => {
      const item = cal.find((x) => x.day === post.day) || {};
      const blocks = [];
      if (post.format === "talking_head") {
        blocks.push(\`<div class="block"><div class="k">What to film</div><div class="film">\${esc(post.visual)}</div></div>\`);
        blocks.push(\`<div class="block"><div class="k">Hook</div><p><b>\${esc(post.hook)}</b></p></div>\`);
        blocks.push(\`<div class="block"><div class="k">Script</div>\${lineParas(post.script)}</div>\`);
      }
      if (post.format === "broll") {
        blocks.push(\`<div class="block"><div class="k">What the clips show</div><div class="film">\${esc(post.visual)}</div></div>\`);
        blocks.push(\`<div class="block"><div class="k">Text on screen</div><ol class="lines">\${post.on_screen.map((t) => \`<li>\${esc(t)}</li>\`).join("")}</ol></div>\`);
      }
      if (post.format === "carousel") {
        blocks.push(\`<div class="block"><div class="k">Slides</div>\${post.slides.map((sl, i) => \`<div class="slide"><span class="n">\${i + 1}</span><div><div>\${esc(sl.text)}</div>\${sl.visual ? \`<div class="look">\${esc(sl.visual)}</div>\` : ""}</div></div>\`).join("")}</div>\`);
      }
      blocks.push(\`<div class="block"><div class="k">Caption</div><div class="caption">\${lineParas(post.caption)}</div></div>\`);
      return \`<section class="post"><div class="eyebrow">Day \${post.day} · \${esc(FORMAT_NAME[post.format] || "Post")}</div><h2>\${esc(post.hook || item.hook)}</h2><div class="sub">\${esc(item.pillar || "")}\${item.cta ? \` · CTA: \${esc(item.cta)}\` : ""}</div>\${blocks.join("")}</section>\`;
    })
    .join("");
  const body = \`\${coverHtml(p, "Content plan", by)}
\${p.strategy?.positioning ? \`<section><div class="label">Positioning</div><p class="quote">\${esc(p.strategy.positioning)}</p></section>\` : ""}
\${sections}
<div class="foot"><span>\${esc(displayName(p.business_name) || "")} content plan</span><span>\${by ? esc(by) : ""}</span></div>\`;
  return pageShell({ title: \`\${displayName(p.business_name) || "Content"} content plan\`, accent: accentColor(p), body });
}
`;export{e as default};