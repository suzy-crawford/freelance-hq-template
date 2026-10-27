import{r as e}from"./rolldown-runtime-hePW80VL.js";import{a as t,g as n,h as r,l as i,nt as a,rt as o}from"./utils-DanrhGdY.js";import{t as s}from"./base44Client-Dlti50LC.js";import{c as ee,s as te}from"../hq.js";import{a as c,i as l,o as u,r as d,s as f}from"./adsNiches-RUPS1T_q.js";import{f as ne,h as re}from"./offerData-BfuT1Kmy.js";var p=e(o(),1),m=e=>String(e||``).trim();function h(e){let t=[[`Business name`,e.name],[`Type of business`,e.business_type],[`City`,e.location],[`Address`,e.address],[`Phone`,e.phone],[`Email`,e.email],[`Current website`,e.website],[`Instagram`,e.instagram],[`Facebook`,e.facebook]].filter(([,e])=>m(e)),n=m(e.preview_source);return`Build a beautiful, high-converting one-page website for this local business. It's a preview I'm making to show the owner what their website could look like.

THE BUSINESS
${t.map(([e,t])=>`- ${e}: ${m(t)}`).join(`
`)}
${n?`\nTHEIR GOOGLE BUSINESS LISTING (use the real details, services, hours and reviews from here)\n${n}\n`:``}
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
- Add a small, tasteful line in the footer: "Website preview made for ${m(e.name)||`this business`}."
- Make it one page, open to anyone with the link (no login). I'll press Publish myself.`}var g=e=>String(e||``).trim(),_=[{id:`med_spa`,noun:`med spa`,label:`Med spa or aesthetics`,match:/(med ?spa|medical spa|aesthetic|botox|injector|filler|laser hair|hydrafacial|skin ?care|derma)/i,price:`which treatment they want, which areas or how big an area, first time or returning, add-ons, one visit or a series, and when they'd like to come in`,quiz:`what they'd like to change (lines, lips, dull or uneven skin, texture, unwanted hair), how natural they want it to look, how much downtime is OK, what they've had before, and timing`,score:{headline:`What's your skin score?`,categories:`daily routine, sun protection, skin concerns, treatment history`}},{id:`dental`,noun:`dental practice`,label:`Dental practice`,match:/(dent|orthodont|invisalign|implant|teeth|veneer)/i,price:`which treatment (whitening, clear aligners, veneers, implants, a checkup), how many teeth, insurance or paying themselves, interest in a payment plan, and timing`,quiz:`what they'd like to change about their smile, any sensitivity or discomfort, past orthodontic work, budget comfort, and whether there's a date they're working toward`,score:{headline:`How healthy is your smile routine?`,categories:`brushing and flossing, food and habits, checkups, smile confidence`}},{id:`salon`,noun:`salon`,label:`Hair, nails or lash salon`,match:/(hair|salon|barber|nail|lash|brow|blowout|balayage|stylist)/i,price:`which service, hair length and thickness, the kind of color or style, extras, and how often they'd come in`,quiz:`the look they're after, how much upkeep they want, their hair or nail history, budget comfort, and timing`,score:{headline:`How healthy is your hair routine?`,categories:`washing and styling, heat and color, upkeep, products`}},{id:`fitness`,noun:`fitness studio`,label:`Gym or fitness studio`,match:/(gym|fitness|yoga|pilates|crossfit|boxing|personal train|barre|spin|bootcamp)/i,price:`membership, classes or personal training, sessions per week, how long they'd commit, and extras`,quiz:`their main goal, experience level, the kind of workout they enjoy, schedule, and whether they want a group or one on one`,score:{headline:`How strong is your fitness routine?`,categories:`movement, strength, recovery and sleep, consistency`}},{id:`chiro`,noun:`chiropractic clinic`,label:`Chiropractic or physical therapy`,match:/(chiro|spinal|posture|physio|physical therapy)/i,price:`the kind of visit (first assessment, follow-up, a package), how often, and insurance or paying themselves`,quiz:`where they feel it, how long it's been going on, what makes it worse, how active they are, and what they've tried`,score:{headline:`How's your posture, really?`,categories:`desk and screen setup, daily movement, sleep, aches and stiffness`}},{id:`roofing`,noun:`roofing company`,label:`Roofing`,match:/(roof|shingle|storm damage|gutter|siding)/i,price:`repair or replacement, home size or number of stories, current roof material, any storm damage, how steep the roof is, and timing`,quiz:`what they're seeing (leaks, missing shingles, age), how long they plan to stay in the home, material preference, and budget comfort`,score:{headline:`Is your roof ready for storm season?`,categories:`age and material, visible wear, attic and gutters, past storms`}},{id:`cleaning`,noun:`cleaning company`,label:`Cleaning service`,match:/(clean|maid|janitorial)/i,price:`bedrooms, bathrooms, home size, one-time or recurring, standard or deep clean, extras (inside the fridge, oven, windows), and pets`,quiz:`how often they'd like help, what they hate cleaning most, home size, pets, and timing`,score:{headline:`How much time is cleaning costing you?`,categories:`hours each week, rooms that pile up, stress level, help you have now`}},{id:`lawn`,noun:`landscaping company`,label:`Landscaping or lawn care`,match:/(landscap|lawn|yard|mow|tree|garden|irrigation|sprinkler)/i,price:`yard size, which services (mowing, cleanup, mulch, planting, design), how often, and the yard's current condition`,quiz:`what they want the yard to look like, how much upkeep they'll do themselves, budget comfort, and timing`,score:{headline:`How healthy is your lawn?`,categories:`watering, mowing, weeds and pests, soil`}},{id:`hvac_plumbing`,noun:`home service company`,label:`HVAC, plumbing or electrical`,match:/(hvac|heating|cooling|air condition|\bac\b|furnace|plumb|water heater|electric)/i,price:`the kind of system or job, its age, home size, repair or replace, what's going wrong, and how soon they need it`,quiz:`what's happening, how old the system is, comfort problems, energy bills, and timing`,score:{headline:`Is your home ready for the season?`,categories:`system age, maintenance, comfort, energy bills`}},{id:`painting`,noun:`painting company`,label:`Painting or home improvement`,match:/(paint|remodel|renovat|handyman|contractor|flooring|cabinet|drywall|deck|fence|pressure wash)/i,price:`inside or outside, how many rooms or how big the area, ceilings and trim, the condition and prep needed, and timing`,quiz:`which part of the home, the style they want, how they'll use the space, budget comfort, and timing`,score:{headline:`How ready is your home for a refresh?`,categories:`wear and tear, style, how you use the space, upkeep`}},{id:`pest`,noun:`pest control company`,label:`Pest control`,match:/(pest|termite|mosquito|rodent|exterminat)/i,price:`which pest, home size, one-time treatment or an ongoing plan, how bad it is, and timing`,quiz:`what they're seeing, where, how long it's been happening, pets or kids at home, and timing`,score:{headline:`How pest-proof is your home?`,categories:`entry points, moisture, food and trash, yard`}},{id:`auto`,noun:`auto detailer`,label:`Auto detailing`,match:/(detail|ceramic|paint correction|car wash|tint|ppf)/i,price:`vehicle size, the package (wash, interior, full detail, coating), the car's condition, pet hair, and add-ons`,quiz:`how they use the car, what bothers them most, how long they want it to stay clean, budget comfort, and timing`,score:{headline:`How protected is your car's finish?`,categories:`washing habits, parking and weather, interior, protection`}},{id:`pet`,noun:`pet care business`,label:`Pet grooming or pet care`,match:/(pet|dog|cat|groom|daycare|boarding|kennel)/i,price:`which service (grooming, daycare, boarding), pet size, coat type, how often, and add-ons`,quiz:`their pet's size, energy and coat, what they need help with, schedule, and budget comfort`,score:{headline:`How happy is your pet's routine?`,categories:`exercise, grooming, care while you're away, health habits`}},{id:`photography`,noun:`photographer`,label:`Photography`,match:/(photo|portrait|headshot|videograph)/i,price:`the kind of shoot, how many hours, how many people, how many locations, and prints or albums`,quiz:`the occasion, the style they love, how many people, where, and their date`,score:{headline:`Are you ready for your photo day?`,categories:`planning, outfits, location, comfort on camera`}},{id:`solar`,noun:`solar company`,label:`Solar or energy upgrades`,match:/(solar|battery storage|energy efficien|ev charger)/i,price:`home size, what they pay for power each month, roof type and direction, battery or not, and timing`,quiz:`what they want most (lower bills, backup power, going green), their roof and home, how long they'll stay, budget comfort, and timing`,score:{headline:`How energy smart is your home?`,categories:`power bills, home and roof, appliances, backup power`}},{id:`events`,noun:`wedding and event planner`,label:`Weddings and events`,match:/(wedding|event|planner|bridal|venue|catering|caterer|florist|dj\b)/i,price:`the kind of event, guest count, date and season, the level of help they want, and extras`,quiz:`the kind of event, the vibe they want, guest count, how hands-on they want to be, budget comfort, and their date`,score:{headline:`How ready is your wedding plan?`,categories:`budget, vendors, timeline, guest details`}},{id:`real_estate`,noun:`real estate agency`,label:`Real estate or lending`,match:/(real ?estate|realtor|realty|brokerage|mortgage|lender|loan officer|home buy)/i,price:`buying or selling, price range, area, timeline, and whether they're pre-approved`,quiz:`buying or selling, the kind of home and area they want, must-haves, budget comfort, and timing`,score:{headline:`How ready are you to buy a home?`,categories:`savings and credit, budget, must-haves, timing`}},{id:`accounting`,noun:`bookkeeping and tax business`,label:`Accounting, bookkeeping or tax`,match:/(account|bookkeep|\btax|cpa|payroll)/i,price:`business type, monthly transactions, number of accounts, payroll or not, and how far behind the books are`,quiz:`their business type and size, what they handle themselves today, what stresses them most, and their deadlines`,score:{headline:`How healthy are your business books?`,categories:`record keeping, cash flow, taxes, payroll`}}],v={id:`general`,label:`Other (general questions)`,price:`size or scope, type or material, extras and timing`,quiz:`what they want, their preferences, budget comfort and timing`,score:null};function y(e){return _.find(t=>t.id===e)||v}function ie(e){let t=`${g(e.business_type)} ${g(e.name)}`;return(_.find(e=>e.match.test(t))||_.find(t=>t.match.test(g(e.preview_source).slice(0,400)))||v).id}var b={title:`Use their real photos`,text:`I've attached real photos of the business. Replace the stock images and photo placeholders with these, best photo in the biggest spot. Keep the layout. Don't add names or captions to people in the photos.`},x={title:`Match their brand`,text:`I've attached their logo. Put it in the header and footer, and update the colors across the whole design to match it. Keep the text readable and the buttons easy to see.`},S={title:`Check the facts`,text:`Go through every sentence and list anything that isn't in the details I gave you at the start: claims about how they work, what's included, numbers, credentials, results. Then remove or reword each one so it only says what I gave you.`},C={title:`Polish it on phones`,text:`Check every page at phone width. Fix anything that's cramped, cut off, too small to read or hard to tap, and tell me what you changed.`},w={title:`Connect their booking link`,text:`Point every Book, Request and Schedule button to this link, opening in a new tab: `},T={title:`Add the Meta Pixel`,text:`Add the Meta Pixel with this ID to every public page, and fire a Lead event when someone submits a form. Pixel ID: `},E={title:`Email me new leads`,text:`Each time a new submission is saved, email me (the app owner) with their name, contact details, answers and the result they saw.`},D={title:`Make it shorter`,text:`Cut this down so it can be read in two minutes. Keep the strongest points, merge anything repetitive, and keep the next step at the end.`},O={title:`Add my offer`,text:`Add a slide just before the next step that explains what I'd do for them, in plain words, based only on this: `},k={title:`Update the prices`,text:`Replace the prices with these, update every total and range that uses them, and test the math again: `},ae={website:[b,x,w,S,C],audit:[O,D,x,S],instagram:[{title:`Turn the grid into real posts`,text:`Make each of the 9 grid tiles a downloadable 1080 by 1350 image, same design and words, with a download button under each one.`},b,x,S],landing:[b,x,w,T,E,S],calculator:[{title:`Use their real numbers`,text:`Replace the example numbers with these real ones, change the label to "Your numbers", and test the math again: `},x,C],estimator:[k,T,E,b,x],quiz:[T,E,b,x,S],assessment:[T,E,b,x,S],quote:[k,w,E,b,x],menu:[k,w,E,b,x],booking:[k,E,T,b,x],savings:[{title:`Use their real numbers`,text:`Replace the example assumptions with these, remove the "Example assumption" labels for anything I give you, and test the math again: `},T,E,x],budget:[{title:`Use their real splits`,text:`Replace the example budget split with this, remove the example labels for anything I give you, and check the total still always adds up: `},T,E,x],affordability:[{title:`Use their real rates`,text:`Use these rates and costs instead of the examples, keep the "not advice or a pre-approval" line, and test the payment math again: `},T,E,x],checklist:[{title:`Change the checklist`,text:`Rewrite the checklist for this topic instead, keeping the same layout, groups and tips format: `},T,E,x,S],plan:[{title:`Change the plan type`,text:`Change the plan to this instead, keeping the same questions-then-plan flow and building it without AI calls: `},T,E,x,S],referral:[{title:`Set the reward`,text:`Change the reward everywhere it appears to this, and update the How it works steps to match: `},E,{title:`Add a QR code`,text:`Add a printable page with a QR code for the referral sign-up page, sized for a counter card or a receipt, with the reward in one short line.`},x,S],package:[k,E,b,x,S]},A=e=>String(e||``).trim();function j(e){let t=[[`Business name`,e.name],[`Type of business`,e.business_type],[`City`,e.location],[`Address`,e.address],[`Phone`,e.phone],[`Email`,e.email],[`Website`,e.website],[`Instagram`,e.instagram],[`Facebook`,e.facebook]].filter(([,e])=>A(e)),n=A(e.preview_source);return`THE BUSINESS
${t.map(([e,t])=>`- ${e}: ${A(t)}`).join(`
`)}${n?`\n\nTHEIR GOOGLE BUSINESS LISTING (real details, services, hours and reviews)\n${n}`:``}`}function M(e){let t=e.analysis?.source===`claude`?e.analysis:null;return t?.full_text?`\n\nWHAT I FOUND WHEN I REVIEWED THEIR MARKETING (my notes; these are the ONLY findings you may state as facts)\n${A(t.full_text).slice(0,7e3)}`:``}function N(e,{service:t=!0}={}){let n=[[`Name`,e.name],[`What I do`,t&&e.service],[`Email`,e.email]].filter(([,e])=>A(e));return n.length?`\n\nFROM (the freelancer sending this)\n${n.map(([e,t])=>`- ${e}: ${A(t)}`).join(`
`)}`:``}var P=e=>{let t=A(e.business_type);return/^[A-Z][a-z]/.test(t)?t.charAt(0).toLowerCase()+t.slice(1):t},F=e=>A(e.email)?`opens an email to me at ${A(e.email)} (a simple email link, no email setup needed)`:`opens an email to me (a simple email link I can fill in later)`;function I(e=`owner`){let t=e===`owner`;return`RULES (these matter more than anything else)
- Only state facts that are in the details above. Never invent prices, awards, years in business, credentials, follower counts, results or numbers.
- Never invent or reword reviews.
${t?`- If something would be worth checking but isn't in my notes, write it as a question to ask them ("Worth a look: are new patients able to book online?"), never as a fact.`:`- This is for their customers. If something isn't in the details above, leave it out or use a clearly labeled placeholder the owner can fill in. No notes or questions for the owner on the page.`}
- Use real-looking photos with people in them (AI-generated models are fine) so it feels alive and human: customers enjoying the service, the team at work, the place. Never present them as real named customers, real reviews or real results: no fake names on people, no invented testimonials, and no before-and-after shown as a real client's result.
- Don't stretch the facts. Never claim who does which treatment or job, how visits or appointments work, what's included, or what competitors or the local market are doing, unless it's written above.
- Write like a friendly expert${t?` talking to the owner`:``}. Plain words, no hype. No em dashes anywhere, not even as placeholders for missing numbers.
- Make the public pages open to anyone with the link, no login needed. I'll press Publish myself.`}var L=I(`owner`),R=I(`customers`),z=`DESIGN (make it look like it came from a top performance-marketing agency, not a generic template)
- Bold and editorial: a dark, high-contrast cover with huge type, then slides that mix light and dark sections. Big confident headlines, one accent color pulled from their brand, generous space.
- It should scream "ads expert": real-looking phone mockups of the ads in the Instagram feed, Stories and Reels; a funnel diagram (Ad, then lead form or landing page, then a text within 5 minutes, then booked); a simple campaign structure diagram (1 campaign, the audience, 3 ads); big number cards for the budget, ad area and cost per lead; a 30-day timeline; and a mockup of the weekly report they'd get, tagged "Sample report", with the benchmark ranges instead of made-up results.
- Lifestyle photos with people throughout (AI-generated models are fine), plus the place and the work. No fake names, reviews or results on them.
- Smooth slide transitions, one slide per screen, arrow keys and swipe, slide numbers, and it reads well on a phone.`,B=`DESIGN
- A beautiful, premium presentation that works as a shareable web page: one slide per screen, arrow keys and swipe to move, slide numbers, and it reads well on a phone.
- Elegant serif headings with a clean sans for text, lots of space, a calm palette that suits the business (use their brand colors if their website has clear ones).`;function V(e,t){return`Create a beautiful, client-ready marketing audit presentation for this business. I'm a freelance marketer and I'll send it to the owner to start a conversation.

${j(e)}${M(e)}${N(t)}

THE SLIDES (10 to 12)
1. Cover: "${A(e.name)}: marketing review", prepared by ${t.name||`me`}, with today's date.
2. At a glance: what they do, where, and their real rating and review count if the listing shows them.
3. What's already working: 2 or 3 genuine strengths, from my notes or their listing.
4 to 6. Three opportunities, one per slide. For each: what I noticed, why it matters for getting more customers, and what better looks like. Use only my notes. If I gave you fewer than three findings, fill the rest with clearly labeled questions worth checking.
7. A simple table: area, today, recommended.
8. What the first 30 days could look like (3 or 4 plain steps), tied to ${t.service||`the service I offer`}.
9. A next step slide: "Want to talk it through?" with a button that ${F(t)}.
${M(e)?``:`
I haven't added my own review notes, so keep every opportunity as a question to explore, not a finding.
`}
${B}

${L}
- Add a small line on the last slide: "Prepared for ${A(e.name)||`this business`}. Based on public information."`}function H(e,t){let n=c({business_name:e.name,business_description:`${A(e.business_type)} ${A(e.preview_source).slice(0,600)}`}),r=e.analysis?.source===`claude`?e.analysis:null,i=A(r?.idea_detail)||A(r?.idea),a=f(n,3),o=n.budget?`INDUSTRY BENCHMARKS FOR ${n.label.toUpperCase()} (use these numbers exactly, and label them as typical for the industry, never as a promise)
- Suggested starting budget: $${n.budget[0]} to $${n.budget[1]} a day, paid by the business straight to Meta (about $${(n.budget[0]*30).toLocaleString(`en-US`)} to $${(n.budget[1]*30).toLocaleString(`en-US`)} a month)
- Ad area: ${u(n)} around the business
- Typical cost per lead: ${l(n)||`not available, so leave cost per lead out`}${d(n)?` (source: ${d(n)})`:``}${n.cta?`\n- Button that usually works: ${n.cta}`:``}${n.formats?`\n- Formats that work: ${n.formats}`:``}${n.form_fields?`\n- Lead form fields: ${n.form_fields}`:``}`:`BUDGET
I don't have industry benchmarks for this kind of business. Suggest starting with $20 a day as a two-week test, paid by the business straight to Meta, and leave cost per lead out.`,s=a.length?`THE THREE AD ANGLES TO SHOW (in this order). The example lines show the style only: never use their prices or claims, write new lines from the details above. Where an angle needs the client's own photos or video (like before-and-afters), show a polished sample tagged \"Sample creative, use the client's real photos\".\n${a.map((e,t)=>`${t+1}. ${e.name}: ${e.concept} Creative: ${e.creative} Example line: "${e.example}" Why it works: ${e.why}${e.caution?` Careful: ${e.caution}`:``}`).join(`
`)}`:`THE THREE AD ANGLES
Pick three different angles that fit this business: a first-visit or first-job offer, social proof from their real reviews, and showing the work or the place.`;return`Create a beautiful, client-ready Meta ads proposal presentation for this business. I'm a freelance marketer and I'll send it to the owner to show them the Facebook and Instagram ad plan I'd run for them.

${j(e)}${M(e)}${N(t)}

${o}

${s}

THE SLIDES (11 to 13)
1. Cover: "${A(e.name)}: Facebook and Instagram ads plan", prepared by ${t.name||`me`}, with today's date.
2. Where they are today: what they do, where, and their real rating and review count if the listing shows them. Only say whether they run ads now if my notes say so; otherwise ask it as a question.
3. The goal: one clear goal for the ads (for example more booked consultations or more quote requests), in one sentence.
4. The offer to lead with: ${i?`build it around this idea from my review: ${i}.`:`a simple first-visit or first-job offer built on their most popular service.`} Show it as a suggestion to confirm together. Use their real price if it's in the details above; otherwise show a realistic example price for this kind of business with a small "Example price" tag.
5. Who we'd reach: their city and the ad area above, and the kind of customer, in plain words.
6 to 8. Three sample ads, one per slide, using the three angles above. Show each one as a realistic Facebook or Instagram ad mockup: page name and "Sponsored", primary text, a scroll-stopping image or video frame with people in it (AI-generated models are fine), headline and button. Show them inside real-looking phone screens (Instagram feed, Stories and Reels placements). For a results angle, show a polished sample "after" photo tagged "Sample creative, use the client's real photos". Next to it: the angle name and why it works for this business. Tag each "Sample ad".
9. Where the clicks go: a short lead form inside Facebook and Instagram (with the fields above), or a landing page built for this offer. Recommend one and say why.
10. Budget and what to expect: the starting budget and ad area above, and the typical cost per lead with its source, written as "typical for ${n.label?n.label.toLowerCase():`this kind of business`}, not a promise". Say clearly the ad budget is paid to Meta by the business.
11. The first 30 days: week 1 set up tracking, the lead form and the ads, all reviewed and approved before anything goes live; week 2 launch and learn; week 3 keep what works and cut what doesn't; week 4 a simple report and the plan for month 2.
12. How leads get followed up: reply to every new lead within 5 minutes, with a simple text and call routine.
13. Next step: "Want to get this running?" with a button that ${F(t)}.
${M(e)?``:`
I haven't added my own review notes, so keep anything about their current marketing as a question to explore, not a finding.
`}
${z}

${L}
- Never promise results, leads, sales or a return. Only use the benchmark numbers above, labeled as typical for the industry.${n.compliance?`\n- Ad rules for this industry: ${n.compliance}`:``}
- Add a small line on the last slide: "Prepared for ${A(e.name)||`this business`}. Based on public information and industry benchmarks."`}function U(e,t){return`Create a visual Instagram makeover presentation for this business, to show the owner what their Instagram could look like if I managed it. I'm a freelance marketer and managing their Instagram is something I'd offer.

${j(e)}${M(e)}${N(t,{service:!1})}

THE SLIDES (8 to 10)
1. Cover: "${A(e.name)}: Instagram makeover", prepared by ${t.name||`me`}.
2. Where it stands today: only what's in the details above. If I didn't give you their current bio or numbers, show it as "Current profile" with the handle and leave the numbers out.
3. The new bio: shown inside a realistic Instagram profile mockup. Under 150 characters, with what they do, who it's for, one proof point that's in the details (like the real Google rating) and one clear call to action. Show the character count.
4. Highlights: 5 story highlight covers with short labels (for example Book, Reviews, Services, Team, Visit).
5. Content pillars: 3 or 4 topics they should post about and why each brings in customers.
6. The first 9 posts: a 3 by 3 grid of designed post tiles. Each tile is a polished designed post with a short headline on it (carousel covers, tips, quotes from real reviews, behind the scenes, people enjoying the service), labeled with its format (Reel, Carousel or Post). People are welcome; just no fake names or fake results.
7. Three sample captions, written in full, for three of those posts. Only promise what the details above say.
8. A simple weekly rhythm (how many posts, which days, which formats).
9. Next step: "Want me to take this on?" with a button that ${F(t)}.

${B}
- Mark the grid and captions with a small "Sample content" tag.

${L}`}function W(e,t){let n=e.analysis?.source===`claude`?e.analysis:null,r=A(n?.idea_detail)||A(n?.offer_to_send);return`Build a high-converting landing page for one offer from this business, to show the owner what a page built for ads or social could do. I'm a freelance marketer.

${j(e)}${M(e)}${N(t)}

THE OFFER
${r?`Build it around this idea from my review: ${r}`:`Pick the single service that looks most popular or most valuable from the details above, and build the page around a simple first-visit or free-consultation offer. Don't invent a discount or a price.`}

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

${R}
- Add a small footer line: "Sample landing page made for ${A(e.name)||`this business`}."`}function oe(e,t){return`Build an interactive revenue calculator for this business, branded for them, so the owner can see what better marketing could be worth. I'm a freelance marketer and I'll send them the link.

${j(e)}${N(t)}

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
- A button: "Want to talk about the numbers?" that ${F(t)}.

DESIGN
- Clean, premium and branded for ${A(e.name)||`the business`} (their colors if their website has clear ones), easy on a phone.

${L}`}function G(e){let t=A(e.price_notes);return t?`\n\nTHEIR PRICES AND RULES (use these exactly)\n${t}`:`

PRICES
I don't have their prices yet. Use clearly marked example prices ("Example: $150 to $250") that are easy to change in one place, and add a note on the admin page listing every price the owner must confirm before this goes live.`}var K=`SAVING LEADS
- A short form on the results step: first name, email, phone (optional) and one consent checkbox ("It's OK to contact me about this").
- Save every submission with the answers, the result shown and the date.
- A private admin page (login required) listing submissions newest first, with their answers, a status (New, Contacted, Booked) and an export to CSV.`,se=`DESIGN
- Premium, modern and branded for \${name}, using their colors if their website has clear ones. Elegant serif headings, clean sans text, lots of space.
- One question per screen with a progress bar, big tap targets, and it must feel great on a phone (most people will open it from Instagram or an ad).
- Use real-looking photos with people (AI-generated models are fine) along with the place and the work, so it feels human. Never put fake names, quotes or results next to them.`,q=e=>y(e.build_industry||ie(e)),ce=e=>q(e).noun||P(e)||`business like this`,J=e=>`${/^[aeiou]/i.test(ce(e))?`an`:`a`} ${ce(e)}`,le=e=>q(e).noun||P(e)?`${J(e)}'s customers`:`this business's customers`,Y=e=>se.replace("${name}",A(e.name)||`the business`);function ue(e,t){return`Build an interactive cost estimator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get a price range, then request an exact quote.

${j(e)}${G(e)}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what their project or treatment could cost, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 simple questions that drive the price for ${J(e)}. Ask about ${q(e).price}. Use picture cards where it helps.
3. The result: an estimated price range with a short breakdown and what affects the final price. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Request your exact quote" or "Book a consultation".

${K}

${Y(e)}

${R}
- Every price shown is an estimate range with the line "Final pricing confirmed after a consultation."`}function de(e,t){return`Build an interactive "find the right service for you" quiz for this business that they can promote in ads and on social to capture leads.

${j(e)}

THE EXPERIENCE
1. A short landing screen with an inviting headline ("Not sure where to start?"), what they'll get and a Start button.
2. 5 to 7 friendly questions written for ${le(e)}, about ${q(e).quiz}.
3. A personalized result: the 1 or 2 services from their real service list that fit best, why, what to expect and a photo-style card for each. Only recommend services that are in the details above.
4. Save the lead (below), then a clear next step: book a consultation or call.

${K}

${Y(e)}

${R}
- For anything medical or health related, keep results general ("worth asking about at your consultation") and never say someone is or isn't a candidate.`}function fe(e,t){return`Build an interactive assessment (a short scorecard) for this business that they can promote in ads and on social to capture leads. Visitors answer questions, get a score with personalized recommendations, and are invited to book.

${j(e)}

THE EXPERIENCE
1. A landing screen with a curiosity headline${q(e).score?` (for example "${q(e).score.headline}")`:``}: a question their customers would want answered about themselves, written for ${le(e)}.
2. 8 to 10 quick questions across 3 or 4 categories${q(e).score?` (for example ${q(e).score.categories})`:``}, each answer scoring points.
3. The result: an overall score out of 100, a score per category with a simple bar, the biggest area to work on and 3 practical recommendations. Make the scoring correct and test it.
4. Show the full results on screen, save the lead (below) with the results, and add a button to book a consultation. No automatic emails, so nothing extra needs setting up.

${K}

${Y(e)}

${R}
- Results are general guidance, not professional advice. Say so in one short line under the score.`}function pe(e,t){return`Build an instant quote tool this business can put on its website, so customers get a price in a minute instead of waiting for a call back.

${j(e)}${G(e)}

THE EXPERIENCE
1. Pick the service.
2. Answer the questions that set the price for that service (for ${J(e)}: ${q(e).price}), with picture cards where it helps.
3. Choose add-ons, each with its price.
4. See the quote update live: base price, add-ons, total, and what's included. Make the math correct and test it.
5. "Lock in this quote": name, email, phone, preferred date, then a clear confirmation that the business will confirm the details.

SAVING QUOTES
- Save every quote with the choices, the total and the contact details.
- A private admin page (login required) listing quotes newest first, with status (New, Confirmed, Booked, Lost) and an export to CSV.
- Keep every price in one settings area the owner can edit.

${Y(e)}

${R}`}function me(e,t){return`Build a beautiful digital service menu for this business, with a "help me choose" option, so customers can browse everything they offer and send an inquiry about the right service.

${j(e)}${G(e)}

THE EXPERIENCE
1. The menu: services grouped into categories, each as a card with a short description, starting price and an "Ask about this" button. Show how long it takes only if it's in the details above. Tap a card for full details and what to expect.
2. "Help me choose": 4 or 5 quick questions that point to 1 or 2 services from the real list, with why.
3. An inquiry form that already knows which service they picked: name, email, phone, a question, preferred time.

SAVING INQUIRIES
- Save every inquiry with the service and the details.
- A private admin page (login required) listing inquiries newest first, with status (New, Replied, Booked) and an export to CSV.
- Services, descriptions and prices editable in one settings area.

${Y(e)}

${R}
- Only list services that are in the details above. If a price isn't known, show "Ask for pricing".`}function he(e,t){return`Build a booking request portal this business can put on its website and Instagram, so customers can pick a service and ask for a time without calling.

${j(e)}${G(e)}

THE EXPERIENCE
1. Pick a service from their real service list, each with its price (and how long it takes, only if it's in the details above).
2. Pick a preferred date on a calendar, then a time of day (morning, afternoon or evening). Only offer days and hours they're open, from the details above.
3. Contact details: name, email, phone and an optional note.
4. A clear confirmation screen: "Request sent. ${A(e.name)||`The business`} will confirm your time." with a summary of what they asked for. This is a request, not a confirmed appointment, so never say it's booked.

SAVING REQUESTS
- Save every request with the service, date, time of day and contact details.
- A private admin page (login required) listing requests by date, with status (New, Confirmed, Rescheduled, Cancelled), a simple calendar view and an export to CSV.
- Services, prices and opening hours editable in one settings area.

${Y(e)}

${R}`}function ge(e){let t=A(e.reward_notes);return t?`\n\nTHEIR REFERRAL REWARD (use this exactly)\n${t}`:`

REFERRAL REWARD
I don't know their reward yet. Use a clearly marked example ("Example: $25 off your next visit for you and your friend") that the owner can change in one place, and remind them on the admin page to set it before sharing.`}function _e(e,t){return`Build a referral program app for this business, so happy customers can share a personal link and get rewarded when friends come in.

${j(e)}${ge(e)}

THE EXPERIENCE
1. A friendly page for existing customers: what the reward is, how it works in 3 steps, and a short sign-up (name, email, phone).
2. After signing up, each customer gets their own referral link and code, with buttons to copy it, text it and share it.
3. When a friend opens that link they land on a welcome page from ${A(e.name)||`the business`} with the offer, and a short form (name, email, phone, what they're interested in). The referral is credited to the right customer automatically.
4. Customers can come back with their referral code to see how many friends they've referred and their reward status.

THE ADMIN SIDE (login required)
- Every referrer with their link, how many friends they sent and how many came in.
- Every referred friend, who sent them, and a status (New, Booked, Came in).
- Mark a reward as earned and then as given, so nobody is forgotten.
- The reward wording editable in one settings area, and an export to CSV.

${Y(e)}

${R}
- Never promise a reward the business hasn't set. Rewards are only earned after the friend comes in, unless the details above say otherwise.`}function ve(e,t){return`Build a package builder this business can put on its website, so customers can put together their own package, see the price as they go and send it in.

${j(e)}${G(e)}

THE EXPERIENCE
1. Start from 2 or 3 ready-made packages built only from their real services and prices (for example a starter, a most popular and a complete option), or start from scratch.
2. Add or remove services and extras with simple toggles and number pickers. The total updates live with a clear line-by-line breakdown. Make the math correct and test it.
3. A summary of the finished package they can review, with "Send my package" asking for name, email, phone, preferred date and a note.
4. A confirmation that the business will review the package and get back to them.

SAVING PACKAGES
- Save every package with its items, total and contact details.
- A private admin page (login required) listing packages newest first, with status (New, Quoted, Booked, Lost) and an export to CSV.
- Every service, extra and price editable in one settings area, including the ready-made packages.

${Y(e)}

${R}
- Only use services and prices from the details above. Don't invent discounts or package savings unless they're written above.`}function X(e,t){let n=A(e.price_notes);return n?`\n\nTHEIR NUMBERS (use these exactly)\n${n}`:`\n\nNUMBERS\nI don't have their numbers yet (${t}). Use sensible, clearly labeled example assumptions ("Example assumption: ...") kept in one settings area the owner can edit, show them on the page in a small "How this is worked out" note, and add a note on the admin page listing every number the owner must confirm before this goes live.`}var Z=e=>`- Under every result, one short line: "This is an estimate to help you plan, not ${e}."`;function ye(e,t){return`Build an interactive savings calculator for this business that they can promote in ads and on social to capture leads. Visitors enter what they pay today and see what they could save with this business's service.

${j(e)}${X(e,`typical costs, rates and how much their service usually saves`)}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they could save, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 4 to 6 simple questions that drive the savings for ${J(e)} (for example what they pay each month, home or space size, age of what they have now, and their zip code or area). Sliders and picture cards where it helps.
3. The result: estimated savings per month, per year and over 10 years, a simple bar chart of today vs with the service, and a short "How this is worked out" note showing the assumptions. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Get your exact savings" or "Book a free assessment".

${K}

${Y(e)}

${R}
${Z(`a quote or a guarantee`)}
- Never invent rebates, tax credits, incentives or savings percentages. Use only what's in their numbers above, or labeled example assumptions.`}function be(e,t){return`Build an interactive budget planner for this business that they can promote in ads and on social to capture leads. Visitors enter their total budget and see how to split it, then talk to the business about making it happen.

${j(e)}${X(e,`their typical costs and how budgets usually split`)}

THE EXPERIENCE
1. A short landing screen: a clear headline about planning their budget, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 3 to 5 questions that shape the plan for ${J(e)} (total budget, size or scope, priorities, timing).
3. The plan: the budget split into 5 to 8 categories with amounts and percentages, a simple chart, and sliders to move money between categories. The total always stays equal to their budget and the remaining amount updates live. Make the math correct and test it.
4. Mark which categories this business can help with (only services in the details above).
5. Save the lead (below) with their plan, then a clear next step: "Talk through your plan" or "Book a consultation".

${K}

${Y(e)}

${R}
${Z(`a quote`)}`}function xe(e,t){return`Build an interactive affordability calculator for this business that they can promote in ads and on social to capture leads. Visitors find out what they can comfortably afford, then talk to the business about next steps.

${j(e)}${X(e,`the interest rate, term, down payment and any costs to include`)}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they can afford, what they'll get, and a Start button. Show the real rating if the listing has it.
2. Inputs with sliders and number boxes: yearly income, monthly debts, down payment, interest rate and loan term (rate and term pre-filled from their numbers or labeled examples, and editable).
3. The result: a comfortable price range and the estimated monthly payment, with a simple breakdown. Use the standard loan payment formula, keep total monthly debts within a sensible share of income, and show the assumptions in a "How this is worked out" note. Make the math correct and test it with easy numbers.
4. Save the lead (below), then a clear next step: "Talk through your options" with ${A(e.name)||`the business`}.

${K}

${Y(e)}

${R}
${Z(`financial advice or a pre-approval`)}
- Never show a rate as their current rate unless it's in their numbers above. Label any example rate clearly.`}function Se(e,t){return`Build an interactive checklist for this business that they can promote in ads and on social to capture leads. Visitors tick off what they've done, see what they're missing, and get help with the rest.

${j(e)}

THE CHECKLIST
- Pick the checklist that fits ${J(e)}'s customers best (for example a business expense checklist for an accountant, a move-out checklist for a cleaner, a planning checklist for a wedding planner, a pre-listing checklist for a realtor). Use the title as the headline.
- 15 to 25 practical items in 3 to 5 groups, each with a one-line tip. Only general, widely true advice.

THE EXPERIENCE
1. A short landing screen: the checklist title, who it's for, what they'll get, and a Start button. Show the real rating if the listing has it.
2. The checklist: tap to tick items, a progress bar, and each group shows how many are done.
3. The result: what they've covered, the items they missed with their tips, and which ones ${A(e.name)||`the business`} can help with (only services in the details above).
4. Save the lead (below), then show a clean printable version (a "Print or save as PDF" button) and a clear next step: "Get help with the rest".

${K}

${Y(e)}

${R}
- Keep tips general. Nothing that reads as legal, tax, medical or financial advice for their situation.`}function Ce(e,t){return`Build a personalized plan generator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get their own simple plan, then book with the business to go further.

${j(e)}

THE PLAN
- Pick the plan that fits ${J(e)}'s customers best (for example a 4-week workout plan for a gym or trainer, a morning and evening routine for a skin care business, a 12-month lawn care calendar for a landscaper, a weekly cleaning schedule for a cleaner). Use it as the headline.
- Build the plan from fixed rules in the app (no AI calls), so it costs nothing each time someone uses it. Write the building blocks yourself, matched to each combination of answers.

THE EXPERIENCE
1. A short landing screen: a clear headline about getting their own plan, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 questions (goal, starting point, time they have, preferences, anything to avoid).
3. Their plan: laid out week by week or step by step, clearly personalized to their answers, with where ${A(e.name)||`the business`} can help (only services in the details above).
4. Save the lead (below), then show a printable version ("Print or save as PDF") and a clear next step: "Book a session" or "Get help with your plan".

${K}

${Y(e)}

${R}
- Keep it general and safe. For anything health related, add one short line: "Check with a professional before starting something new."`}var we=[{id:`estimator`,usesIndustry:!0,label:`Cost estimator`,title:`Cost estimator`,what:`Visitors answer a few questions and get a price range, then request an exact quote. Every answer is saved as a lead.`,when:`Great for dentists, roofers, landscapers, cleaners, solar, wedding planners. Anyone whose customers ask "how much?" first.`,prompt:ue,usesPrices:!0,checks:[`Test the price math with a few answers`,`Every price is the owner's, or marked as an example`,`It says final pricing is confirmed later`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`quiz`,usesIndustry:!0,label:`Finder quiz`,title:`Service finder quiz`,what:`A friendly quiz that recommends the right service from their real menu, then invites them to book.`,when:`Great for med spas, salons, photographers, studios, interior designers.`,prompt:de,checks:[`It only recommends services they really offer`,`Health topics stay general`,`Every answer leads to a result`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`assessment`,usesIndustry:!0,label:`Assessment`,title:`Score assessment`,what:`A short scorecard with a score out of 100, category scores and three recommendations, then a booking button.`,when:`Great for coaches, fitness studios, dentists, home services, accountants.`,prompt:fe,checks:[`Test the scoring with all-low and all-high answers`,`Recommendations make sense for each result`,`It says it's general guidance`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`savings`,label:`Savings calculator`,title:`Savings calculator`,what:`Visitors enter what they pay today and see what they could save per month, per year and over 10 years.`,when:`Great for solar, HVAC, insulation, windows, water heaters. Anyone who saves customers money over time.`,prompt:ye,input:{field:`price_notes`,label:`Their numbers`,hint:`Optional. Without them, the build uses example assumptions you'll swap later.`,placeholder:`Average customer saves 70 to 90% on electric. System cost about $3 per watt. Local rate about 14 cents per kWh.`},checks:[`Test the math with easy numbers`,`Every assumption is theirs or labeled as an example`,`No made-up rebates or tax credits`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`budget`,label:`Budget planner`,title:`Budget planner`,what:`Visitors enter a total budget and get a split by category they can adjust, with the total always adding up.`,when:`Great for wedding and event planners, remodelers, landscapers, interior designers.`,prompt:be,input:{field:`price_notes`,label:`Their numbers`,hint:`Optional. Without them, the build uses example assumptions you'll swap later.`,placeholder:`Typical wedding: venue 40%, catering 25%, photo 10%, flowers 8%, music 7%, attire 5%, other 5%.`},checks:[`Moving a slider keeps the total equal to the budget`,`Every split is theirs or labeled as an example`,`Only real services are marked as theirs`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`affordability`,label:`Affordability`,title:`Affordability calculator`,what:`Visitors enter income, debts and a down payment and see a comfortable price range and monthly payment.`,when:`Great for realtors, mortgage lenders, car dealers, builders, anyone offering financing.`,prompt:xe,input:{field:`price_notes`,label:`Their numbers`,hint:`Optional. Without them, the build uses example assumptions you'll swap later.`,placeholder:`30-year fixed, example rate 6.5%. Include taxes and insurance at about 1.5% of price per year.`},checks:[`Test the payment with easy numbers against an online mortgage calculator`,`Any example rate is clearly labeled`,`It says it's not advice or a pre-approval`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`checklist`,label:`Checklist`,title:`Interactive checklist`,what:`A tap-to-tick checklist with progress, the items they missed with tips, and a printable copy.`,when:`Great for accountants, cleaners, movers, wedding planners, realtors, contractors.`,prompt:Se,checks:[`Every tip is general and true`,`Missed items show with their tips`,`Print or save as PDF works`,`A test lead shows up on the admin page`,`It looks good on your phone`]},{id:`plan`,label:`Personalized plan`,title:`Personalized plan`,what:`Visitors answer a few questions and get their own week-by-week plan, built without AI so it costs nothing per use.`,when:`Great for trainers, gyms, skin care, lawn care, cleaners, nutrition and wellness coaches.`,prompt:Ce,checks:[`Different answers give different plans`,`It's general and safe, with the check-with-a-pro line if health related`,`Print or save as PDF works`,`A test lead shows up on the admin page`,`It looks good on your phone`]}],Te=[{id:`quote`,usesIndustry:!0,label:`Instant quote`,title:`Instant quote generator`,what:`Customers pick a service, answer questions, add extras and see their price live, then lock it in.`,when:`Great for cleaning, landscaping, painting, mobile detailing, photography.`,prompt:pe,usesPrices:!0,checks:[`The prices match what the owner approved`,`Totals add up with add-ons`,`A test quote shows up on the admin page`,`The owner can edit prices in one place`,`It looks good on your phone`]},{id:`menu`,label:`Service menu`,title:`Service menu and finder`,what:`A beautiful menu of everything they offer, a "help me choose" quiz and an inquiry form that knows which service they picked.`,when:`Great for salons, med spas, spas, studios, photographers.`,prompt:me,usesPrices:!0,checks:[`Every service is real`,`Unknown prices say "Ask for pricing"`,`Each "Ask about this" fills in the form`,`A test inquiry shows up on the admin page`,`It looks good on your phone`]},{id:`booking`,label:`Booking portal`,title:`Booking request portal`,what:`Customers pick a service, a date and a time of day, and send a booking request the business confirms.`,when:`Great for salons, photographers, trainers, cleaners, studios. Anyone still booking by phone or DM.`,prompt:he,usesPrices:!0,checks:[`Only real services and prices`,`Only days and hours they're open`,`It says "request", never "booked"`,`A test request shows up on the admin page`,`It looks good on your phone`]},{id:`referral`,label:`Referral program`,title:`Referral program`,what:`Happy customers get their own share link, friends sign up through it, and the business tracks who earned a reward.`,when:`Great for salons, cleaners, fitness studios, photographers, med spas. Any business that grows by word of mouth.`,prompt:_e,input:{field:`reward_notes`,label:`Their referral reward`,hint:`Optional. Without it, the build uses an example reward you'll swap later.`,placeholder:`$25 off for you and your friend after their first visit.`},checks:[`The reward is theirs, or marked as an example`,`Two test sign-ups get different links`,`A friend through a link is credited to the right person`,`Rewards can be marked earned and given`,`It looks good on your phone`]},{id:`package`,label:`Package builder`,title:`Package builder`,what:`Customers build their own package from real services and extras, watch the total update and send it in.`,when:`Great for photographers, event planners, caterers, cleaners, designers, salons.`,prompt:ve,usesPrices:!0,checks:[`Every service and price is real`,`Totals add up as items change`,`No made-up package discounts`,`A test package shows up on the admin page`,`It looks good on your phone`]}],Ee=[{id:`website`,label:`Website`,title:`Preview website`,what:`A redesigned one-page website built from their real details.`,when:`Best when their website is outdated, slow or missing.`,prompt:e=>h(e),checks:[`The name, phone, address and hours are right`,`Every review is real and word for word`,`No made-up prices, awards or numbers`,`No fake names or reviews next to the people in photos`,`It looks good on your phone`]},{id:`audit`,label:`Marketing audit`,title:`Marketing audit deck`,what:`A polished presentation of what's working, three opportunities and a 30-day plan.`,when:`Best after you've run the AI Lead Analyzer, so every finding is real.`,prompt:V,checks:[`Every finding is something you actually saw`,`Anything unconfirmed is written as a question`,`Their rating and review count are exact`,`It sounds helpful, not like a list of what's wrong`,`Your name and contact are on the last slide`],needsAnalysis:!0},{id:`adplan`,label:`Ad strategy proposal`,title:`Meta ads proposal deck`,what:`A polished Facebook and Instagram ads plan: the offer, three sample ads, budget, industry benchmarks and the first 30 days.`,when:`Best when you pitch ad management, especially to businesses that aren't running ads or are boosting posts.`,prompt:H,checks:[`Every number is an industry benchmark with its source, not a promise`,`The offer is marked as a suggestion to confirm`,`Before-and-afters use the client's real photos before it goes to them`,`It says the ad budget is paid to Meta`,`Your name and contact are on the last slide`]},{id:`instagram`,label:`Instagram makeover`,title:`Instagram makeover deck`,what:`A new bio in a profile mockup, content pillars, a 9-post grid and sample captions.`,when:`Best for salons, med spas, studios and anyone posting rarely or inconsistently.`,prompt:U,checks:[`The bio is under 150 characters`,`No made-up follower counts or results`,`No fake names, reviews or results on the posts`,`Sample content is labeled as sample`,`The captions sound like the business`]},{id:`landing`,label:`Landing page`,title:`Sample landing page`,what:`A focused page for one offer, ready for ads or social, with a working form.`,when:`Best when they run ads or promos that send people to their homepage.`,prompt:W,checks:[`The offer is real or clearly a suggestion`,`No made-up discounts or prices`,`The form and thank-you message work`,`The button is the same everywhere`,`It looks good on your phone`]},{id:`calculator`,label:`Revenue calculator`,title:`Revenue calculator`,what:`An interactive calculator, branded for them, showing what better marketing could be worth.`,when:`Best for appointment-based businesses with a clear price per customer.`,prompt:oe,checks:[`Test the math with easy numbers (100 leads, 50%, 50%, 50%, $100 = $1,250)`,`Example numbers are labeled as examples`,`It says it's an estimate, not a promise`,`The sliders work on your phone`,`Your contact button works`]}],De=[{id:`get`,label:`Builds to get clients`,short:`Get clients`,intro:`Make something for a business you want to work with, then send them the link.`,builds:Ee},{id:`magnets`,label:`Lead magnets for clients`,short:`Lead magnets`,intro:`Build something a business can promote in ads and on social to bring in leads.`,builds:we},{id:`sell`,label:`Builds to sell to clients`,short:`Sell to clients`,intro:`Build a tool a business's customers use, and sell it as part of your service.`,builds:Te}],Q=[...Ee,...we,...Te],Oe=e=>Q.find(t=>t.id===e)||Q[0];function ke(e){let t=[],n=e.builds||{};return Q.forEach(r=>{let i=A(n[r.id]?.url)||(r.id===`website`?A(e.preview_url):``);i&&t.push({id:r.id,title:r.title,url:i})}),t}var $=a();function Ae({label:e=`What is this?`,src:t,alt:n,children:r}){let[i,a]=(0,p.useState)(!1);return(0,$.jsxs)(`span`,{className:`hg`,onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[(0,$.jsx)(`button`,{type:`button`,className:`lp-link hg-link`,onClick:()=>a(e=>!e),"aria-expanded":i,children:e}),i&&(0,$.jsxs)(`span`,{className:`hg-pop`,role:`dialog`,"aria-label":n,children:[(0,$.jsx)(`img`,{src:t,alt:n,width:`360`,height:`220`}),r&&(0,$.jsx)(`span`,{className:`hg-text`,children:r})]})]})}function je({prospect:e,offer:a,builds:o,onUpdated:c,canSave:l=!0}){let{profile:u}=ee(),[d,f]=(0,p.useState)(o[0].id),[m,h]=(0,p.useState)(e.preview_source||``),[g,y]=(0,p.useState)(e.price_notes||``),[b,x]=(0,p.useState)(e.reward_notes||``),[S,C]=(0,p.useState)(e.build_industry||``),[w,T]=(0,p.useState)(!1),[E,D]=(0,p.useState)(``),[O,k]=(0,p.useState)(!1),A=o.find(e=>e.id===d)?Oe(d):o[0],j=(e.builds||{})[A.id]?.url||(A.id===`website`?e.preview_url:``)||``,[M,N]=(0,p.useState)(j);(0,p.useEffect)(()=>{o.some(e=>e.id===d)||f(o[0].id)},[o]),(0,p.useEffect)(()=>{N(j),k(!1),T(!1)},[A.id,e.id]),(0,p.useEffect)(()=>{h(e.preview_source||``),y(e.price_notes||``),x(e.reward_notes||``),C(e.build_industry||``)},[e.id]);let P={name:ne(u||{}),service:a?re(a):``,email:u?.email||u?.created_by||``},F=[e.name,e.address||e.location].filter(Boolean).join(` `),I=e.name?`https://www.google.com/search?q=${encodeURIComponent(F)}`:``,L=S||ie({...e,preview_source:m}),R=A.prompt({...e,preview_source:m,price_notes:g,reward_notes:b,build_industry:L},P),z=e=>{C(e),U({build_industry:e})},B=async e=>{try{await navigator.clipboard.writeText(e.text),D(e.title),setTimeout(()=>D(``),2200)}catch{}},V=ae[A.id]||[],H=e.analysis?.source===`claude`,U=async t=>{if(!(!l||!e.id))try{c?.(await s.entities.Prospect.update(e.id,t))}catch{}},W=()=>{let t={};m!==(e.preview_source||``)&&(t.preview_source=m),g!==(e.price_notes||``)&&(t.price_notes=g),b!==(e.reward_notes||``)&&(t.reward_notes=b),Object.keys(t).length&&U(t)};return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`div`,{className:`lp-tabs pv-tabs`,role:`tablist`,"aria-label":`Builds`,children:o.map(t=>{let n=!!((e.builds||{})[t.id]?.url||t.id===`website`&&e.preview_url);return(0,$.jsxs)(`button`,{type:`button`,role:`tab`,"aria-selected":A.id===t.id,className:`lp-tab`,onClick:()=>f(t.id),children:[t.label,n&&(0,$.jsx)(i,{className:`pv-done`})]},t.id)})}),(0,$.jsxs)(`div`,{className:`lp-body`,children:[(0,$.jsxs)(`div`,{className:`pv-intro`,children:[(0,$.jsx)(`strong`,{children:A.title}),(0,$.jsx)(`span`,{children:A.what}),(0,$.jsx)(`em`,{children:A.when})]}),(0,$.jsxs)(`ol`,{className:`pv-steps`,children:[(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`Paste their Google listing`}),` `,(0,$.jsx)(`span`,{className:`lp-meta`,children:`Optional, used by every build`}),I&&(0,$.jsxs)(`a`,{className:`lp-link hg-open`,href:I,target:`_blank`,rel:`noreferrer`,children:[`Open their Google listing `,(0,$.jsx)(n,{})]}),(0,$.jsx)(Ae,{src:te(`/help/google-listing.gif`),alt:`How to copy a Google business listing`,children:`Google the business, highlight everything in the profile on the right (name, rating, address, hours, reviews), copy it and paste it here.`}),(0,$.jsx)(`p`,{children:`Their business profile on Google: rating, hours, services, reviews and description.`}),(0,$.jsx)(`textarea`,{className:`textarea`,rows:3,value:m,onChange:e=>h(e.target.value),onBlur:W,placeholder:`5.0 · 121 Google reviews · Dentist in Tustin… paste it all here`}),(A.usesPrices||A.input?.field===`price_notes`)&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`pv-sub`,children:[(0,$.jsx)(`strong`,{children:A.input?.label||`Their prices`}),` `,(0,$.jsx)(`span`,{className:`lp-meta`,children:A.input?.hint||`Optional. Without them, the build uses example prices you'll swap later.`})]}),(0,$.jsx)(`textarea`,{className:`textarea`,rows:3,value:g,onChange:e=>y(e.target.value),onBlur:W,placeholder:A.input?.placeholder||`Standard clean: $140 for up to 2 bedrooms, +$30 per extra bedroom. Deep clean: +$80. Inside fridge: +$35.`})]}),A.input?.field===`reward_notes`&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`pv-sub`,children:[(0,$.jsx)(`strong`,{children:A.input.label}),` `,(0,$.jsx)(`span`,{className:`lp-meta`,children:A.input.hint})]}),(0,$.jsx)(`textarea`,{className:`textarea`,rows:2,value:b,onChange:e=>x(e.target.value),onBlur:W,placeholder:A.input.placeholder})]}),A.usesIndustry&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`pv-sub`,children:[(0,$.jsx)(`strong`,{children:`Their industry`}),` `,(0,$.jsx)(`span`,{className:`lp-meta`,children:`Sets which questions it asks. We guessed from the business type.`})]}),(0,$.jsxs)(`select`,{className:`input pv-select`,value:L,onChange:e=>z(e.target.value),"aria-label":`Their industry`,children:[_.map(e=>(0,$.jsx)(`option`,{value:e.id,children:e.label},e.id)),(0,$.jsx)(`option`,{value:v.id,children:v.label})]})]})]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`Copy the prompt and build it in Base44`}),(0,$.jsx)(`p`,{children:`Create a new app in Base44, paste this and send. When it's done, click Publish at the top right to get the link.`}),A.needsAnalysis&&!H&&(0,$.jsx)(`p`,{className:`pv-warn`,children:`Run the AI Lead Analyzer first so the audit is built on what you actually found. Without it, every opportunity becomes a question.`}),(0,$.jsxs)(`div`,{className:`pv-do`,children:[(0,$.jsxs)(`div`,{className:`pv-do-step`,children:[(0,$.jsx)(`span`,{className:`pv-do-n`,children:`1`}),(0,$.jsxs)(`button`,{type:`button`,className:`lp-btn-outline`,onClick:async()=>{W();try{await navigator.clipboard.writeText(R),T(!0),setTimeout(()=>T(!1),2200)}catch{}},children:[w?(0,$.jsx)(i,{}):(0,$.jsx)(r,{}),` `,w?`Copied`:`Copy the ${A.label.toLowerCase()} prompt`]})]}),(0,$.jsx)(t,{className:`pv-do-arrow`,"aria-hidden":`true`}),(0,$.jsxs)(`div`,{className:`pv-do-step`,children:[(0,$.jsx)(`span`,{className:`pv-do-n`,children:`2`}),(0,$.jsxs)(`a`,{className:`pv-do-open`,href:`https://app.base44.com`,target:`_blank`,rel:`noreferrer`,children:[`Open Base44 and paste `,(0,$.jsx)(n,{})]})]})]}),(0,$.jsx)(`button`,{type:`button`,className:`pv-see`,onClick:()=>k(e=>!e),"aria-expanded":O,children:O?`Hide the prompt`:`See the prompt`}),O&&(0,$.jsx)(`pre`,{className:`pv-pre`,children:R})]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`Check it before you send it`}),(0,$.jsx)(`ul`,{className:`pv-checks`,children:A.checks.map(e=>(0,$.jsx)(`li`,{children:e},e))})]}),V.length>0&&(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`Make it better`}),` `,(0,$.jsx)(`span`,{className:`lp-meta`,children:`Optional`}),(0,$.jsx)(`p`,{children:`Paste any of these into the same Base44 app, one at a time. If one ends in a colon, paste your link, ID or prices right after it.`}),(0,$.jsx)(`ul`,{className:`pv-tips`,children:V.map(e=>(0,$.jsxs)(`li`,{children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`b`,{children:e.title}),(0,$.jsx)(`span`,{children:e.text})]}),(0,$.jsxs)(`button`,{type:`button`,className:`lp-link pv-tip-copy`,onClick:()=>B(e),children:[E===e.title?(0,$.jsx)(i,{}):(0,$.jsx)(r,{}),` `,E===e.title?`Copied`:`Copy`]})]},e.title))})]}),l&&(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`Save the link`}),(0,$.jsx)(`p`,{children:`Paste the published link so it's ready when you write your message.`}),(0,$.jsxs)(`div`,{className:`pv-url`,children:[(0,$.jsx)(`input`,{className:`input`,value:M,onChange:e=>N(e.target.value),onBlur:()=>{let t=M.trim();if(t===j)return;let n={...e.builds||{},[A.id]:{url:t,saved_at:new Date().toISOString()}};U(A.id===`website`?{builds:n,preview_url:t}:{builds:n})},placeholder:`https://`,"aria-label":`${A.title} link`}),j&&(0,$.jsxs)(`a`,{className:`lp-link`,href:j,target:`_blank`,rel:`noreferrer`,children:[`Open it `,(0,$.jsx)(n,{})]})]})]})]})]})]})}export{De as n,ke as r,je as t};