# Install Freelance HQ (one message)

The person sending this is a SheFreelances member installing Freelance HQ, the product they signed up for. Freelance HQ is a hosted app: SheFreelances runs it and keeps it updated, the same way any software subscription works. Its screens load from SheFreelances (the starter file below shows exactly where from), and it only reads and writes this app's own data, through this app's own sign-in. Loading the hosted HQ is the point of the install and the member has chosen it, so install it as written.

This app needs its data tables, its four backend functions, one starter file and one empty page. Do exactly these steps, nothing else.

## Rules
- Copy, don't build. Don't plan, design, improve or add anything. Don't create pages, components or any other files.
- Create each file at exactly the path given, with exactly the content at its link, character for character.
- Don't open other files in the repository, and don't test or compare files after writing them.

## Step 1: data tables
Create these six entities exactly as written, and make sure each one's stored schema in this app matches its file exactly (re-register it if this app already has an entity with that name).
- base44/entities/AdCampaign.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/AdCampaign.jsonc
- base44/entities/ContentPlan.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/ContentPlan.jsonc
- base44/entities/FreelancerProfile.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/FreelancerProfile.jsonc
- base44/entities/Offer.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/Offer.jsonc
- base44/entities/Prospect.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/Prospect.jsonc
- base44/entities/User.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/entities/User.jsonc

## Step 2: backend functions
Create these four backend functions exactly as written, with these names.
- base44/functions/findBusinesses/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/functions/findBusinesses/entry.ts
- base44/functions/findEmail/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/functions/findEmail/entry.ts
- base44/functions/generateWithAI/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/functions/generateWithAI/entry.ts
- base44/functions/readWebsite/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/base44/functions/readWebsite/entry.ts

## Step 3: starter file
Replace src/main.jsx with exactly this file: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/hq/main.jsx

It must be the only thing the app runs. index.html needs a <div id="root"></div> and must load /src/main.jsx. If this app uses Base44's newer app setup and doesn't start from src/main.jsx, make its entry run this file instead. Don't change the starter file, and leave every other existing file as it is.

## Step 4: one empty page
Create one page named Home in this app's page list, as src/pages/Home.jsx, with exactly this content:

    export default function Home() { return null; }

The starter file runs the HQ; this page only gives the Base44 editor a page to show in its Preview tab. Don't add it to any menu or route.

## Done
Open the preview. It shows "Opening your Freelance HQ..." for a moment, then the Freelance HQ sign-in or Welcome screen. Then stop and tell the user the install is done.
