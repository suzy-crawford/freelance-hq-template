import{_ as e,c as t,d as n,r}from"./offerData-BfuT1Kmy.js";import"./copyVoice-C9naJ-H9.js";import"./offerPrompts-DqfI4l6a.js";import{a as i,i as a,r as o}from"./clientsLogic-DJyf7BnV.js";var s=[{id:`S05`,group:`organic`,name:`Sample carousel`,receive:`One fully written 5 to 7 slide carousel, ideally designed`,best:`A topic that benefits from a visual explanation`},{id:`S06`,group:`organic`,name:`Existing post rework`,receive:`One alternative version of a selected public post, with stronger messaging or structure`,best:`An identifiable opportunity to clarify an existing message`},{id:`S07`,group:`organic`,name:`Three hooks for existing content`,receive:`Three hooks for a specific video, topic or content idea`,best:`Strong subject matter with room to experiment with the opening`},{id:`S08`,group:`organic`,name:`Five personalized content ideas`,receive:`Five topics with formats and one-line descriptions`,best:`A business with multiple services, FAQs or interesting expertise to showcase`},{id:`S09`,group:`organic`,name:`One-week content preview`,receive:`Three coordinated posts, including a Reel, carousel and B-roll concept`,best:`A prospect interested in understanding what a content service could look like`},{id:`S10`,group:`organic`,name:`Content repurposing sample`,receive:`One existing topic turned into three distinct formats`,best:`A business with valuable source material that could be used in additional ways`},{id:`S11`,group:`organic`,name:`FAQ content concept`,receive:`A real, publicly documented customer question turned into educational content`,best:`Services that benefit from answering questions before a purchase`},{id:`S12`,group:`organic`,name:`Service spotlight concept`,receive:`One post or Reel presenting a specific service, its benefits and appropriate next step`,best:`A business with several services or products worth highlighting`},{id:`A04`,group:`ads`,name:`Three ad creative concepts`,receive:`Three distinct ad ideas, each with a hook, visual and message`,best:`Opportunity to explore additional creative approaches`},{id:`A05`,group:`ads`,name:`Existing ad rework`,receive:`An alternative execution of one visible ad, keeping the verified offer details`,best:`An existing ad that could inspire a different creative test`},{id:`A06`,group:`ads`,name:`Three ad hooks + creative directions`,receive:`Three distinct opening hooks, each paired with a specific visual`,best:`A business with an offer that could be introduced in several ways`},{id:`A07`,group:`ads`,name:`Ad carousel concept`,receive:`One 4 to 6 card ad carousel with slide copy and visuals`,best:`Multiple benefits, products or process steps`},{id:`A08`,group:`ads`,name:`Offer-focused ad concept`,receive:`One complete ad presenting an existing service or confirmed promotion`,best:`An offer that could be communicated through another creative approach`},{id:`A09`,group:`ads`,name:`UGC-style ad script`,receive:`A short creator-style script with visuals, spoken copy and CTA`,best:`Products or services suited to a demonstration or firsthand explanation`},{id:`A10`,group:`ads`,name:`Ad-to-landing-page concept`,receive:`One proposed ad paired with matching landing page hero copy`,best:`An observable opportunity to align messaging between ad and destination`},{id:`X01`,group:`support`,name:`Landing page hero concept`,receive:`A proposed headline, subheadline, visual direction and CTA`,best:`Only when it fits your actual offer`},{id:`X02`,group:`support`,name:`Lead form concept`,receive:`A suggested introduction and the right qualification questions`,best:`Only when it fits your actual offer`},{id:`X03`,group:`support`,name:`Website section concept`,receive:`One redesigned service or offer section`,best:`Only when it fits your actual offer`},{id:`X04`,group:`support`,name:`Offer presentation concept`,receive:`An alternative presentation of an existing, verified offer`,best:`Only when it fits your actual offer`},{id:`X05`,group:`support`,name:`Simple campaign creative preview`,receive:`A small set of coordinated assets showing how a campaign could look`,best:`Only when it fits your actual offer`}];function c(e){return s.find(t=>t.id===String(e||``).toUpperCase())||null}function l({offer:e,customPitch:t}){let n=e?.primary_service;if(n===`meta_ads`)return[`ads`,`support`];if(n===`organic_social`)return[`organic`,`support`];if(n===`combined`)return[`ads`,`organic`,`support`];let r=String(t||e?.custom_service_name||``).toLowerCase(),i=/\bad|ads\b|advertis|meta|facebook ads|paid/.test(r),a=/social|content|reel|post|instagram|tiktok|organic/.test(r);return i&&!a?[`ads`,`support`]:a&&!i?[`organic`,`support`]:[`ads`,`organic`,`support`]}function u(e){let t=l(e);return s.filter(e=>t.includes(e.group))}function d(e){return u(e).map(e=>`${e.id} | ${e.name} | They'd receive: ${e.receive} | Best for: ${e.best}`).join(`
`)}function f(e){return u(e).filter(e=>e.group!==`support`).slice(0,2).map(e=>({id:e.id,why:``}))}var p=[[/ugc|creator[- ]style|testimonial video|talking[- ]head/i,`A09`],[/landing[- ]page/i,`A10`],[/lead form|instant form/i,`X02`],[/website section|homepage section|services section/i,`X03`],[/ad carousel|carousel ad/i,`A07`],[/rework|redo|refresh|new version of (an|their|one)/i,`A05`],[/ad hooks?|hooks? for (their |an |the )?ads?/i,`A06`],[/static ad|ad mockup|mock[- ]?up|single ad|one ad|ad concept for|offer[- ]focused|ad built around|an ad /i,`A08`],[/ad concepts|ad ideas|ads? creative/i,`A04`],[/carousel/i,`S05`],[/spotlight|reel|video|b-roll/i,`S12`],[/hook/i,`S07`],[/one[- ]week|week of content|content preview/i,`S09`],[/repurpos/i,`S10`],[/faq|question/i,`S11`],[/content ideas|post ideas|topics/i,`S08`],[/post/i,`S06`]];function m(...e){let t=e.filter(Boolean).join(` `);if(!t)return null;let n=p.find(([e])=>e.test(t));return n?n[1]:null}function h(e){let t=e||{},n=String(t.offer_to_send||t.idea_detail||t.idea||``).replace(/==/g,``),r=m(t.idea_detail,t.idea,t.offer_to_send),i=(t.samples||[]).filter(e=>c(e.id)),a=[];return r&&a.push({...c(r),why:``,rec:!0,fromIdea:!0,receive:n||c(r).receive}),i.forEach(e=>{a.some(t=>t.id===e.id)||a.push({...c(e.id),why:e.why,rec:!0})}),a.length||f({customPitch:t.pitch}).forEach(e=>a.push({...c(e.id),rec:!0})),u({customPitch:t.pitch}).forEach(e=>{a.some(t=>t.id===e.id)||a.push({...e})}),{ordered:a,chosen:t.chosen_by_user&&t.chosen_samples?.[0]||a[0]?.id}}function g(e){let t=String(e||``).toLowerCase();return`${/^[aeiou]/.test(t)?`an`:`a`} ${t}`}var _=[{id:`posts_consistently`,label:`Posts consistently`,group:`doing_well`},{id:`uses_reels`,label:`Uses Reels or video`,group:`doing_well`},{id:`good_photos`,label:`Good photos`,group:`doing_well`},{id:`unpolished_feed`,label:`Feed looks unpolished or off-brand`,group:`gap`},{id:`inconsistent`,label:`Posts inconsistently`,group:`gap`},{id:`no_video`,label:`Almost no video`,group:`gap`},{id:`weak_hooks`,label:`Weak hooks (first lines don't grab you)`,group:`gap`},{id:`no_cta`,label:`No clear call to action`,group:`gap`},{id:`little_proof`,label:`Little proof (reviews, results)`,group:`gap`},{id:`all_promo`,label:`Almost everything is promotional`,group:`gap`},{id:`little_education`,label:`Little education or tips`,group:`gap`},{id:`no_instagram`,label:`Couldn't find their Instagram`,group:`gap`}],v=[{id:`running_ads`,label:`They're running ads right now`,group:`doing_well`},{id:`not_running_ads`,label:`Not running any ads`,group:`gap`},{id:`weak_creative`,label:`Ad images or videos look weak`,group:`gap`},{id:`unclear_offer`,label:`The ad's offer is unclear`,group:`gap`},{id:`outdated_ads`,label:`Ads look old or outdated`,group:`gap`}];function y(e){if(!e)return _;if(e.primary_service===`meta_ads`){let e=[`posts_consistently`,`uses_reels`,`good_photos`,`unpolished_feed`,`no_cta`,`little_proof`];return[...v,..._.filter(t=>e.includes(t.id))]}return e.primary_service===`combined`?[...v,..._]:_}function b(e,t){let n=y(t);return(e||[]).map(e=>n.find(t=>t.id===e)?.label).filter(Boolean)}function x(e){let t=`"${String(e||``).replace(/"/g,``).trim()}"`;return`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&media_type=all&search_type=keyword_exact_phrase&q=${encodeURIComponent(t)}`}function S(e,t){return`https://www.google.com/search?q=${encodeURIComponent(`${e} ${t||``} instagram`)}`}var C={website:`Seen on their website`,you_noticed:`You noticed`,guess:`Our guess`},w={findOpportunity:`SHEFREELANCES AI: FIND THE OPPORTUNITY
You are an experienced brand and marketing strategist helping a beginner freelancer identify a potential marketing opportunity with a business they have NOT contacted yet.
Think like a senior strategist conducting a focused, preliminary brand and marketing review.
Your job is to understand the business, recognize what it already does well, and identify ONE useful idea that could become the starting point for a conversation.
This is not a complete marketing audit, proposal, or sales strategy.
The freelancer has not spoken to the business. We don't know its internal performance, goals, budget, or whether it is looking for marketing help.
I have attached screenshots of some combination of:

* Instagram profile, feed, Reels, or individual posts
* Meta Ad Library
* Website, landing page, or service pages

Only analyze material actually supplied. If a website or link is accessible and you inspect it, identify that as an additional reviewed source. Otherwise, do not claim to have reviewed it.
PROSPECT INFORMATION
Business: {{business_name}}
Industry: {{industry}}
Location: {{location}}
Website: {{website}}
Instagram: {{instagram}}
Facebook: {{facebook}}
MY FREELANCE SERVICE
Service: {{selected_service}}
My Offer: {{saved_offer_summary}}
My Experience Level: {{experience_level}}
If my offer is unavailable, use my selected service as the primary constraint.
YOUR INTERNAL REVIEW
Before writing the output, consider the following where visible.
1. Business and positioning

* What does the business sell?
* Who does it appear to serve?
* What makes its offer or presentation interesting?
* Is its value clear to a potential customer?

2. The customer perspective

* What might someone want to understand before buying or booking?
* What information does the business already communicate well?
* Are there opportunities to make its existing strengths more visible?

3. Instagram and content
Consider:

* Profile and bio
* Content themes
* Reels and carousels
* Hooks
* Messaging
* Content variety
* Educational content
* Trust-building content
* Calls to action

4. Meta advertising
Consider:

* Visible offers
* Advertising angles
* Hooks
* Creative approaches
* Messaging
* Calls to action
* Potential alternative concepts worth testing

Do not infer advertising performance from how an ad looks.
5. Website and customer journey
Consider:

* Offer clarity
* Headline and messaging
* Customer benefits
* Trust signals
* Primary CTA
* Ease of understanding the next step
* Consistency between advertising, social content, and website

Only evaluate sections that are actually provided.
6. Find an opportunity worth exploring
Consider possible opportunities, then select ONE that:

* Is based on a specific observation.
* Is relevant to the freelancer's actual service.
* Builds on something the business already has or does.
* Has a reasonable potential benefit.
* Could be demonstrated through one small sample.
* Would make a natural opening for a first conversation.

Do not choose an opportunity merely because you can find something negative to say.
If there isn't enough evidence, say what additional screenshot or information would help.
REQUIRED OUTPUT
Keep the ENTIRE response concise and suitable for a beginner.
In sections 2 and 3, wrap the one or two most important phrases in ==double equals signs== so they can be highlighted.
1. BUSINESS SNAPSHOT
In 2–3 sentences, explain what the business offers, who it appears to serve, and how it presents itself.
2. WHAT CAUGHT MY ATTENTION
Identify up to TWO genuine positive observations.
Use specific details from the screenshots.
3. AN OPPORTUNITY WORTH EXPLORING
Choose ONE potential opportunity.
What I noticed:
A specific observation supported by the supplied material.
The opportunity:
One practical idea the business could potentially explore.
Why it might be useful:
Explain the possible value in no more than two sentences.
Evidence:
Identify which screenshot or reviewed material supports the observation.
4. ONE IDEA I COULD OFFER TO SHARE
Recommend ONE specific, personalized marketing asset the freelancer could offer to create for this business.
The idea must:

* Connect directly to the opportunity identified.
* Be relevant to the freelancer's actual service.
* Be tangible enough for the business owner to immediately understand what they're being offered.
* Be small enough to create using the SheFreelances AI tools if the business expresses interest.
* Build on the business's existing offer, services, positioning, or creative assets.

For Meta Ads freelancers, prioritize:

* A complete ad concept for one of the business's existing offers.
* A sample static ad mockup, including a proposed visual, headline, hook, copy and CTA.
* A short video ad concept or storyboard.
* A new creative execution of an existing offer.

For Organic Social freelancers, prioritize:

* A Reel concept with an actual hook and filming direction.
* A sample educational carousel.
* A B-roll Reel concept with on-screen text.
* A small content series using something the business already does well.

RETURN:
The idea: What specifically could be created?
The opportunity behind it: Why this could be worth exploring.
What I'd offer to send: Describe the deliverable in language a business owner would immediately understand.
Creative direction: A short description of what it could actually look like.
Recommended samples: From the SAMPLE OFFER MENU at the end, choose the 2 or 3 sample offers that best fit this opportunity and my service, best first. The first one must be the same thing as The idea above. Put each on its own line as the ID, the name and one short reason.
IMPORTANT:
Do not create the asset yet.
The freelancer will first send a permission-based message asking whether the prospect would like to see the idea.
Only when the prospect expresses interest should SheFreelances generate the complete asset using the appropriate Ads or Content tool.
Do not present the new concept as something that will definitely outperform the business's existing marketing.
Describe the proposed idea in everyday language. Prefer "a quick Facebook ad mockup for your consultation offer" over "an alternative creative angle." The recipient should be able to picture what they're being offered.
The goal is for the owner to think, "Oh, she has an actual ad idea for MY business? Yeah, I'd like to see that."
5. OUTREACH HANDOFF
Return exactly these fields:
Positive observation:
Potential opportunity:
Idea to offer:
Evidence/reference:
Fit: Strong, Good or Weak, based on how clearly the opportunity matches my service.
Do not write the outreach message. My SheFreelances AI outreach tool will do that separately.
RULES

* Do not assume the business is struggling or needs help.
* Do not invent metrics, results, testimonials, or performance problems.
* Separate observed information from strategic inference.
* Do not assume the absence of an ad in a screenshot proves no ads are running.
* Do not infer posting history or consistency from a limited screenshot.
* Do not recommend services the freelancer doesn't offer.
* Do not create a full audit or strategy.
* Do not create a sample asset.
* Do not write outreach.
* Prefer constructive ideas that build on existing strengths.
* If there's insufficient evidence, recommend one additional item to review rather than inventing a finding.

The purpose is to find ONE thoughtful, relevant idea worth offering to share in an initial conversation.
Write clearly and conversationally. No corporate filler, jargon, or em dashes.
The final output should take approximately one minute to read.
SAMPLE OFFER MENU
{{sample_menu}}`};function T(e){return e?.primary_service?e.primary_service===`other`?e.custom_service_name||`Other`:t[e.primary_service]?.label||``:``}function E(t){if(!t)return``;let r=[];r.push(`${t.selected_name||`My offer`}${t.niche?` for ${e(t)}`:``}.`),t.record?.talk?.one_sentence&&r.push(t.record.talk.one_sentence),t.price&&r.push(`${n(t.price)} per month.`);let i=(t.package?.categories||[]).map(e=>`${e.name}: ${(e.items||[]).join(`, `)}`);return i.length&&r.push(`Includes ${i.join(`; `)}.`),r.join(` `)}function D({prospect:e,offer:n,service:s,experience:c,customPitch:l}){let u=`Not found`;return{prospect:[{key:`business_name`,label:`Business`,value:e.name||u},{key:`industry`,label:`Industry`,value:e.business_type||u},{key:`location`,label:`Location`,value:e.location||u},{key:`website`,label:`Website`,value:e.website?o(e.website):u,full:e.website||u},{key:`instagram`,label:`Instagram`,value:e.instagram?i(e.instagram):u,full:e.instagram||u},{key:`facebook`,label:`Facebook`,value:e.facebook?a(e.facebook):u,full:e.facebook||u}],you:[{key:`selected_service`,label:`Service`,value:l||(n?T(n):t[s]?.label)||`Not chosen yet`},{key:`saved_offer_summary`,label:`My offer`,value:l||(n?E(n):`No offer saved yet`)},{key:`experience_level`,label:`Experience`,value:r[c]?.label||`Not set`}]}}function O(e){let{prospect:t,you:n}=D(e),r=w.findOpportunity;return[...t,...n].forEach(e=>{r=r.split(`{{${e.key}}}`).join(e.full||e.value)}),r.split(`{{sample_menu}}`).join(d(e))}var k=/^\s*(?:#+\s*)?(?:\*\*)?\s*(?:\d\s*[.)]\s*)?(business snapshot|what caught my attention|an opportunity worth exploring|one idea i could offer to share|outreach handoff)\b/i,A={"business snapshot":`snapshot`,"what caught my attention":`caught`,"an opportunity worth exploring":`opportunity`,"one idea i could offer to share":`idea`,"outreach handoff":`handoff`};function j(e){let t=String(e).replace(/^\s*(?:[-•·]|\*(?!\*))\s+/,``);return t=t.replace(/^\s*#+\s*/,``),t=t.replace(/^\*\*([^*]+?)\*\*\s*(:?)/,(e,t,n)=>n||/:$/.test(t)?`${t.replace(/:$/,``)}:`:t),t=t.replace(/\*\*([^*]+?)\*\*/g,`==$1==`),t=t.replace(/[*_>`]/g,``),t.replace(/====/g,``).trim()}function M(e){let t={},n=null;for(let r of String(e||``).split(/\r?\n/)){let e=j(r).match(k);if(e){n=A[e[1].toLowerCase()],t[n]=[];continue}n&&t[n].push(r)}return t}function N(e,t){let n={},r=null;for(let i of e||[]){let e=j(i);if(!e)continue;let a=t.find(t=>RegExp(`^${t.re}\\s*:`,`i`).test(e));if(a){r=a.key,n[r]=e.replace(/^[^:]*:\s*/,``);continue}r&&(n[r]=`${n[r]} ${e}`.trim())}return n}var P=`['’]`;function F(e){let t=M(e),n=[],r=[];(t.snapshot||[]).map(j).filter(Boolean).forEach(e=>{let t=e.match(/^([A-Z][\w &/'’().-]{1,26}):\s*(.{1,80})$/);t&&n.length<4&&!/[.!?]$/.test(t[1])?n.push({label:t[1].trim(),value:t[2].replace(/==/g,``).trim()}):r.push(e)});let i=r.join(` `),a=(t.caught||[]).map(j).filter(Boolean),o=N(t.opportunity,[{key:`noticed`,re:`what i noticed`},{key:`opportunity`,re:`the opportunity`},{key:`why`,re:`why it might be useful`},{key:`evidence`,re:`evidence`}]),s=N(t.idea,[{key:`idea`,re:`the idea`},{key:`behind`,re:`the opportunity behind it`},{key:`offer_to_send`,re:`what i(?:${P}d| would| could) offer to send`},{key:`relevance`,re:`why it${P}?s relevant`},{key:`creative`,re:`creative direction`}]),l=N(t.handoff,[{key:`positive`,re:`positive observation`},{key:`opportunity`,re:`potential opportunity`},{key:`idea`,re:`idea to offer`},{key:`evidence`,re:`evidence\\s*(?:\\/|or)\\s*reference`},{key:`fit`,re:`fit`},{key:`channel`,re:`best channel`}]),u=[],d=[...t.idea||[],...t.handoff||[]].map(j);for(let e of d){let t=e.match(/\b[SAX]\d{2}\b/g);t&&t.forEach(n=>{let r=n.toUpperCase();if(!c(r)||u.some(e=>e.id===r))return;let i=``;if(t.length===1){let t=e.match(/\b[SAX]\d{2}\b[^:]*:\s*(.+)$/i)||e.match(/\b[SAX]\d{2}\b.*?\s[-\u2013\u2014]\s+(.+)$/i);i=t?t[1].replace(/==/g,``).trim():``}u.push({id:r,why:i})})}return{source:`claude`,version:2,samples:u.slice(0,3),facts:n,fit:(String(l.fit||``).match(/strong|good|weak/i)||[``])[0].replace(/^./,e=>e.toUpperCase()),channel:String(l.channel||``).replace(/==/g,``).split(/[.,(]/)[0].trim(),snapshot:i,caught:a,noticed:I(o.noticed||``),opp_detail:o.opportunity||``,why:o.why||``,opp_evidence:o.evidence||``,idea_detail:s.idea||``,behind:s.behind||``,offer_to_send:s.offer_to_send||``,relevance:s.relevance||``,creative:s.creative||``,positive:l.positive||a[0]||``,opportunity:l.opportunity||o.opportunity||``,idea:l.idea||s.idea||``,evidence:l.evidence||o.evidence||``}}function I(e){if(!e||e.includes(`==`))return e;let t=(e.match(/[^.!?]+[.!?]+(\s|$)/g)||[e]).find(e=>/\b(doesn['’]?t|don['’]?t|isn['’]?t|aren['’]?t|not|no|never|missing|without)\b/i.test(e));return t?e.replace(t.trim(),`==${t.trim()}==`):e}function L(e){return!!(e&&e.positive&&e.opportunity&&e.idea)}export{C as a,b as c,c as d,h as f,F as i,s as l,L as n,x as o,g as p,O as r,S as s,w as t,f as u};