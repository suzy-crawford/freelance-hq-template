var e=`// SheFreelances OS - AI Builds to get clients (clientsBuilds.js)
// Module 1 of the Build Vault, wired into the Client Finder lead page. Each build is a copy-paste
// prompt filled with the lead's real details; the member pastes it into a new Base44 app, which
// builds it, she presses Publish and sends the link as outreach. Nothing here spends credits in this app.

import { previewSitePrompt } from "./clientsPreviewSite";
import { getIndustry, guessIndustry } from "./buildsExtras";
import { getNiche, cplText, cplSourceText, radiusText, startingAngles } from "./adsNiches";

const nf = (v) => String(v || "").trim();

function businessBlock(p) {
  const lines = [
    ["Business name", p.name],
    ["Type of business", p.business_type],
    ["City", p.location],
    ["Address", p.address],
    ["Phone", p.phone],
    ["Email", p.email],
    ["Website", p.website],
    ["Instagram", p.instagram],
    ["Facebook", p.facebook],
  ].filter(([, v]) => nf(v));
  const listing = nf(p.preview_source);
  return \`THE BUSINESS
\${lines.map(([k, v]) => \`- \${k}: \${nf(v)}\`).join("\\n")}\${listing ? \`\\n\\nTHEIR GOOGLE BUSINESS LISTING (real details, services, hours and reviews)\\n\${listing}\` : ""}\`;
}

// What the member found in her AI Lead Analyzer: the only source of "findings".
function findingsBlock(p) {
  const a = p.analysis?.source === "claude" ? p.analysis : null;
  if (!a?.full_text) return "";
  return \`\\n\\nWHAT I FOUND WHEN I REVIEWED THEIR MARKETING (my notes; these are the ONLY findings you may state as facts)\\n\${nf(a.full_text).slice(0, 7000)}\`;
}

function fromBlock(me, { service = true } = {}) {
  const lines = [
    ["Name", me.name],
    ["What I do", service && me.service],
    ["Email", me.email],
  ].filter(([, v]) => nf(v));
  return lines.length ? \`\\n\\nFROM (the freelancer sending this)\\n\${lines.map(([k, v]) => \`- \${k}: \${nf(v)}\`).join("\\n")}\` : "";
}

// "Med spa" reads as "med spa" mid-sentence; acronyms like "HVAC" stay as typed.
const typeInSentence = (p) => {
  const t = nf(p.business_type);
  return /^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t;
};

// Buttons that reach the freelancer: a plain email link, so nothing needs setting up.
const contactMe = (me) => (nf(me.email) ? \`opens an email to me at \${nf(me.email)} (a simple email link, no email setup needed)\` : "opens an email to me (a simple email link I can fill in later)");

// Owner-facing builds (decks, calculator) can raise questions; customer-facing pages can't.
function rules(audience = "owner") {
  const forOwner = audience === "owner";
  return \`RULES (these matter more than anything else)
- Only state facts that are in the details above. Never invent prices, awards, years in business, credentials, follower counts, results or numbers.
- Never invent or reword reviews.
\${forOwner ? \`- If something would be worth checking but isn't in my notes, write it as a question to ask them ("Worth a look: are new patients able to book online?"), never as a fact.\` : \`- This is for their customers. If something isn't in the details above, leave it out or use a clearly labeled placeholder the owner can fill in. No notes or questions for the owner on the page.\`}
- Use real-looking photos with people in them (AI-generated models are fine) so it feels alive and human: customers enjoying the service, the team at work, the place. Never present them as real named customers, real reviews or real results: no fake names on people, no invented testimonials, and no before-and-after shown as a real client's result.
- Don't stretch the facts. Never claim who does which treatment or job, how visits or appointments work, what's included, or what competitors or the local market are doing, unless it's written above.
- Write like a friendly expert\${forOwner ? " talking to the owner" : ""}. Plain words, no hype. No em dashes anywhere, not even as placeholders for missing numbers.
- Make the public pages open to anyone with the link, no login needed. I'll press Publish myself.\`;
}
const TRUTH = rules("owner");
const TRUTH_CUSTOMERS = rules("customers");

const ADS_DECK_DESIGN = \`DESIGN (make it look like it came from a top performance-marketing agency, not a generic template)
- Bold and editorial: a dark, high-contrast cover with huge type, then slides that mix light and dark sections. Big confident headlines, one accent color pulled from their brand, generous space.
- It should scream "ads expert": real-looking phone mockups of the ads in the Instagram feed, Stories and Reels; a funnel diagram (Ad, then lead form or landing page, then a text within 5 minutes, then booked); a simple campaign structure diagram (1 campaign, the audience, 3 ads); big number cards for the budget, ad area and cost per lead; a 30-day timeline; and a mockup of the weekly report they'd get, tagged "Sample report", with the benchmark ranges instead of made-up results.
- Lifestyle photos with people throughout (AI-generated models are fine), plus the place and the work. No fake names, reviews or results on them.
- Smooth slide transitions, one slide per screen, arrow keys and swipe, slide numbers, and it reads well on a phone.\`;

const DECK_DESIGN = \`DESIGN
- A beautiful, premium presentation that works as a shareable web page: one slide per screen, arrow keys and swipe to move, slide numbers, and it reads well on a phone.
- Elegant serif headings with a clean sans for text, lots of space, a calm palette that suits the business (use their brand colors if their website has clear ones).\`;

function auditPrompt(p, me) {
  return \`Create a beautiful, client-ready marketing audit presentation for this business. I'm a freelance marketer and I'll send it to the owner to start a conversation.

\${businessBlock(p)}\${findingsBlock(p)}\${fromBlock(me)}

THE SLIDES (10 to 12)
1. Cover: "\${nf(p.name)}: marketing review", prepared by \${me.name || "me"}, with today's date.
2. At a glance: what they do, where, and their real rating and review count if the listing shows them.
3. What's already working: 2 or 3 genuine strengths, from my notes or their listing.
4 to 6. Three opportunities, one per slide. For each: what I noticed, why it matters for getting more customers, and what better looks like. Use only my notes. If I gave you fewer than three findings, fill the rest with clearly labeled questions worth checking.
7. A simple table: area, today, recommended.
8. What the first 30 days could look like (3 or 4 plain steps), tied to \${me.service || "the service I offer"}.
9. A next step slide: "Want to talk it through?" with a button that \${contactMe(me)}.
\${findingsBlock(p) ? "" : "\\nI haven't added my own review notes, so keep every opportunity as a question to explore, not a finding.\\n"}
\${DECK_DESIGN}

\${TRUTH}
- Add a small line on the last slide: "Prepared for \${nf(p.name) || "this business"}. Based on public information."\`;
}

// The Meta ads pitch: niche benchmarks from the Ads Builder playbook, so every number has a source.
function adPlanPrompt(p, me) {
  const niche = getNiche({ business_name: p.name, business_description: \`\${nf(p.business_type)} \${nf(p.preview_source).slice(0, 600)}\` });
  const a = p.analysis?.source === "claude" ? p.analysis : null;
  const idea = nf(a?.idea_detail) || nf(a?.idea);
  const angles = startingAngles(niche, 3);
  const bench = niche.budget
    ? \`INDUSTRY BENCHMARKS FOR \${niche.label.toUpperCase()} (use these numbers exactly, and label them as typical for the industry, never as a promise)
- Suggested starting budget: $\${niche.budget[0]} to $\${niche.budget[1]} a day, paid by the business straight to Meta (about $\${(niche.budget[0] * 30).toLocaleString("en-US")} to $\${(niche.budget[1] * 30).toLocaleString("en-US")} a month)
- Ad area: \${radiusText(niche)} around the business
- Typical cost per lead: \${cplText(niche) || "not available, so leave cost per lead out"}\${cplSourceText(niche) ? \` (source: \${cplSourceText(niche)})\` : ""}\${niche.cta ? \`\\n- Button that usually works: \${niche.cta}\` : ""}\${niche.formats ? \`\\n- Formats that work: \${niche.formats}\` : ""}\${niche.form_fields ? \`\\n- Lead form fields: \${niche.form_fields}\` : ""}\`
    : \`BUDGET
I don't have industry benchmarks for this kind of business. Suggest starting with $20 a day as a two-week test, paid by the business straight to Meta, and leave cost per lead out.\`;
  const angleList = angles.length
    ? \`THE THREE AD ANGLES TO SHOW (in this order). The example lines show the style only: never use their prices or claims, write new lines from the details above. Where an angle needs the client's own photos or video (like before-and-afters), show a polished sample tagged \\"Sample creative, use the client's real photos\\".\\n\${angles.map((x, i) => \`\${i + 1}. \${x.name}: \${x.concept} Creative: \${x.creative} Example line: "\${x.example}" Why it works: \${x.why}\${x.caution ? \` Careful: \${x.caution}\` : ""}\`).join("\\n")}\`
    : \`THE THREE AD ANGLES
Pick three different angles that fit this business: a first-visit or first-job offer, social proof from their real reviews, and showing the work or the place.\`;
  return \`Create a beautiful, client-ready Meta ads proposal presentation for this business. I'm a freelance marketer and I'll send it to the owner to show them the Facebook and Instagram ad plan I'd run for them.

\${businessBlock(p)}\${findingsBlock(p)}\${fromBlock(me)}

\${bench}

\${angleList}

THE SLIDES (11 to 13)
1. Cover: "\${nf(p.name)}: Facebook and Instagram ads plan", prepared by \${me.name || "me"}, with today's date.
2. Where they are today: what they do, where, and their real rating and review count if the listing shows them. Only say whether they run ads now if my notes say so; otherwise ask it as a question.
3. The goal: one clear goal for the ads (for example more booked consultations or more quote requests), in one sentence.
4. The offer to lead with: \${idea ? \`build it around this idea from my review: \${idea}.\` : "a simple first-visit or first-job offer built on their most popular service."} Show it as a suggestion to confirm together. Use their real price if it's in the details above; otherwise show a realistic example price for this kind of business with a small "Example price" tag.
5. Who we'd reach: their city and the ad area above, and the kind of customer, in plain words.
6 to 8. Three sample ads, one per slide, using the three angles above. Show each one as a realistic Facebook or Instagram ad mockup: page name and "Sponsored", primary text, a scroll-stopping image or video frame with people in it (AI-generated models are fine), headline and button. Show them inside real-looking phone screens (Instagram feed, Stories and Reels placements). For a results angle, show a polished sample "after" photo tagged "Sample creative, use the client's real photos". Next to it: the angle name and why it works for this business. Tag each "Sample ad".
9. Where the clicks go: a short lead form inside Facebook and Instagram (with the fields above), or a landing page built for this offer. Recommend one and say why.
10. Budget and what to expect: the starting budget and ad area above, and the typical cost per lead with its source, written as "typical for \${niche.label ? niche.label.toLowerCase() : "this kind of business"}, not a promise". Say clearly the ad budget is paid to Meta by the business.
11. The first 30 days: week 1 set up tracking, the lead form and the ads, all reviewed and approved before anything goes live; week 2 launch and learn; week 3 keep what works and cut what doesn't; week 4 a simple report and the plan for month 2.
12. How leads get followed up: reply to every new lead within 5 minutes, with a simple text and call routine.
13. Next step: "Want to get this running?" with a button that \${contactMe(me)}.
\${findingsBlock(p) ? "" : "\\nI haven't added my own review notes, so keep anything about their current marketing as a question to explore, not a finding.\\n"}
\${ADS_DECK_DESIGN}

\${TRUTH}
- Never promise results, leads, sales or a return. Only use the benchmark numbers above, labeled as typical for the industry.\${niche.compliance ? \`\\n- Ad rules for this industry: \${niche.compliance}\` : ""}
- Add a small line on the last slide: "Prepared for \${nf(p.name) || "this business"}. Based on public information and industry benchmarks."\`;
}

function instagramPrompt(p, me) {
  return \`Create a visual Instagram makeover presentation for this business, to show the owner what their Instagram could look like if I managed it. I'm a freelance marketer and managing their Instagram is something I'd offer.

\${businessBlock(p)}\${findingsBlock(p)}\${fromBlock(me, { service: false })}

THE SLIDES (8 to 10)
1. Cover: "\${nf(p.name)}: Instagram makeover", prepared by \${me.name || "me"}.
2. Where it stands today: only what's in the details above. If I didn't give you their current bio or numbers, show it as "Current profile" with the handle and leave the numbers out.
3. The new bio: shown inside a realistic Instagram profile mockup. Under 150 characters, with what they do, who it's for, one proof point that's in the details (like the real Google rating) and one clear call to action. Show the character count.
4. Highlights: 5 story highlight covers with short labels (for example Book, Reviews, Services, Team, Visit).
5. Content pillars: 3 or 4 topics they should post about and why each brings in customers.
6. The first 9 posts: a 3 by 3 grid of designed post tiles. Each tile is a polished designed post with a short headline on it (carousel covers, tips, quotes from real reviews, behind the scenes, people enjoying the service), labeled with its format (Reel, Carousel or Post). People are welcome; just no fake names or fake results.
7. Three sample captions, written in full, for three of those posts. Only promise what the details above say.
8. A simple weekly rhythm (how many posts, which days, which formats).
9. Next step: "Want me to take this on?" with a button that \${contactMe(me)}.

\${DECK_DESIGN}
- Mark the grid and captions with a small "Sample content" tag.

\${TRUTH}\`;
}

function landingPrompt(p, me) {
  const a = p.analysis?.source === "claude" ? p.analysis : null;
  const offer = nf(a?.idea_detail) || nf(a?.offer_to_send);
  return \`Build a high-converting landing page for one offer from this business, to show the owner what a page built for ads or social could do. I'm a freelance marketer.

\${businessBlock(p)}\${findingsBlock(p)}\${fromBlock(me)}

THE OFFER
\${offer ? \`Build it around this idea from my review: \${offer}\` : "Pick the single service that looks most popular or most valuable from the details above, and build the page around a simple first-visit or free-consultation offer. Don't invent a discount or a price."}

THE PAGE (one page, in this order)
1. Hero: a specific headline about the result for the customer, one supporting line, one main button and a call button. Show the real star rating and review count under the buttons if the listing has them.
2. The problem they're dealing with, in the customer's words (3 short points).
3. Why people choose this business, using only the details and reviews above. Don't describe how their visits or jobs work unless it's written above.
4. How to get started: 3 simple steps (send the form, they get in touch, come in or get it done). Promise nothing beyond that.
5. Real reviews, word for word (3 at most). Leave this out if there are none.
6. FAQ: 4 honest questions a new customer would ask.
7. A short form (name, phone, email, one question) with a working thank-you message, and the button repeated.
8. On phones, a sticky button at the bottom.

Keep my notes and my name off the page. The footer line below is the only mention of me.

DESIGN
- Premium and modern for this kind of business, mobile first, one clear action everywhere.

\${TRUTH_CUSTOMERS}
- Add a small footer line: "Sample landing page made for \${nf(p.name) || "this business"}."\`;
}

function calculatorPrompt(p, me) {
  return \`Build an interactive revenue calculator for this business, branded for them, so the owner can see what better marketing could be worth. I'm a freelance marketer and I'll send them the link.

\${businessBlock(p)}\${fromBlock(me)}

WHAT IT DOES
- Inputs with sliders and number boxes: leads per month, booking rate (%), show rate (%), close rate (%), average customer value ($).
- Pre-fill sensible example numbers for this kind of business, clearly labeled "Example numbers. Change them to yours." Never present them as this business's real numbers.
- The math, shown step by step:
  Leads x booking rate = appointments
  Appointments x show rate = people who show up
  People who show up x close rate = new customers
  New customers x average customer value = monthly revenue
- A second column, "With better marketing", where each rate can be nudged up, and a clear comparison: extra customers and extra revenue per month and per year, with a simple bar chart.
- Everything updates live, and the math must be correct. Test it.
- Show people and customers as whole numbers (round each step), and work out each next line from the number shown, so every line checks out on a calculator. Money in whole dollars.
- A short line under the results: "This is an estimate to explore, not a promise of results."
- A button: "Want to talk about the numbers?" that \${contactMe(me)}.

DESIGN
- Clean, premium and branded for \${nf(p.name) || "the business"} (their colors if their website has clear ones), easy on a phone.

\${TRUTH}\`;
}

// ---------------------------------------------------------------------------
// Section 2: lead magnets the business can promote. Section 3: tools for their customers.
// These are built FOR the business to use, so they need a private page to see submissions.
// ---------------------------------------------------------------------------

function pricesBlock(p) {
  const prices = nf(p.price_notes);
  return prices
    ? \`\\n\\nTHEIR PRICES AND RULES (use these exactly)\\n\${prices}\`
    : \`\\n\\nPRICES\\nI don't have their prices yet. Use clearly marked example prices ("Example: $150 to $250") that are easy to change in one place, and add a note on the admin page listing every price the owner must confirm before this goes live.\`;
}

const LEADS = \`SAVING LEADS
- A short form on the results step: first name, email, phone (optional) and one consent checkbox ("It's OK to contact me about this").
- Save every submission with the answers, the result shown and the date.
- A private admin page (login required) listing submissions newest first, with their answers, a status (New, Contacted, Booked) and an export to CSV.\`;

const TOOL_DESIGN = \`DESIGN
- Premium, modern and branded for \${"\${name}"}, using their colors if their website has clear ones. Elegant serif headings, clean sans text, lots of space.
- One question per screen with a progress bar, big tap targets, and it must feel great on a phone (most people will open it from Instagram or an ad).
- Use real-looking photos with people (AI-generated models are fine) along with the place and the work, so it feels human. Never put fake names, quotes or results next to them.\`;

// The industry the member picked (or our best guess) decides which questions fit.
const industryOf = (p) => getIndustry(p.build_industry || guessIndustry(p));
const forWhom = (p) => industryOf(p).noun || typeInSentence(p) || "business like this";
const aForWhom = (p) => \`\${/^[aeiou]/i.test(forWhom(p)) ? "an" : "a"} \${forWhom(p)}\`;
const customersOf = (p) => (industryOf(p).noun || typeInSentence(p) ? \`\${aForWhom(p)}'s customers\` : "this business's customers");

const toolDesign = (p) => TOOL_DESIGN.replace("\${name}", nf(p.name) || "the business");

function estimatorPrompt(p, me) {
  return \`Build an interactive cost estimator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get a price range, then request an exact quote.

\${businessBlock(p)}\${pricesBlock(p)}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what their project or treatment could cost, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 simple questions that drive the price for \${aForWhom(p)}. Ask about \${industryOf(p).price}. Use picture cards where it helps.
3. The result: an estimated price range with a short breakdown and what affects the final price. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Request your exact quote" or "Book a consultation".

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Every price shown is an estimate range with the line "Final pricing confirmed after a consultation."\`;
}

function quizPrompt(p, me) {
  return \`Build an interactive "find the right service for you" quiz for this business that they can promote in ads and on social to capture leads.

\${businessBlock(p)}

THE EXPERIENCE
1. A short landing screen with an inviting headline ("Not sure where to start?"), what they'll get and a Start button.
2. 5 to 7 friendly questions written for \${customersOf(p)}, about \${industryOf(p).quiz}.
3. A personalized result: the 1 or 2 services from their real service list that fit best, why, what to expect and a photo-style card for each. Only recommend services that are in the details above.
4. Save the lead (below), then a clear next step: book a consultation or call.

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- For anything medical or health related, keep results general ("worth asking about at your consultation") and never say someone is or isn't a candidate.\`;
}

function assessmentPrompt(p, me) {
  return \`Build an interactive assessment (a short scorecard) for this business that they can promote in ads and on social to capture leads. Visitors answer questions, get a score with personalized recommendations, and are invited to book.

\${businessBlock(p)}

THE EXPERIENCE
1. A landing screen with a curiosity headline\${industryOf(p).score ? \` (for example "\${industryOf(p).score.headline}")\` : ""}: a question their customers would want answered about themselves, written for \${customersOf(p)}.
2. 8 to 10 quick questions across 3 or 4 categories\${industryOf(p).score ? \` (for example \${industryOf(p).score.categories})\` : ""}, each answer scoring points.
3. The result: an overall score out of 100, a score per category with a simple bar, the biggest area to work on and 3 practical recommendations. Make the scoring correct and test it.
4. Show the full results on screen, save the lead (below) with the results, and add a button to book a consultation. No automatic emails, so nothing extra needs setting up.

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Results are general guidance, not professional advice. Say so in one short line under the score.\`;
}

function quotePrompt(p, me) {
  return \`Build an instant quote tool this business can put on its website, so customers get a price in a minute instead of waiting for a call back.

\${businessBlock(p)}\${pricesBlock(p)}

THE EXPERIENCE
1. Pick the service.
2. Answer the questions that set the price for that service (for \${aForWhom(p)}: \${industryOf(p).price}), with picture cards where it helps.
3. Choose add-ons, each with its price.
4. See the quote update live: base price, add-ons, total, and what's included. Make the math correct and test it.
5. "Lock in this quote": name, email, phone, preferred date, then a clear confirmation that the business will confirm the details.

SAVING QUOTES
- Save every quote with the choices, the total and the contact details.
- A private admin page (login required) listing quotes newest first, with status (New, Confirmed, Booked, Lost) and an export to CSV.
- Keep every price in one settings area the owner can edit.

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}\`;
}

function menuPrompt(p, me) {
  return \`Build a beautiful digital service menu for this business, with a "help me choose" option, so customers can browse everything they offer and send an inquiry about the right service.

\${businessBlock(p)}\${pricesBlock(p)}

THE EXPERIENCE
1. The menu: services grouped into categories, each as a card with a short description, starting price and an "Ask about this" button. Show how long it takes only if it's in the details above. Tap a card for full details and what to expect.
2. "Help me choose": 4 or 5 quick questions that point to 1 or 2 services from the real list, with why.
3. An inquiry form that already knows which service they picked: name, email, phone, a question, preferred time.

SAVING INQUIRIES
- Save every inquiry with the service and the details.
- A private admin page (login required) listing inquiries newest first, with status (New, Replied, Booked) and an export to CSV.
- Services, descriptions and prices editable in one settings area.

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Only list services that are in the details above. If a price isn't known, show "Ask for pricing".\`;
}

function bookingPrompt(p, me) {
  return \`Build a booking request portal this business can put on its website and Instagram, so customers can pick a service and ask for a time without calling.

\${businessBlock(p)}\${pricesBlock(p)}

THE EXPERIENCE
1. Pick a service from their real service list, each with its price (and how long it takes, only if it's in the details above).
2. Pick a preferred date on a calendar, then a time of day (morning, afternoon or evening). Only offer days and hours they're open, from the details above.
3. Contact details: name, email, phone and an optional note.
4. A clear confirmation screen: "Request sent. \${nf(p.name) || "The business"} will confirm your time." with a summary of what they asked for. This is a request, not a confirmed appointment, so never say it's booked.

SAVING REQUESTS
- Save every request with the service, date, time of day and contact details.
- A private admin page (login required) listing requests by date, with status (New, Confirmed, Rescheduled, Cancelled), a simple calendar view and an export to CSV.
- Services, prices and opening hours editable in one settings area.

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}\`;
}

function rewardBlock(p) {
  const reward = nf(p.reward_notes);
  return reward
    ? \`\\n\\nTHEIR REFERRAL REWARD (use this exactly)\\n\${reward}\`
    : \`\\n\\nREFERRAL REWARD\\nI don't know their reward yet. Use a clearly marked example ("Example: $25 off your next visit for you and your friend") that the owner can change in one place, and remind them on the admin page to set it before sharing.\`;
}

function referralPrompt(p, me) {
  return \`Build a referral program app for this business, so happy customers can share a personal link and get rewarded when friends come in.

\${businessBlock(p)}\${rewardBlock(p)}

THE EXPERIENCE
1. A friendly page for existing customers: what the reward is, how it works in 3 steps, and a short sign-up (name, email, phone).
2. After signing up, each customer gets their own referral link and code, with buttons to copy it, text it and share it.
3. When a friend opens that link they land on a welcome page from \${nf(p.name) || "the business"} with the offer, and a short form (name, email, phone, what they're interested in). The referral is credited to the right customer automatically.
4. Customers can come back with their referral code to see how many friends they've referred and their reward status.

THE ADMIN SIDE (login required)
- Every referrer with their link, how many friends they sent and how many came in.
- Every referred friend, who sent them, and a status (New, Booked, Came in).
- Mark a reward as earned and then as given, so nobody is forgotten.
- The reward wording editable in one settings area, and an export to CSV.

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Never promise a reward the business hasn't set. Rewards are only earned after the friend comes in, unless the details above say otherwise.\`;
}

function packagePrompt(p, me) {
  return \`Build a package builder this business can put on its website, so customers can put together their own package, see the price as they go and send it in.

\${businessBlock(p)}\${pricesBlock(p)}

THE EXPERIENCE
1. Start from 2 or 3 ready-made packages built only from their real services and prices (for example a starter, a most popular and a complete option), or start from scratch.
2. Add or remove services and extras with simple toggles and number pickers. The total updates live with a clear line-by-line breakdown. Make the math correct and test it.
3. A summary of the finished package they can review, with "Send my package" asking for name, email, phone, preferred date and a note.
4. A confirmation that the business will review the package and get back to them.

SAVING PACKAGES
- Save every package with its items, total and contact details.
- A private admin page (login required) listing packages newest first, with status (New, Quoted, Booked, Lost) and an export to CSV.
- Every service, extra and price editable in one settings area, including the ready-made packages.

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Only use services and prices from the details above. Don't invent discounts or package savings unless they're written above.\`;
}

// The business's own rates, typical costs or rules. Without them, labeled example assumptions.
function numbersBlock(p, what) {
  const n = nf(p.price_notes);
  return n
    ? \`\\n\\nTHEIR NUMBERS (use these exactly)\\n\${n}\`
    : \`\\n\\nNUMBERS\\nI don't have their numbers yet (\${what}). Use sensible, clearly labeled example assumptions ("Example assumption: ...") kept in one settings area the owner can edit, show them on the page in a small "How this is worked out" note, and add a note on the admin page listing every number the owner must confirm before this goes live.\`;
}

const ESTIMATE_LINE = (kind) => \`- Under every result, one short line: "This is an estimate to help you plan, not \${kind}."\`;

function savingsPrompt(p, me) {
  return \`Build an interactive savings calculator for this business that they can promote in ads and on social to capture leads. Visitors enter what they pay today and see what they could save with this business's service.

\${businessBlock(p)}\${numbersBlock(p, "typical costs, rates and how much their service usually saves")}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they could save, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 4 to 6 simple questions that drive the savings for \${aForWhom(p)} (for example what they pay each month, home or space size, age of what they have now, and their zip code or area). Sliders and picture cards where it helps.
3. The result: estimated savings per month, per year and over 10 years, a simple bar chart of today vs with the service, and a short "How this is worked out" note showing the assumptions. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Get your exact savings" or "Book a free assessment".

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
\${ESTIMATE_LINE("a quote or a guarantee")}
- Never invent rebates, tax credits, incentives or savings percentages. Use only what's in their numbers above, or labeled example assumptions.\`;
}

function budgetPrompt(p, me) {
  return \`Build an interactive budget planner for this business that they can promote in ads and on social to capture leads. Visitors enter their total budget and see how to split it, then talk to the business about making it happen.

\${businessBlock(p)}\${numbersBlock(p, "their typical costs and how budgets usually split")}

THE EXPERIENCE
1. A short landing screen: a clear headline about planning their budget, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 3 to 5 questions that shape the plan for \${aForWhom(p)} (total budget, size or scope, priorities, timing).
3. The plan: the budget split into 5 to 8 categories with amounts and percentages, a simple chart, and sliders to move money between categories. The total always stays equal to their budget and the remaining amount updates live. Make the math correct and test it.
4. Mark which categories this business can help with (only services in the details above).
5. Save the lead (below) with their plan, then a clear next step: "Talk through your plan" or "Book a consultation".

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
\${ESTIMATE_LINE("a quote")}\`;
}

function affordabilityPrompt(p, me) {
  return \`Build an interactive affordability calculator for this business that they can promote in ads and on social to capture leads. Visitors find out what they can comfortably afford, then talk to the business about next steps.

\${businessBlock(p)}\${numbersBlock(p, "the interest rate, term, down payment and any costs to include")}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they can afford, what they'll get, and a Start button. Show the real rating if the listing has it.
2. Inputs with sliders and number boxes: yearly income, monthly debts, down payment, interest rate and loan term (rate and term pre-filled from their numbers or labeled examples, and editable).
3. The result: a comfortable price range and the estimated monthly payment, with a simple breakdown. Use the standard loan payment formula, keep total monthly debts within a sensible share of income, and show the assumptions in a "How this is worked out" note. Make the math correct and test it with easy numbers.
4. Save the lead (below), then a clear next step: "Talk through your options" with \${nf(p.name) || "the business"}.

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
\${ESTIMATE_LINE("financial advice or a pre-approval")}
- Never show a rate as their current rate unless it's in their numbers above. Label any example rate clearly.\`;
}

function checklistPrompt(p, me) {
  return \`Build an interactive checklist for this business that they can promote in ads and on social to capture leads. Visitors tick off what they've done, see what they're missing, and get help with the rest.

\${businessBlock(p)}

THE CHECKLIST
- Pick the checklist that fits \${aForWhom(p)}'s customers best (for example a business expense checklist for an accountant, a move-out checklist for a cleaner, a planning checklist for a wedding planner, a pre-listing checklist for a realtor). Use the title as the headline.
- 15 to 25 practical items in 3 to 5 groups, each with a one-line tip. Only general, widely true advice.

THE EXPERIENCE
1. A short landing screen: the checklist title, who it's for, what they'll get, and a Start button. Show the real rating if the listing has it.
2. The checklist: tap to tick items, a progress bar, and each group shows how many are done.
3. The result: what they've covered, the items they missed with their tips, and which ones \${nf(p.name) || "the business"} can help with (only services in the details above).
4. Save the lead (below), then show a clean printable version (a "Print or save as PDF" button) and a clear next step: "Get help with the rest".

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Keep tips general. Nothing that reads as legal, tax, medical or financial advice for their situation.\`;
}

function planPrompt(p, me) {
  return \`Build a personalized plan generator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get their own simple plan, then book with the business to go further.

\${businessBlock(p)}

THE PLAN
- Pick the plan that fits \${aForWhom(p)}'s customers best (for example a 4-week workout plan for a gym or trainer, a morning and evening routine for a skin care business, a 12-month lawn care calendar for a landscaper, a weekly cleaning schedule for a cleaner). Use it as the headline.
- Build the plan from fixed rules in the app (no AI calls), so it costs nothing each time someone uses it. Write the building blocks yourself, matched to each combination of answers.

THE EXPERIENCE
1. A short landing screen: a clear headline about getting their own plan, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 questions (goal, starting point, time they have, preferences, anything to avoid).
3. Their plan: laid out week by week or step by step, clearly personalized to their answers, with where \${nf(p.name) || "the business"} can help (only services in the details above).
4. Save the lead (below), then show a printable version ("Print or save as PDF") and a clear next step: "Book a session" or "Get help with your plan".

\${LEADS}

\${toolDesign(p)}

\${TRUTH_CUSTOMERS}
- Keep it general and safe. For anything health related, add one short line: "Check with a professional before starting something new."\`;
}

const MAGNETS = [
  {
    id: "estimator",
    usesIndustry: true,
    label: "Cost estimator",
    title: "Cost estimator",
    what: "Visitors answer a few questions and get a price range, then request an exact quote. Every answer is saved as a lead.",
    when: "Great for dentists, roofers, landscapers, cleaners, solar, wedding planners. Anyone whose customers ask \\"how much?\\" first.",
    prompt: estimatorPrompt,
    usesPrices: true,
    checks: ["Test the price math with a few answers", "Every price is the owner's, or marked as an example", "It says final pricing is confirmed later", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "quiz",
    usesIndustry: true,
    label: "Finder quiz",
    title: "Service finder quiz",
    what: "A friendly quiz that recommends the right service from their real menu, then invites them to book.",
    when: "Great for med spas, salons, photographers, studios, interior designers.",
    prompt: quizPrompt,
    checks: ["It only recommends services they really offer", "Health topics stay general", "Every answer leads to a result", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "assessment",
    usesIndustry: true,
    label: "Assessment",
    title: "Score assessment",
    what: "A short scorecard with a score out of 100, category scores and three recommendations, then a booking button.",
    when: "Great for coaches, fitness studios, dentists, home services, accountants.",
    prompt: assessmentPrompt,
    checks: ["Test the scoring with all-low and all-high answers", "Recommendations make sense for each result", "It says it's general guidance", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "savings",
    label: "Savings calculator",
    title: "Savings calculator",
    what: "Visitors enter what they pay today and see what they could save per month, per year and over 10 years.",
    when: "Great for solar, HVAC, insulation, windows, water heaters. Anyone who saves customers money over time.",
    prompt: savingsPrompt,
    input: { field: "price_notes", label: "Their numbers", hint: "Optional. Without them, the build uses example assumptions you'll swap later.", placeholder: "Average customer saves 70 to 90% on electric. System cost about $3 per watt. Local rate about 14 cents per kWh." },
    checks: ["Test the math with easy numbers", "Every assumption is theirs or labeled as an example", "No made-up rebates or tax credits", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "budget",
    label: "Budget planner",
    title: "Budget planner",
    what: "Visitors enter a total budget and get a split by category they can adjust, with the total always adding up.",
    when: "Great for wedding and event planners, remodelers, landscapers, interior designers.",
    prompt: budgetPrompt,
    input: { field: "price_notes", label: "Their numbers", hint: "Optional. Without them, the build uses example assumptions you'll swap later.", placeholder: "Typical wedding: venue 40%, catering 25%, photo 10%, flowers 8%, music 7%, attire 5%, other 5%." },
    checks: ["Moving a slider keeps the total equal to the budget", "Every split is theirs or labeled as an example", "Only real services are marked as theirs", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "affordability",
    label: "Affordability",
    title: "Affordability calculator",
    what: "Visitors enter income, debts and a down payment and see a comfortable price range and monthly payment.",
    when: "Great for realtors, mortgage lenders, car dealers, builders, anyone offering financing.",
    prompt: affordabilityPrompt,
    input: { field: "price_notes", label: "Their numbers", hint: "Optional. Without them, the build uses example assumptions you'll swap later.", placeholder: "30-year fixed, example rate 6.5%. Include taxes and insurance at about 1.5% of price per year." },
    checks: ["Test the payment with easy numbers against an online mortgage calculator", "Any example rate is clearly labeled", "It says it's not advice or a pre-approval", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "checklist",
    label: "Checklist",
    title: "Interactive checklist",
    what: "A tap-to-tick checklist with progress, the items they missed with tips, and a printable copy.",
    when: "Great for accountants, cleaners, movers, wedding planners, realtors, contractors.",
    prompt: checklistPrompt,
    checks: ["Every tip is general and true", "Missed items show with their tips", "Print or save as PDF works", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "plan",
    label: "Personalized plan",
    title: "Personalized plan",
    what: "Visitors answer a few questions and get their own week-by-week plan, built without AI so it costs nothing per use.",
    when: "Great for trainers, gyms, skin care, lawn care, cleaners, nutrition and wellness coaches.",
    prompt: planPrompt,
    checks: ["Different answers give different plans", "It's general and safe, with the check-with-a-pro line if health related", "Print or save as PDF works", "A test lead shows up on the admin page", "It looks good on your phone"],
  },
];

const SELL = [
  {
    id: "quote",
    usesIndustry: true,
    label: "Instant quote",
    title: "Instant quote generator",
    what: "Customers pick a service, answer questions, add extras and see their price live, then lock it in.",
    when: "Great for cleaning, landscaping, painting, mobile detailing, photography.",
    prompt: quotePrompt,
    usesPrices: true,
    checks: ["The prices match what the owner approved", "Totals add up with add-ons", "A test quote shows up on the admin page", "The owner can edit prices in one place", "It looks good on your phone"],
  },
  {
    id: "menu",
    label: "Service menu",
    title: "Service menu and finder",
    what: "A beautiful menu of everything they offer, a \\"help me choose\\" quiz and an inquiry form that knows which service they picked.",
    when: "Great for salons, med spas, spas, studios, photographers.",
    prompt: menuPrompt,
    usesPrices: true,
    checks: ["Every service is real", "Unknown prices say \\"Ask for pricing\\"", "Each \\"Ask about this\\" fills in the form", "A test inquiry shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "booking",
    label: "Booking portal",
    title: "Booking request portal",
    what: "Customers pick a service, a date and a time of day, and send a booking request the business confirms.",
    when: "Great for salons, photographers, trainers, cleaners, studios. Anyone still booking by phone or DM.",
    prompt: bookingPrompt,
    usesPrices: true,
    checks: ["Only real services and prices", "Only days and hours they're open", "It says \\"request\\", never \\"booked\\"", "A test request shows up on the admin page", "It looks good on your phone"],
  },
  {
    id: "referral",
    label: "Referral program",
    title: "Referral program",
    what: "Happy customers get their own share link, friends sign up through it, and the business tracks who earned a reward.",
    when: "Great for salons, cleaners, fitness studios, photographers, med spas. Any business that grows by word of mouth.",
    prompt: referralPrompt,
    input: { field: "reward_notes", label: "Their referral reward", hint: "Optional. Without it, the build uses an example reward you'll swap later.", placeholder: "$25 off for you and your friend after their first visit." },
    checks: ["The reward is theirs, or marked as an example", "Two test sign-ups get different links", "A friend through a link is credited to the right person", "Rewards can be marked earned and given", "It looks good on your phone"],
  },
  {
    id: "package",
    label: "Package builder",
    title: "Package builder",
    what: "Customers build their own package from real services and extras, watch the total update and send it in.",
    when: "Great for photographers, event planners, caterers, cleaners, designers, salons.",
    prompt: packagePrompt,
    usesPrices: true,
    checks: ["Every service and price is real", "Totals add up as items change", "No made-up package discounts", "A test package shows up on the admin page", "It looks good on your phone"],
  },
];

const GET = [
  {
    id: "website",
    label: "Website",
    title: "Preview website",
    what: "A redesigned one-page website built from their real details.",
    when: "Best when their website is outdated, slow or missing.",
    prompt: (p) => previewSitePrompt(p),
    checks: ["The name, phone, address and hours are right", "Every review is real and word for word", "No made-up prices, awards or numbers", "No fake names or reviews next to the people in photos", "It looks good on your phone"],
  },
  {
    id: "audit",
    label: "Marketing audit",
    title: "Marketing audit deck",
    what: "A polished presentation of what's working, three opportunities and a 30-day plan.",
    when: "Best after you've run the AI Lead Analyzer, so every finding is real.",
    prompt: auditPrompt,
    checks: ["Every finding is something you actually saw", "Anything unconfirmed is written as a question", "Their rating and review count are exact", "It sounds helpful, not like a list of what's wrong", "Your name and contact are on the last slide"],
    needsAnalysis: true,
  },
  {
    id: "adplan",
    label: "Ad strategy proposal",
    title: "Meta ads proposal deck",
    what: "A polished Facebook and Instagram ads plan: the offer, three sample ads, budget, industry benchmarks and the first 30 days.",
    when: "Best when you pitch ad management, especially to businesses that aren't running ads or are boosting posts.",
    prompt: adPlanPrompt,
    checks: ["Every number is an industry benchmark with its source, not a promise", "The offer is marked as a suggestion to confirm", "Before-and-afters use the client's real photos before it goes to them", "It says the ad budget is paid to Meta", "Your name and contact are on the last slide"],
  },
  {
    id: "instagram",
    label: "Instagram makeover",
    title: "Instagram makeover deck",
    what: "A new bio in a profile mockup, content pillars, a 9-post grid and sample captions.",
    when: "Best for salons, med spas, studios and anyone posting rarely or inconsistently.",
    prompt: instagramPrompt,
    checks: ["The bio is under 150 characters", "No made-up follower counts or results", "No fake names, reviews or results on the posts", "Sample content is labeled as sample", "The captions sound like the business"],
  },
  {
    id: "landing",
    label: "Landing page",
    title: "Sample landing page",
    what: "A focused page for one offer, ready for ads or social, with a working form.",
    when: "Best when they run ads or promos that send people to their homepage.",
    prompt: landingPrompt,
    checks: ["The offer is real or clearly a suggestion", "No made-up discounts or prices", "The form and thank-you message work", "The button is the same everywhere", "It looks good on your phone"],
  },
  {
    id: "calculator",
    label: "Revenue calculator",
    title: "Revenue calculator",
    what: "An interactive calculator, branded for them, showing what better marketing could be worth.",
    when: "Best for appointment-based businesses with a clear price per customer.",
    prompt: calculatorPrompt,
    checks: ["Test the math with easy numbers (100 leads, 50%, 50%, 50%, $100 = $1,250)", "Example numbers are labeled as examples", "It says it's an estimate, not a promise", "The sliders work on your phone", "Your contact button works"],
  },
];

export const SECTIONS = [
  { id: "get", label: "Builds to get clients", short: "Get clients", intro: "Make something for a business you want to work with, then send them the link.", builds: GET },
  { id: "magnets", label: "Lead magnets for clients", short: "Lead magnets", intro: "Build something a business can promote in ads and on social to bring in leads.", builds: MAGNETS },
  { id: "sell", label: "Builds to sell to clients", short: "Sell to clients", intro: "Build a tool a business's customers use, and sell it as part of your service.", builds: SELL },
];

export const BUILDS = [...GET, ...MAGNETS, ...SELL];

export const getBuild = (id) => BUILDS.find((b) => b.id === id) || BUILDS[0];

// Saved build links, newest first (the preview website kept its own field).
export function buildLinks(p) {
  const out = [];
  const saved = p.builds || {};
  BUILDS.forEach((b) => {
    const url = nf(saved[b.id]?.url) || (b.id === "website" ? nf(p.preview_url) : "");
    if (url) out.push({ id: b.id, title: b.title, url });
  });
  return out;
}
`;export{e as default};