// SheFreelances OS - Ads Manager: prompts the member copies into Claude (adsClaudePrompts.js)
// Claude, with Meta's official "Meta Ads" connector, does the work inside the ad account.
// The app builds every prompt from the saved campaign, so the member never writes one.
// Built in code, so these cost no Base44 credits.

import { RULEBOOK, DIAGNOSIS, formatMoney, getComplianceRules, BUSINESS_TYPES } from "./adsData";
import { getAds, countBlanks, displayName } from "./adsCards";
import { getNiche, cplText, cplSourceText, radiusText } from "./adsNiches";
import { voiceFor } from "./copyVoice";
import { adWritingRules } from "./adsPrompts";
import { ANGLE_CATEGORIES } from "./adsAngleLibrary";
import { HEADLINE_STRUCTURES } from "./adsHeadlines";
import { CREATIVE_TYPES } from "./adsCreative";

const META_SETUP = {
  leads: { objective: "OUTCOME_LEADS", goal: "LEAD_GENERATION", destination: "an Instant Form (lead form)" },
  appointments: { objective: "OUTCOME_LEADS", goal: "LEAD_GENERATION", destination: "an Instant Form (lead form)" },
  purchases: { objective: "OUTCOME_SALES", goal: "OFFSITE_CONVERSIONS (Purchase event on the website pixel)", destination: "the product page on their website" },
  traffic: { objective: "OUTCOME_TRAFFIC", goal: "LANDING_PAGE_VIEWS", destination: "a page on their website" },
};

const SAFETY = `SAFETY RULES (follow these the whole time)
- Create everything PAUSED. Never activate, publish or turn on anything. I review and publish it myself in Ads Manager.
- Never change, pause or delete anything that already exists in the account unless I say yes to that exact change in this chat.
- Only use the ad account I choose. Never touch other ad accounts.
- If something fails, tell me in plain words what happened and what I should do. Don't guess.
- I'm still learning Meta ads, so explain anything technical in a few plain words.`;

function targetText(campaign) {
  const niche = getNiche(campaign);
  if (campaign.target_cpl) return `$${campaign.target_cpl} per lead (the client's target)`;
  const typical = cplText(niche);
  return typical
    ? `none set by the client. Typical for ${niche.label.toLowerCase()}: ${typical} (${cplSourceText(niche)}). Use the middle of that range as a starting target and say so.`
    : "none set. Treat the first 2 weeks as the baseline.";
}

function header(campaign, job) {
  return `I'm a freelance marketer running Meta ads for my client, ${displayName(campaign.business_name)}${campaign.location ? ` in ${campaign.location}` : ""}. Use the Meta Ads connector to ${job}.

If the Meta Ads connector isn't connected, stop and tell me: "In Claude, go to Settings, then Connectors, find Meta Ads, click Connect and log in with Facebook."`;
}

