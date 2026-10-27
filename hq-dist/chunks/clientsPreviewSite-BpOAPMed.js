var e=`// SheFreelances OS - "Build a preview site" (clientsPreviewSite.js)
// A copy-paste prompt the member pastes into a new Base44 app. Base44 builds the business a new
// website from its real details, and the member sends them the link as outreach.

const nf = (v) => String(v || "").trim();

export function previewSitePrompt(p) {
  const lines = [
    ["Business name", p.name],
    ["Type of business", p.business_type],
    ["City", p.location],
    ["Address", p.address],
    ["Phone", p.phone],
    ["Email", p.email],
    ["Current website", p.website],
    ["Instagram", p.instagram],
    ["Facebook", p.facebook],
  ].filter(([, v]) => nf(v));
  const listing = nf(p.preview_source);
  return \`Build a beautiful, high-converting one-page website for this local business. It's a preview I'm making to show the owner what their website could look like.

THE BUSINESS
\${lines.map(([k, v]) => \`- \${k}: \${nf(v)}\`).join("\\n")}
\${listing ? \`\\nTHEIR GOOGLE BUSINESS LISTING (use the real details, services, hours and reviews from here)\\n\${listing}\\n\` : ""}
WHAT THE PAGE NEEDS (in this order)
1. A clean top bar: the business name as the logo, a few links, the phone number and one main button (Book, Request a visit, Call, or Get a quote, whichever fits this business).
2. A hero: a short, specific headline about what they do and for whom, one sentence under it, the main button and a call button. If the listing shows a star rating and review count, show them under the buttons exactly as written.
3. Their services as a simple grid, each with a one-line plain-English description.
4. About the business: who they are and why people choose them, using only what's in the details above.
5. Reviews: 3 to 6 real reviews, word for word, with the reviewer's first name. Only use reviews from the listing. If there are none, leave this section out.
6. Visit us: address, hours, phone and a map embed for the address.
7. A short FAQ (4 to 5 questions a new customer would actually ask) with honest, general answers.
8. A final call to action and a simple footer.
9. On phones, a sticky "Call" button at the bottom.

DESIGN
- Premium and modern for this kind of business, with lots of space and an elegant serif for headings paired with a clean sans for text.
- Pick a calm color palette that suits the business. If their current website has clear brand colors, use those.
- Use real-looking photos with people in them (AI-generated models are fine): customers enjoying the service, the team at work, plus the place and the work. Never write fake names on people or put invented quotes or results next to them.
- Fully responsive. It has to look great on a phone first.

RULES
- Only use facts from the details above. Never invent prices, awards, years in business, credentials, guarantees or numbers.
- Never invent or reword reviews.
- Don't stretch the facts. Never claim who does which service, how visits work, what's included or how many people work there, unless it's written above.
- Write like a friendly local business talking to a neighbor. No hype, no clichés, no em dashes.
- Add a small, tasteful line in the footer: "Website preview made for \${nf(p.name) || "this business"}."
- Make it one page, open to anyone with the link (no login). I'll press Publish myself.\`;
}

export const PREVIEW_CHECKS = [
  "The name, phone, address and hours are right",
  "Every review is real and word for word",
  "No made-up prices, awards or numbers",
  "No fake names or reviews next to the people in photos",
  "It looks good on your phone",
];
`;export{e as default};