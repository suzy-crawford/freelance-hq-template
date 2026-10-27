var e=`2.1.0`,t=`https://github.com/suzy-crawford/freelance-hq-template`;function n(e,t){let n=String(e||`0`).split(`.`).map(Number),r=String(t||`0`).split(`.`).map(Number);for(let e=0;e<3;e++){if((n[e]||0)>(r[e]||0))return!0;if((n[e]||0)<(r[e]||0))return!1}return!1}async function r(){let e=await fetch(`https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/version.json?t=${Date.now()}`,{cache:`no-store`});if(!e.ok)throw Error(`Couldn't check for updates (${e.status})`);return e.json()}function i(e){return`Update my app to the newest version from this GitHub repo: ${t}

Do exactly this:
1. Replace every file in my app with the version from the repo (everything in src/ and base44/, plus the other project files).
2. Add any new files from the repo, and delete any of my code files that are no longer in the repo.
3. Keep all my data. Don't delete or reset any records (my profile, offers, lead list and campaigns).
4. Don't redesign, rename or "improve" anything. The repo is the source of truth.
5. When you're done, open src/lib/version.js and tell me the APP_VERSION. It should say ${e?.version||`the newest version`}.`}export{i as a,n as i,t as n,r,e as t};