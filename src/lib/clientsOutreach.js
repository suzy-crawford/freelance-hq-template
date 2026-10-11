// SheFreelances OS - Get Clients: Write your message (clientsOutreach.js)
// Curriculum formula: reason -> what I noticed -> a useful thought -> an easy next step.

import { getServiceName, nicheInSentence, getFreelancerName } from "./offerData";
import { cleanText } from "./offerPrompts";
import { voiceFor } from "./copyVoice";
import { observationLabels, SOURCE_LABELS } from "./clientsAnalysis";

export const OUTREACH_TONES = [
  { id: "shorter", label: "Shorter" },
  { id: "casual", label: "More casual" },
  { id: "professional", label: "More professional" },
];

const TONE_INSTRUCTIONS = {
  shorter: "Make every message noticeably shorter. Cut anything that isn't needed.",
  casual: "Make every message more casual and relaxed, like a friendly local texting another local business owner.",
  professional: "Make every message a little more polished and professional, but still warm and short.",
};

const str = { type: "string" };
const OUTREACH_SCHEMA = {
  type: "object",
  properties: { dm: str, email_subject: str, email_body: str, follow_up_1: str, follow_up_2: str },
  required: ["dm", "email_subject", "email_body", "follow_up_1", "follow_up_2"],
};

export function buildOutreachPrompt({ offer, profile, prospect, tone }) {
  const a = prospect.analysis || {};
  const realObservations = [...(a.where_you_could_help || []), ...(a.doing_now || [])]
    .filter((item) => item.source !== "guess")
    .map((item) => `${item.gap || item.point} (${SOURCE_LABELS[item.source]}${item.evidence ? `: "${item.evidence}"` : ""})`);
  const noticed = observationLabels(prospect.observations, offer);

  return {
    prompt: `Write first-touch outreach from a freelance marketer to a local business owner.

THE FREELANCER
- Name: ${getFreelancerName(profile || {}) || "the freelancer"}
- Service: ${offer ? getServiceName(offer) : "freelance marketing"} for ${offer ? nicheInSentence(offer) : "small businesses"}
- How she describes it: ${offer?.record?.talk?.one_sentence || "not set"}

THE BUSINESS
- Name: ${prospect.name}
- Type and location: ${prospect.business_type}, ${prospect.location}

WHAT SHE FOUND (only use these as facts)
- Real observations: ${realObservations.join("; ") || "none"}
- What she noticed herself: ${noticed.join("; ") || "nothing extra"}
- Her own research notes: ${String(prospect.research_notes || "").slice(0, 2000) || "none"}
- The result to hint at: ${a.pitch?.what || "not set"}
- Her way in: ${a.pitch?.angle || "not set"}
- A sample she can offer to make: ${a.pitch?.show_them || "a few ideas"}

THE FORMULA FOR EVERY FIRST MESSAGE
1. Why she's reaching out (shows it isn't random).
2. One specific thing she noticed about THIS business. Compliment something real first.
3. One useful thought about the opportunity.
4. An easy next step: offer to send the sample (for example "Want me to send over a couple of ideas?"). End with a simple question.

WRITE
- dm: Instagram or Facebook DM. 60 words or fewer. Starts with "Hey" and the business name or "team". Sounds like a real person.
- email_subject: under 8 words, specific to them, no clickbait.
- email_body: 110 words or fewer. Same formula. Greeting "Hi ${prospect.name} team,". Sign off with just her first name.
- follow_up_1: for 3 days later if no reply. 30 words or fewer. A friendly bump, no guilt.
- follow_up_2: for 7 days later. 50 words or fewer. Adds ONE new useful observation or idea from what she found, then a soft question.

RULES
- Never mention prices, packages, a list of services, a portfolio, her resume, or "book a call".
- Never claim past clients, results, or years of experience.
- Never invent facts about the business. Only use what she found.
- Never insult their marketing. Frame it as an opportunity for a business that's already doing good work.
- Don't make it about her. Keep "I" to a minimum.
- No em dashes or en dashes. No exclamation marks. No "I hope this finds you well".
${tone ? `- ${TONE_INSTRUCTIONS[tone]}` : ""}

${voiceFor("outreach")}`,
    response_json_schema: OUTREACH_SCHEMA,
  };
}

export function finalizeOutreach(result) {
  const r = result || {};
  return {
    dm: cleanText(r.dm),
    email_subject: cleanText(r.email_subject),
    email_body: cleanText(r.email_body),
    follow_up_1: cleanText(r.follow_up_1),
    follow_up_2: cleanText(r.follow_up_2),
    generated_at: new Date().toISOString(),
  };
}

const wordCount = (text) => String(text || "").trim().split(/\s+/).filter(Boolean).length;

// The curriculum's "bad outreach check", done automatically.
export function outreachChecks(text, { prospectName, maxWords, requireName = true }) {
  const t = String(text || "");
  const words = wordCount(t);
  const iCount = (t.match(/\bI\b/g) || []).length;
  const nameWord = String(prospectName || "").split(/\s+/)[0] || "";
  return [
    { label: `Short (${words} words)`, pass: words <= maxWords },
    ...(requireName
      ? [{ label: "Specific to them", pass: !!nameWord && t.toLowerCase().includes(nameWord.toLowerCase()) }]
      : []),
    { label: "No price or package", pass: !/\$\d|\bprice|\bpackage|\bper month\b/i.test(t) },
    { label: "Not all about you", pass: iCount <= 3 },
    { label: "Easy to reply to", pass: /\?\s*$/.test(t.trim()) || /\?/.test(t.split(/\n/).slice(-2).join(" ")) },
  ];
}

export const MESSAGE_FIELDS = [
  { key: "dm", label: "Instagram or Facebook DM", maxWords: 60, when: "Send first", requireName: true },
  { key: "email", label: "Email", maxWords: 110, when: "Or send by email", requireName: true },
  { key: "follow_up_1", label: "Follow-up 1", maxWords: 30, when: "3 days later, if no reply", requireName: false },
  { key: "follow_up_2", label: "Follow-up 2", maxWords: 50, when: "7 days later, if still no reply", requireName: false },
];
