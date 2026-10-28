# Freelance HQ 3.0.0: install the HQ

This repository is a finished, tested app. Copy its HQ into this Base44 app exactly, in one go. The AI tools are added later, one at a time, from inside the app.

## Rules (follow every one)

- Copy, don't build. Don't plan, design, redesign, improve, simplify, rename, merge or split anything.
- For every file below: open its link and create the file at exactly that path with exactly that content, character for character. If the file already exists, replace it.
- Never write your own version of a file, never summarize one, and never leave one out. If a file is long, keep going until it's complete.
- Don't create files that aren't listed, and don't change any other file in the app.
- Write each file once and move on. Don't re-check files, compute hashes or test between files. The app's Setup check does that.
- Copy all the files in one go with your bulk copy or download step (asking me to approve it once is fine), not one by one.
- This is one job. Keep going until every listed file is written. Don't stop partway to ask me to continue.
- If a link doesn't load, stop and tell me which one. Never write your own version of a file instead.
- Never create, change or delete any data records, and never run clean-ups or migrations on data. Only write the files listed here.
- Don't ask me any questions and don't suggest extra features. Just do the steps below.
- Spacing and line breaks don't matter. Images load from the internet by themselves; don't create image files.

## Setup

Install every package listed in the template's package.json. Keep this app's own package.json, vite.config.js and other setup files (only add missing packages). For reference:

- package.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/package.json
- vite.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/vite.config.js
- jsconfig.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/jsconfig.json
- postcss.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/postcss.config.js
- components.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/components.json

If this app has no index.html in its root folder, create it exactly from https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/index.html.

## Files

- tailwind.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/tailwind.config.js
- base44/entities/AdCampaign.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/AdCampaign.jsonc
- base44/entities/ContentPlan.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/ContentPlan.jsonc
- base44/entities/FreelancerProfile.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/FreelancerProfile.jsonc
- base44/entities/Offer.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/Offer.jsonc
- base44/entities/Prospect.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/Prospect.jsonc
- base44/entities/User.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/base44/entities/User.jsonc
- src/components/ui/use-toast.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ui/use-toast.jsx
- src/components/brand/icons.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/brand/icons.jsx
- src/lib/utils.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/utils.js
- src/components/ui/toast.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ui/toast.jsx
- src/components/ui/toaster.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ui/toaster.jsx
- src/lib/query-client.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/query-client.js
- src/lib/app-params.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/app-params.js
- src/api/base44Client.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/api/base44Client.js
- src/lib/PageNotFound.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/PageNotFound.jsx
- src/lib/AuthContext.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/AuthContext.jsx
- src/components/UserNotRegisteredError.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/UserNotRegisteredError.jsx
- src/components/ScrollToTop.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ScrollToTop.jsx
- src/components/shared/Skeleton.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/Skeleton.jsx
- src/components/ProtectedRoute.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ProtectedRoute.jsx
- src/lib/ProfileContext.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/ProfileContext.jsx
- src/lib/version.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/version.js
- src/lib/assets.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/assets.js
- src/lib/constants.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/constants.js
- src/components/AppLayout.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/AppLayout.jsx
- src/components/shared/ToolHero.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/ToolHero.jsx
- src/components/shared/CopyButton.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/CopyButton.jsx
- src/components/BuildTool.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/BuildTool.jsx
- src/lib/tools.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/tools.js
- src/App.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/App.jsx
- src/lib/brandStyles.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/brandStyles.js
- src/lib/theme.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/theme.js
- src/main.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/main.jsx
- src/index.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/index.css
- src/components/shared/Form.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/Form.jsx
- src/components/ui/input.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/ui/input.jsx
- src/components/AuthLayout.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/AuthLayout.jsx
- src/components/GoogleIcon.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/GoogleIcon.jsx
- src/lib/authReturnTo.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/authReturnTo.js
- src/pages/Login.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/Login.jsx
- src/pages/Register.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/Register.jsx
- src/pages/ForgotPassword.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/ForgotPassword.jsx
- src/pages/ResetPassword.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/ResetPassword.jsx
- src/components/shared/WizardShell.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/WizardShell.jsx
- src/components/shared/SelectableCard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/SelectableCard.jsx
- src/components/shared/IncomeGoalInput.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/IncomeGoalInput.jsx
- src/pages/Onboarding.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/Onboarding.jsx
- src/components/shared/UpdateBanner.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/UpdateBanner.jsx
- src/lib/leadStatus.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/leadStatus.js
- src/components/brand/gradientIcons.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/brand/gradientIcons.jsx
- src/pages/Dashboard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/Dashboard.jsx
- src/components/shared/PageHeader.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/components/shared/PageHeader.jsx
- src/pages/Profile.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/Profile.jsx
- src/lib/copyCheck.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/lib/copyCheck.js
- src/pages/SetupCheck.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v3.0.0/src/pages/SetupCheck.jsx

## Finish

- Data entities: make sure each entity's stored schema in this app matches its base44/entities file exactly (re-register it from the file if it's older or different).
- A new Base44 app already has some of these files (for example src/lib/app-params.js, src/api/base44Client.js and the files in src/components/ui). Replace the listed ones with the repo's version anyway.
- If this app uses Base44's newer app setup and the preview can't load these files, add the small bridge its setup needs so src/main.jsx and src/App.jsx run. Only change setup files that aren't listed above.
- Last step: open the preview once and confirm it shows the Welcome screen. Don't run any other checks or tests. Then reply with exactly this and stop: "Your Freelance HQ is ready. Answer the 3 setup questions in the preview, then open Offer Builder."
