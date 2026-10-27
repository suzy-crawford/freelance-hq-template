var e=`// SheFreelances OS - Ads Manager: the 7-day client launch (adsLaunch.js)
// Day 1 onboard → Days 2-3 ads and creative → Day 4 build (paused) → Day 5 client approval →
// Day 6 publish → Day 7 hands off → Day 10 first real check → every week after.
// Everything here is built in code from the saved campaign, so it costs no credits.

import { getAds, countBlanks, displayName } from "./adsCards";
import { getNiche, radiusText } from "./adsNiches";
import { formatMoney } from "./adsData";

export const LEAD_TEST_TOOL = "https://developers.facebook.com/tools/lead-ads-testing";
export const LEAD_TERMS = "https://www.facebook.com/legal/leadgen/tos";

function addDays(iso, n) {
  if (!iso) return null;
  const d = new Date(\`\${iso}T12:00:00\`);
  d.setDate(d.getDate() + n);
  return d;
}

export function dayDate(campaign, day) {
  const d = addDays(campaign.start_date, day - 1);
  return d ? d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "";
}

function nextWeekday(fromDate, weekday) {
  const d = new Date(fromDate);
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1);
  return d;
}

// The day-by-day plan. Each task has a stable id so its checkbox is remembered.
export function getLaunchDays(campaign) {
  const s = campaign.setup;
  const r = campaign.record || {};
  const isForm = s.destination === "instant_form";
  const ads = getAds(campaign);
  const blanks = ads.reduce((n, ad) => n + countBlanks(ad), 0);
  const fromClient = (r.launch?.from_client || []).map((t, i) => ({ id: \`ai_client_\${i}\`, task: t }));
  const beforePublish = (r.launch?.before_publish || []).map((t, i) => ({ id: \`ai_pub_\${i}\`, task: t }));

  return [
    {
      day: 1,
      title: "Onboard your client",
      intro: "Get everything you need from the client before you build anything.",
      tasks: [
        { id: "access", task: "Get access to their Meta Business account, ad account and Facebook Page (and Instagram, if they have one)" },
        { id: "payment", task: "Make sure a payment method is on the ad account. The client pays Meta directly." },
        ...(isForm
          ? [
              { id: "leadterms", task: "Have them accept Meta's lead ad terms for their Page (one click, once per Page)", link: LEAD_TERMS, linkLabel: "Open the lead ad terms" },
              { id: "privacy", task: "Get the link to their privacy policy (Meta needs it on the lead form)" },
            ]
          : [{ id: "pixel", task: "Check the Meta pixel is installed on their website and tracking" }]),
        { id: "assets", task: "Collect the photos and videos on the Ad creative shot list, plus their logo" },
        ...(blanks ? [{ id: "blanks", task: \`Get the answers for the \${blanks} blank\${blanks > 1 ? "s" : ""} in your ads (price, rating and so on)\`, tab: "ads", tabLabel: "Fill them in on Ad copy" }] : []),
        { id: "followup", task: "Agree who follows up with new leads, and how fast. Aim for within 5 minutes." },
        ...fromClient,
      ],
    },
    {
      day: 2,
      span: "Days 2 to 3",
      title: "Finish the ads and creative",
      intro: "Pick the version of each ad you like best and get the images or videos ready.",
      tasks: [
        { id: "pickcopy", task: "Pick the first line, middle and headline for each ad", tab: "ads", tabLabel: "Open Ad copy" },
        { id: "noblanks", task: "Make sure no [blanks] are left in any ad" },
        { id: "creative", task: "Get one image or video ready for each ad and name each file after its ad", tab: "creative", tabLabel: "Open Ad creative" },
      ],
    },
    {
      day: 4,
      title: "Build it in Meta (paused)",
      intro: "Claude builds the campaign in the client's account, everything paused. Nothing goes live today.",
      tasks: [
        ...(isForm
          ? [
              {
                id: "form",
                task: \`Build the Instant Form in Meta Business Suite (All tools, then Instant Forms). Questions: \${(r.journey?.form_questions || []).join(" / ") || "name, phone and email"}. Add a phone field, their privacy link and a thank-you message, then copy the form ID.\`,
              },
            ]
          : []),
        { id: "project", task: "Set up this client in Claude (once per client)", claude: "project" },
        { id: "build", task: "Have Claude build the campaign, paused, and run the check before it hands it back", claude: "setup" },
        { id: "previews", task: "Open every ad preview on your phone. Does each image match its text?" },
      ],
    },
    {
      day: 5,
      title: "Get your client's OK",
      intro: "Send the previews. Fix anything they want. Nothing goes live without their yes.",
      tasks: [{ id: "approval", task: "Send your client the previews and get a yes", message: "approval" }, ...beforePublish],
    },
    {
      day: 6,
      title: "Publish and test",
      intro: "Go live, then make sure leads actually reach the client.",
      tasks: [
        { id: "publish", task: "In Ads Manager, open the campaign and press Publish" },
        ...(isForm
          ? [
              { id: "testlead", task: "Send a test lead with Meta's lead testing tool", link: LEAD_TEST_TOOL, linkLabel: "Open the lead testing tool" },
              { id: "testarrived", task: "Confirm the test lead reached the client (email, CRM or Meta Business Suite)" },
            ]
          : [{ id: "testclick", task: "Click your own ad link on your phone and make sure the page loads and matches the ad" }]),
        { id: "scripts", task: "Give the front desk the follow-up texts below", scripts: true },
        { id: "live", task: "Send your client the we're-live message", message: "live" },
      ],
    },
    {
      day: 7,
      title: "Hands off",
      intro: "Meta is learning who to show the ads to. Changing things now resets it.",
      tasks: [{ id: "approved", task: "Check every ad is approved and spending. That's it. Don't change anything else." }],
      notes: r.launch?.first_results ? [r.launch.first_results] : [],
    },
    {
      day: 10,
      title: "Your first real check",
      intro: "Now there's enough data to make decisions.",
      tasks: [{ id: "firstcheck", task: "Run Check my ads in this client's Claude project", claude: "check" }],
    },
  ];
}

export function getWeeklyRhythm(campaign) {
  const start = addDays(campaign.start_date, 9);
  const nextMon = start ? nextWeekday(start, 1).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
  const nextFri = start ? nextWeekday(start, 5).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
  return [
    { id: "monday", when: "Every Monday", from: nextMon, title: "Check my ads", what: "Claude labels every ad Kill, Watch, Scale or Refresh, tells you what to do, and writes new versions of winners and tired ads. Ask the client how many leads booked and showed.", claude: "check" },
    { id: "friday", when: "Every Friday", from: nextFri, title: "Write my client report", what: "A short update from the real numbers. Optional: record a 3-minute Loom walking through it. Clients stay when they hear from you.", claude: "report" },
    { id: "monthly", when: "First Monday of the month", title: "Check the competition", what: "See what similar businesses are running and find angles nobody is using.", claude: "competitors" },
  ];
}

function ownerName() {
  return "[owner's first name]";
}

// Message templates the member sends her client. Written in code, edited before sending.
export function approvalMessage(campaign) {
  const s = campaign.setup;
  const niche = getNiche(campaign);
  const ads = getAds(campaign);
  const area = niche.radius ? \`people within \${radiusText(niche).replace(" mi", " miles")} of \${(campaign.location || "the business").split(",")[0]}\` : "people across the country";
  return \`Hi \${ownerName()}, your ads are ready for a look before anything goes live.

Here are the previews:
[paste the preview links Claude gave you]

What's set up: \${ads.length} ads for \${campaign.product || "your offer"}, shown to \${area}, at \${formatMoney(s.budget.daily)} a day.

Reply with any changes, or a quick yes and I'll publish them.\`;
}

export function liveMessage(campaign) {
  const s = campaign.setup;
  const check = addDays(campaign.start_date, 9);
  const checkText = check ? check.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "in about 4 days";
  const where = s.destination === "instant_form" ? "New leads will come in through the form on the ad" : "People will click through to your website";
  return \`Hi \${ownerName()}, your ads are live as of today.

\${where}. The most important thing now: call or text every new lead within 5 minutes. That's usually the difference between a lead and a booked appointment. I've put together a few texts your team can use.

The first few days, Meta is learning who to show the ads to, so I won't change anything yet. I'll check the numbers on \${checkText} and send you your first update after that.\`;
}

export function followUpTexts(campaign) {
  const texts = campaign.record?.journey?.follow_up_texts;
  if (texts?.length) return texts;
  const name = displayName(campaign.business_name);
  return [
    { when: "Within 5 minutes", text: \`Hi [first name], this is [team member] from \${name}. Thanks for reaching out about \${campaign.product || "us"}. When's a good time for a quick call to get you booked in?\` },
    { when: "Next day, if no reply", text: \`Hi [first name], just following up from \${name}. Happy to answer any questions before you book. What works better for you, a call or a text?\` },
    { when: "3 days later, if no reply", text: \`Hi [first name], last check-in from \${name}. If now isn't a good time, no problem. Just reply whenever you're ready and we'll get you sorted.\` },
  ];
}
`;export{e as default};