// 1. Set it up in Meta
export function buildSetupPrompt(campaign) {
  const s = campaign.setup;
  const meta = META_SETUP[s.goal] || META_SETUP.leads;
  const niche = getNiche(campaign);
  const ads = getAds(campaign);
  const isForm = s.destination === "instant_form";
  const month = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const radius = niche.radius
    ? `${niche.radius[0]} to ${niche.radius[1]} miles around the business address (the smaller number in a big city, the bigger one in a smaller town; ask me for the address if you don't have it)`
    : `the whole country (${campaign.location || "ask me which country"})`;
  const blanks = ads.reduce((n, ad) => n + countBlanks(ad), 0);

  const adBlocks = ads
    .map(
      (ad) => `AD ${ad.index + 1}: "${displayName(campaign.business_name)} - ${ad.name} - ${ad.format || "Image"}"
Primary text:
${ad.primary}
Headline: ${ad.headline}
Description: ${ad.description}
Button: ${ad.cta}
Image: ${ad.image?.visual || "the image I upload for this ad"}`
    )
    .join("\n\n");

  return `${header(campaign, "build this campaign in my client's ad account, paused, so I can review it")}

${SAFETY}

STEP 1. FIND THE RIGHT ACCOUNT
List my ad accounts and ask me which one belongs to ${displayName(campaign.business_name)}. Then check it:
- If the Meta Ads connector isn't available for that account yet, stop and tell me to use the step-by-step walk-through in my Freelance HQ app instead.
- If there's no payment method on the account, tell me the client needs to add one before the ads can run (you can still build everything paused).

STEP 2. FIND THE PAGE
List the Facebook Pages for that ad account and ask me which one belongs to ${displayName(campaign.business_name)}.${
    isForm
      ? `
- If that Page hasn't accepted Meta's lead ad terms, stop and give me this link to accept them: https://www.facebook.com/legal/leadgen/tos . Wait until I say it's done.
- Lead ads need an Instant Form, and you can't create forms. Ask me for the form ID. If I haven't made it yet, tell me: "In Meta Business Suite, go to All tools, then Instant Forms, create the form, and copy its ID." The form questions are: ${(campaign.record?.journey?.form_questions || []).join(" / ") || "name, phone and email"}.`
      : ""
  }
Also check whether the business has an Instagram account linked, so the ads can show on Instagram too.

STEP 3. GET THE IMAGES
I need ${ads.length} image${ads.length > 1 ? "s" : ""}, one for each ad. Ask me to upload them from my computer with the upload tool (or give you a public image link). Name each one after its ad. Ask me whether any image was made with AI, and set the AI disclosure the way I answer.

STEP 4. CONFIRM THE PLAN WITH ME
Before creating anything, show me this plan in a short list and wait for my yes:
- Campaign: "${displayName(campaign.business_name)} - ${s.goal_label} - ${month}"
- Objective: ${meta.objective}${s.is_health ? " (no special ad category is needed for health businesses, but follow the ad rules below)" : ""}
- Budget: ${formatMoney(s.budget.daily)} a day at the campaign level (Advantage campaign budget)
- Ad set: "${displayName(campaign.business_name)} - ${niche.radius ? "Local" : "Country"} - Broad", optimized for ${meta.goal}, sending people to ${meta.destination}
- Location: ${radius}
- Audience: broad. No interests, no lookalikes. Only add an age range if the offer clearly calls for it.
- Placements: Advantage+ placements
- ${ads.length} ads, listed below, each with the "${ads[0]?.cta || "Learn more"}" button

${niche.special_category ? `SPECIAL AD CATEGORY: this is a ${niche.special_category} business, so the campaign must use the ${niche.special_category} special ad category, with Meta's location rules for it (at least a 15 mile radius in the US, no zip codes, no age or gender limits).

` : ""}BLANKS CHECK
${blanks ? `The ads below contain ${blanks} blank${blanks > 1 ? "s" : ""} in square brackets, like [price]. Before building, list every blank and ask me to fill it in or remove that line. Never build an ad that still has a blank in it, and never fill a blank yourself.` : "If any ad text below still contains something in square brackets, like [price], ask me to fill it in first. Never fill it yourself."}

STEP 5. BUILD IT (only after my yes)
Create the campaign, the ad set and the ads, all paused. Use the copy below exactly as written.${
    isForm ? " Attach every ad to the Instant Form I gave you." : `\nThe link for every ad: ${campaign.website || "ask me for the exact page"}.`
  }

${adBlocks}

STEP 6. CHECK EVERYTHING BEFORE YOU HAND IT BACK
Read back what you created and check each of these. Show me the result as a short pass / fix list:
- Campaign, ad set and every ad exist and are PAUSED.
- Budget is ${formatMoney(s.budget.daily)} a day, set once (not doubled across levels).
- The right Page is on every ad${isForm ? ", and every ad is attached to the Instant Form I gave you" : ", and every ad links to the right page"}.
- The location and objective match the plan in step 4.
- Every headline is under 40 characters.
- No ad text still has anything in [square brackets].
- Every ad name follows: Business - Angle - Format.
Fix anything that fails, then check again.

STEP 7. HAND IT BACK
- Give me a preview link for every ad and the Ads Manager link for the campaign.
- Remind me: open every preview on my phone, send the previews to my client for their OK, then press Publish in Ads Manager myself.

AD RULES FOR THIS BUSINESS
${getComplianceRules(campaign)
  .map((r) => `- ${r}`)
  .join("\n")}`;
}

