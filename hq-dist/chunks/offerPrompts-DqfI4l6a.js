import{_ as e,c as t,d as n,f as r,h as i,r as a,u as o}from"./offerData-BfuT1Kmy.js";import{r as s}from"./copyVoice-C9naJ-H9.js";var c=`FRAMING
- Frame the freelancer's future clients as real, successful businesses that want to grow. Never as struggling or broken businesses that need rescuing.
- Never condescending. Always in their corner.
- Do not use em dashes or en dashes. Use commas or periods.

${s(`member`)}

HONESTY
- Never invent credentials, years of experience, past clients, testimonials, or results.
- Never promise results. Describe what the service is designed to help with.
- Do not write any prices, dollar amounts, or percentages. Prices are added by the app.
- This is a recommended starting offer the freelancer will review and customize.`;function l(e){return e===`has_clients`?`They have had at least one paying client. Do not invent specific results, numbers, or client names. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it.`:e===`no_clients`?`They have practiced the skill but have no paying clients yet. Do not invent past clients or results. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it.`:`They are brand new and still learning the skill. Do not invent past clients, results, or experience. Keep everything extra simple. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it.`}function u(e){let n=i(e),r=(e.interested_services||[]).filter(t=>t!==e.primary_service&&(e.primary_service!==`combined`||t!==`meta_ads`&&t!==`organic_social`)).map(n=>n===`other`?e.custom_service_name||`another service`:t[n]?.label).filter(Boolean),a=`Main service: ${n}.`;return e.primary_service===`other`&&e.custom_service_details&&(a+=` Their description: "${e.custom_service_details}".`),r.length&&(a+=` They are also interested in: ${r.join(`, `)}. Do NOT add those to the package. You may mention once, in your_fit, that they could add one later.`),a}function d(e){return e.categories.map(e=>`${e.name}: ${e.items.join(`; `)}`).join(` | `)}var f={type:`string`},p={type:`array`,items:f},m={type:`object`,properties:{package_name:f,categories:{type:`array`,items:{type:`object`,properties:{name:f,items:p},required:[`name`,`items`]}},not_included:p},required:[`package_name`,`categories`,`not_included`]};function h({includePackage:e,includeRefineFields:t}){let n={positioning:{type:`object`,properties:{summary:f,client_thinking:f,they_dont_want:p,they_need:f,your_fit:f},required:[`summary`,`client_thinking`,`they_dont_want`,`they_need`,`your_fit`]},selling:{type:`object`,properties:{plain_explanation:f,layers:{type:`array`,items:{type:`object`,properties:{name:f,text:f},required:[`name`,`text`]}},i_help:p},required:[`plain_explanation`,`layers`,`i_help`]},offer:{type:`object`,properties:{name_options:{type:`array`,items:{type:`object`,properties:{name:f,why:f},required:[`name`,`why`]}},recommended_name:f,statement:f,method:{type:`object`,properties:{name:f,steps:{type:`array`,items:{type:`object`,properties:{name:f,text:f},required:[`name`,`text`]}}},required:[`name`,`steps`]}},required:[`name_options`,`recommended_name`,`statement`,`method`]},talk:{type:`object`,properties:{bio_line:f,one_sentence:f,spoken_30s:f},required:[`bio_line`,`one_sentence`,`spoken_30s`]},paper:{type:`object`,properties:{tagline:f,who_its_for:f,description:f,next_step:f},required:[`tagline`,`who_its_for`,`description`,`next_step`]},skills_note:f,terms:{type:`array`,items:{type:`object`,properties:{term:f,meaning:f},required:[`term`,`meaning`]}}};return e&&(n.package=m),t&&(n.price={type:`number`},n.change_summary=f),{type:`object`,properties:n,required:Object.keys(n)}}var g=`WHAT TO WRITE (fill every field)

WHO IS SPEAKING (follow exactly)
- positioning: you (the strategist) talking TO the freelancer ABOUT her future clients. Refer to clients in third person ("Med spa owners want..."). Never write "I help" here, and never address the business owner as "you".
- selling: the freelancer describing her own service in first person ("I set up...", "I help med spas..."). Refer to clients in third person. Never address the business owner as "you".
- offer.statement and offer.method: describe the service in third person or first person ("I set up..."), never addressing the business owner as "you".
- talk: the freelancer speaking out loud in first person. In spoken_30s she is talking to a business owner, so "you" is fine there.
- paper: client-facing. Speak to the business owner as "you" and "your business".

positioning
- summary: 2 sentences on who they help and what those businesses usually want.
- client_thinking: what this business owner is quietly thinking, in their own words, as a short quote (1 to 2 sentences).
- they_dont_want: 3 short things this business owner does NOT want from a freelancer.
- they_need: 1 to 2 sentences on what they actually need.
- your_fit: 2 sentences speaking to the freelancer as "you": why this service fits these clients, and what makes her a good choice (use what she wrote about herself if given; otherwise focus on care, focus, and consistency, never on invented experience).

selling
- plain_explanation: 2 sentences, the freelancer explaining her service to a friend in first person.
- layers: exactly 3, in this order and with these names: "What you do", "What the client gets", "What it helps improve". One sentence each.
- i_help: 3 statements that each start with "I help" and name the type of business. Under 20 words each.

offer
- name_options: exactly 3 simple, clear offer names (2 to 5 words, no puns). Each with one short "why".
- recommended_name: one of the 3 names, exactly as written.
- statement: 2 sentences. For [type of business] who wants [what they want]. Plain and confident.
- method: a simple name for how they work (for example "The Steady Growth Method") and exactly 3 steps, each with a short name and one sentence. Steps must match the package (for example: set up, create, review and improve).

talk
- bio_line: one line for an Instagram or LinkedIn bio. Under 15 words.
- one_sentence: "I help [type of business] [do what] so they can [result]." Under 30 words.
- spoken_30s: how they would explain it out loud on a call, about 70 words, natural and relaxed.

paper (this goes on a client-facing one-page document)
- tagline: under 10 words.
- who_its_for: one sentence starting "For".
- description: 2 sentences, under 45 words, about what the service does for the business.
- next_step: one friendly sentence inviting the business to reach out. No contact details.

skills_note: if the service is not Paid Ads, Social Media & Content, or both together, 1 to 2 sentences naming the skills or training they will need before delivering it, because the SheFreelances course does not cover it. Otherwise an empty string.

terms: up to 4 marketing terms used anywhere above that a beginner may not know, each with a plain meaning under 12 words. Empty list if none.`;function _(t,n){let i=t.primary_service===`other`,s=o[t.primary_service],f=(t.about_me||``).trim(),p=i?`PACKAGE: Also create a small, beginner-level monthly package for this service in "package": a package_name, 3 or 4 categories with 1 to 3 items each (be specific, include quantities where it helps), and 4 to 5 things not included (always include "Guaranteed results"). Do not make it bigger than one beginner can deliver alone.`:`PACKAGE (already decided, do not change it): ${s.package_name}. ${d(s)}. Write everything so it matches this package exactly. Do not add services.`;return{prompt:`You are the offer strategist inside SheFreelances AI. You help a beginner freelancer turn simple choices into a clear, professional, beginner-level offer.

THE FREELANCER
- Name: ${r(n)||`the freelancer`}
- Experience: ${a[t.experience_level]?.label||`Brand new`}. ${l(t.experience_level)}
- ${u(t)}
- Who they want to help: ${e(t)}${t.niche_is_broad?` (a broad group by choice. Keep the offer broad: use 2 or 3 concrete example business types to make it feel real, but do not narrow it to one niche)`:``}
- About them, in their own words (may be empty): "${f}"

${p}

${g}

${c}`,response_json_schema:h({includePackage:i,includeRefineFields:!1})}}function v(t,r,i){let o={positioning:t.record.positioning,selling:t.record.selling,offer:t.record.offer,talk:t.record.talk,paper:t.record.paper,skills_note:t.record.skills_note,terms:t.record.terms,package:t.package,price:t.price};return{prompt:`You are the offer strategist inside SheFreelances AI. A beginner freelancer has an offer and wants a change.

THE FREELANCER
- Experience: ${a[t.experience_level]?.label||`Brand new`}. ${l(t.experience_level)}
- ${u(t)}
- Who they help: ${e(t)}

CURRENT OFFER (JSON):
${JSON.stringify(o)}

THEIR REQUEST: "${i}"

RULES
- Return the COMPLETE offer in the same structure, with the change applied everywhere it matters.
- Change only what the request needs. Keep everything else exactly as it is.
- package: return the package. Only change it if the request is about what's included. Keep it beginner-level. If you remove or add items, update the method, talk, and paper text to match.
- price: return the current price (${n(t.price)} = ${t.price}) unless the request clearly asks for a different price. Never change the price on your own.
- change_summary: one or two sentences telling them what you changed.
- If the request asks for something dishonest (fake results, testimonials, guarantees), keep the offer honest and say so in change_summary.

${g}

${c}`,response_json_schema:h({includePackage:!0,includeRefineFields:!0})}}var y=[[/\belevat(e|es|ed|ing)\b/gi,`grow`],[/\bleverag(e|es|ed|ing)\b/gi,`use`],[/\bunlock(s|ed|ing)?\b/gi,`get`],[/\btransform(s|ed|ing)?\b/gi,`change`],[/\bempower(s|ed|ing)?\b/gi,`help`],[/\bsynergy\b/gi,`teamwork`],[/\bgame[- ]changer\b/gi,`big help`],[/\baligned\b/gi,`matched`]];function b(e,t){return e[0]===e[0].toUpperCase()?t[0].toUpperCase()+t.slice(1):t}function x(e){let t=String(e||``).replace(/\s*[\u2014\u2013]\s*/g,`, `).replace(/\s+,/g,`,`);for(let[e,n]of y)t=t.replace(e,e=>b(e,n));return t.trim()}function S(e){return typeof e==`string`?x(e):Array.isArray(e)?e.map(S):e&&typeof e==`object`?Object.fromEntries(Object.entries(e).map(([e,t])=>[e,S(t)])):e}function C(e){if(!e||!Array.isArray(e.categories))return null;let t=e.categories.filter(e=>e&&e.name&&Array.isArray(e.items)&&e.items.length).slice(0,4).map(e=>({name:e.name,items:e.items.slice(0,4)}));if(!t.length)return null;let n=Array.isArray(e.not_included)?e.not_included.slice(0,6):[];return n.some(e=>/guarantee/i.test(e))||n.push(`Guaranteed results`),{package_name:e.package_name||`Monthly Package`,billing:`monthly`,categories:t,not_included:n}}function w(e,t){let n=S(e),r=(n.offer?.name_options||[]).map(e=>e.name),i=r.includes(n.offer?.recommended_name)?n.offer.recommended_name:r[0]||`My Offer`,a=t.primary_service===`other`?C(n.package)||{package_name:`Monthly Package`,billing:`monthly`,categories:[],not_included:[`Guaranteed results`]}:JSON.parse(JSON.stringify(o[t.primary_service])),{package:s,...c}=n;return{record:c,package:a,selected_name:i}}function T(e,t,n){let{package:r,price:i,change_summary:a,...o}=S(e),s=/\$|\d{3,}|price|charge|cost|rate/i.test(n||``)&&Number(i)>0?Math.round(Number(i)):t.price,c=(o.offer?.name_options||[]).map(e=>e.name),l=c.includes(t.selected_name)?t.selected_name:c.includes(o.offer?.recommended_name)?o.offer.recommended_name:c[0]||t.selected_name;return{record:o,package:C(r)||t.package,price:s,selected_name:l,change_summary:a||`Updated.`}}export{T as a,w as i,v as n,x as r,_ as t};