// 2. Check my ads (weekly)
export function buildCheckPrompt(campaign) {
  const name = displayName(campaign.business_name);
  return `${header(campaign, "check how the ads are doing and tell me what to do this week")}

${SAFETY}

WHAT TO DO
1. Find the ad account for ${name} and the campaign that starts with "${name} - " (ask me if you can't tell which).
2. Pull the last 7 days and the full time since it started, for every ad: amount spent, leads, cost per lead, frequency (how many times the average person saw it), click-through rate and cost per 1,000 views.
3. Target cost per lead: ${targetText(campaign)}
4. Ask me: how many of this week's leads booked, and how many showed up? (Write "not known yet" if I don't know.)
5. Label every ad with ONE of these, using only the rulebook below: KILL, WATCH, SCALE or REFRESH.
6. Show me a short table: ad name, spent, leads, cost per lead, frequency, label, and one plain sentence on why.
7. Find where the problem is, using the diagnosis order below. Tell me in one or two sentences, and say clearly if it's the client's side (follow-up or sales) rather than the ads.
8. Tell me, in order, the 1 to 3 things to do this week. For anything that changes the account (pausing an ad, changing a budget), ask me "Want me to do this?" and only do it if I say yes.
9. MAKE MORE LIKE THE WINNER: for every ad labeled SCALE or REFRESH, look at what made it work (the angle, the first line, the format) and write 3 new ad versions that keep what works and change ONE thing each: one with a new first line, one with a new headline style, one with a new creative idea. Use the libraries and writing rules below. If I say yes, build them as new PAUSED ads in the same ad set. Never edit the winning ad itself.
10. If the numbers look strange (no spend at all, ads rejected, spend far above the budget), tell me that first, before anything else.
11. End with a short "Log for this week" block: date, spend, leads, cost per lead, booked and showed (if known), labels, what we changed. I'll keep it in this client's Claude project.

THE SHEFREELANCES RULEBOOK (use only these rules)
${RULEBOOK.map((r) => `- ${r.label}: ${r.rule}`).join("\n")}

WHERE THE PROBLEM IS (check in this order)
${DIAGNOSIS.map((d, i) => `${i + 1}. ${d.sign}: ${d.meaning}`).join("\n")}

LIBRARIES FOR NEW ADS
Angle categories: ${ANGLE_CATEGORIES.map((c) => c.name).join(", ")}.
Headline styles: ${HEADLINE_STRUCTURES.map((h) => `${h.name} (${h.structure})`).join("; ")}.
Creative types: ${CREATIVE_TYPES.map((c) => c.name).join(", ")}.

${adWritingRules(campaign)}`;
}

// 3. Client report
export function buildReportPrompt(campaign) {
  return `${header(campaign, "pull the real numbers and write a short update I can send my client")}

${SAFETY}

WHAT TO DO
1. List my ad accounts and ask me which one belongs to ${displayName(campaign.business_name)}. Find the campaign that starts with "${displayName(campaign.business_name)} - ".
2. Ask me which period to report on: the last 7 days or the last 30 days.
3. Pull, for that period and the period before it: amount spent, leads, cost per lead, people reached, and the best and weakest ad by cost per lead. Then ask me how many leads booked and how many showed up, and include those if I know them.
4. Target cost per lead: ${targetText(campaign)}
5. Write the update to the business owner:
   - A short opening: how the period went, in 2 or 3 sentences.
   - A small table: spent, leads, cost per lead, people reached, with the change from the period before.
   - What's working (1 or 2 points) and what we're changing next (1 or 2 points).
   - One question or next step for the owner, like checking how many leads booked.
6. Only use numbers you pulled. If a number isn't available, leave it out. Never estimate results.
7. Under the update, list for me (not for the client) anything in the numbers I should look at more closely.
8. Then give me 4 or 5 bullet points I can talk through in a 3-minute Loom video of the Ads Manager screen, if I want to send one.

${voiceFor("client_update")}`;
}

// 4. Check the competition
export function buildCompetitorPrompt(campaign) {
  const niche = getNiche(campaign);
  const words = [campaign.product, niche.label].filter(Boolean).join(", ");
  return `${header(campaign, "look at what similar businesses are advertising on Facebook and Instagram right now")}

This is research only. Don't create or change anything in any ad account.

WHAT TO DO
1. Search the Meta Ad Library for active ads in ${campaign.location ? "the United States" : "my client's country"} using 2 or 3 searches based on: ${words}. Use specific words people would put in an ad (like the treatment or service name), not just the type of business.
2. Ignore ads that clearly have nothing to do with this kind of business.
3. Group what you find by advertiser. For each relevant advertiser show: the page name, how many active ads you found, the headline, when the oldest one started running, and the Ad Library link.
4. Ads that have been running for 30 days or more are probably working. Point those out.
5. Then give me:
   - The patterns you see in their headlines and offers (2 or 3 points).
   - 3 angles nobody seems to be using that could work for ${displayName(campaign.business_name)}.
6. Remind me that the connector only shows headlines and dates, so I should open the links to see the full ads and images.

Our current angles are: ${(campaign.record?.angles || []).map((a) => a.name).join(", ") || "not set yet"}. Name the new angles using these categories where they fit: ${ANGLE_CATEGORIES.map((c) => c.name).join(", ")}.`;
}

// The client's Claude Project: one Claude "employee" per client that remembers everything.
export function buildProjectPrompt(campaign) {
  const s = campaign.setup;
  const niche = getNiche(campaign);
  const name = displayName(campaign.business_name);
  const type = BUSINESS_TYPES.find((t) => t.id === campaign.business_type)?.label || "";
  return `You are my ads assistant for ONE client: ${name}. You only work on this client. I'm a freelance marketer and still learning, so explain anything technical in a few plain words.

THE CLIENT
- Business: ${name}${type ? ` (${type})` : ""}${campaign.location ? `, ${campaign.location}` : ""}
- Website: ${campaign.website || "none"}
- What we advertise: ${campaign.product || "not set"}
- The offer: ${campaign.offer_text || "see the plan"}
- Goal: ${s.goal_label}
- Budget: ${formatMoney(s.budget.daily)} a day (about ${formatMoney(s.budget.monthly)} a month, paid by the client to Meta)
- Who sees the ads: ${niche.radius ? `${radiusText(niche).replace(" mi", " miles")} around the business` : "the whole country"}
- Target cost per lead: ${targetText(campaign)}
- Campaign names start with "${name} - ". Ad names follow: Business - Angle - Format.
- Current angles: ${(campaign.record?.angles || []).map((a) => a.name).join(", ") || "not set yet"}

HOUSE RULES (always)
- Use the Meta Ads connector, and only the ad account for ${name}. Never touch any other account.
- Everything you create starts PAUSED. Never publish or turn anything on. I publish myself.
- Never change, pause or delete anything without my yes to that exact change.
- Use real numbers only. Never estimate or invent results.
- At the end of every check or report, give me a short "Log" block (date, spend, leads, cost per lead, booked, showed, what changed). I add it to this project's files, so read the logs before every check and remember what worked and what didn't.

THE SHEFREELANCES RULEBOOK
${RULEBOOK.map((r) => `- ${r.label}: ${r.rule}`).join("\n")}

WHERE THE PROBLEM IS (in this order)
${DIAGNOSIS.map((d, i) => `${i + 1}. ${d.sign}: ${d.meaning}`).join("\n")}

AD RULES FOR THIS BUSINESS
${getComplianceRules(campaign)
  .map((r) => `- ${r}`)
  .join("\n")}

WHEN YOU WRITE ADS
${adWritingRules(campaign)}

WHEN YOU WRITE TO MY CLIENT
${voiceFor("client_update")}`;
}

// ChatGPT image prompt for one ad
export function buildImagePrompt(campaign, ad) {
  return `Create a square (1:1) photo for a Facebook and Instagram ad for ${displayName(campaign.business_name)}${campaign.location ? `, a business in ${campaign.location}` : ""}.

${ad.image?.prompt || ad.image?.visual}

Rules:
- No text, words, logos or watermarks in the image.
- Make it look like a real photo taken at a real local business, not a stock photo or an illustration.
- No before and after images.
- Natural light, realistic colors.`;
}
