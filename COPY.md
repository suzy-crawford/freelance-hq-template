# Copy instructions for Freelance HQ 2.0.0

This repository is a finished, tested app. Your job is to copy it into this Base44 app exactly, one part at a time.

## Rules (follow every one)

- Copy, don't build. Do not plan, design, redesign, improve, simplify, rename, merge or split anything.
- For every file in the part you're asked to do: open its link, and create the file at exactly that path with exactly that content, character for character.
- Never write your own version of a file, never summarize a file, and never leave a file out. If a file is long, keep going until it's complete.
- Don't create files that aren't listed, and don't change files from other parts.
- Only do the part the user asks for, then stop and say which files you created.
- The data entities are in base44/entities and the backend functions are in base44/functions. Create them exactly as written.
- Images load from the internet by themselves. Don't create or download image files.
- Spacing, line breaks and a missing final newline don't matter (the check ignores them), and Base44 reformatting entity files is fine. Don't spend time on those.
- Don't compare or re-check files after writing them, and don't test the app between parts. The app's Copy check does all of that at the end, so extra checking only uses up credits.

There are 8 parts. After the last part, the user opens Settings, then Check my setup. Its Copy check compares every file with this list and names any file that isn't an exact copy.

## Part 1

First make sure these setup files match (install every package listed in package.json):

- package.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/package.json
- vite.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/vite.config.js
- jsconfig.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/jsconfig.json
- postcss.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/postcss.config.js
- components.json: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/components.json

Then create these files:

- tailwind.config.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/tailwind.config.js
- base44/entities/AdCampaign.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/AdCampaign.jsonc
- base44/entities/ContentPlan.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/ContentPlan.jsonc
- base44/entities/FreelancerProfile.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/FreelancerProfile.jsonc
- base44/entities/Offer.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/Offer.jsonc
- base44/entities/Prospect.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/Prospect.jsonc
- base44/entities/User.jsonc: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/entities/User.jsonc
- base44/functions/findBusinesses/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/functions/findBusinesses/entry.ts
- base44/functions/findEmail/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/functions/findEmail/entry.ts
- base44/functions/generateWithAI/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/functions/generateWithAI/entry.ts
- base44/functions/readWebsite/entry.ts: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/base44/functions/readWebsite/entry.ts
- src/api/base44Client.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/api/base44Client.js
- src/brand/app.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/app.css
- src/brand/brand2-1.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/brand2-1.css
- src/brand/brand2-2.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/brand2-2.css

## Part 2

- src/brand/brand2-3.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/brand2-3.css
- src/brand/brand2-4.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/brand2-4.css
- src/brand/kit2/components.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/kit2/components.css
- src/brand/kit2/tokens.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/kit2/tokens.css
- src/brand/tokens.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/brand/tokens.css
- src/hooks/use-mobile.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/hooks/use-mobile.jsx
- src/hooks/use-size.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/hooks/use-size.jsx
- src/lib/adsAngleLibrary.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsAngleLibrary.js
- src/lib/adsBuilder.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsBuilder.js
- src/lib/adsCards.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsCards.js
- src/lib/adsClaudePrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsClaudePrompts.js
- src/lib/adsCreative.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsCreative.js
- src/lib/adsData.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsData.js

## Part 3

- src/lib/adsEngine.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsEngine.js
- src/lib/adsHeadlines.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsHeadlines.js
- src/lib/adsLaunch.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsLaunch.js
- src/lib/adsMasterPrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsMasterPrompts.js
- src/lib/adsNiches.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsNiches.js
- src/lib/adsPrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/adsPrompts.js
- src/lib/app-params.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/app-params.js
- src/lib/assets.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/assets.js
- src/lib/AuthContext.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/AuthContext.jsx
- src/lib/authReturnTo.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/authReturnTo.js
- src/lib/buildsExtras.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/buildsExtras.js
- src/lib/callAI.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/callAI.js
- src/lib/clientsAnalysis.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsAnalysis.js

## Part 4

- src/lib/clientsBuilds.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsBuilds.js
- src/lib/clientsClaudePrompt.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsClaudePrompt.js
- src/lib/clientsLogic.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsLogic.js
- src/lib/clientsOutreach.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsOutreach.js
- src/lib/clientsPreviewSite.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/clientsPreviewSite.js
- src/lib/constants.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/constants.js
- src/lib/contentEngine.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/contentEngine.js
- src/lib/contentRev.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/contentRev.js
- src/lib/copyCheck.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/copyCheck.js
- src/lib/copyVoice.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/copyVoice.js
- src/lib/liveContent.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/liveContent.js
- src/lib/offerChecks.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/offerChecks.js
- src/lib/offerData.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/offerData.js
- src/lib/offerLogic.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/offerLogic.js

## Part 5

- src/lib/offerPrompts.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/offerPrompts.js
- src/lib/PageNotFound.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/PageNotFound.jsx
- src/lib/ProfileContext.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/ProfileContext.jsx
- src/lib/query-client.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/query-client.js
- src/lib/sampleOffers.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/sampleOffers.js
- src/lib/theme.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/theme.js
- src/lib/utils.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/utils.js
- src/lib/version.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/lib/version.js
- src/components/ads/MetaAdsBuilder.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ads/MetaAdsBuilder.jsx
- src/components/AppLayout.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/AppLayout.jsx
- src/components/AuthLayout.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/AuthLayout.jsx
- src/components/brand/gradientIcons.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/brand/gradientIcons.jsx
- src/components/brand/icons.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/brand/icons.jsx
- src/components/builds/BuildsPanel.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/builds/BuildsPanel.jsx
- src/components/clients/ContactRow.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/clients/ContactRow.jsx
- src/components/clients/LeadWorkspace.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/clients/LeadWorkspace.jsx

## Part 6

- src/components/content/ContentCreator.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/content/ContentCreator.jsx
- src/components/GoogleIcon.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/GoogleIcon.jsx
- src/components/offer/AIError.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/AIError.jsx
- src/components/offer/BuildLoading.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/BuildLoading.jsx
- src/components/offer/result/EditableText.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/EditableText.jsx
- src/components/offer/result/OfferDocTab.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/OfferDocTab.jsx
- src/components/offer/result/PriceCard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/PriceCard.jsx
- src/components/offer/result/RefineIt.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/RefineIt.jsx
- src/components/offer/result/ScopeTab.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/ScopeTab.jsx
- src/components/offer/result/SectionCard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/SectionCard.jsx
- src/components/offer/result/YourOfferTab.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/result/YourOfferTab.jsx
- src/components/offer/ScreenAbout.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/ScreenAbout.jsx
- src/components/offer/ScreenNiche.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/ScreenNiche.jsx
- src/components/offer/ScreenServices.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/offer/ScreenServices.jsx
- src/components/ProtectedRoute.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ProtectedRoute.jsx
- src/components/ScrollToTop.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ScrollToTop.jsx
- src/components/shared/CopyButton.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/CopyButton.jsx
- src/components/shared/CopyIcon.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/CopyIcon.jsx
- src/components/shared/EmptyState.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/EmptyState.jsx
- src/components/shared/IncomeGoalInput.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/IncomeGoalInput.jsx
- src/components/shared/InfoTip.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/InfoTip.jsx
- src/components/shared/PageHeader.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/PageHeader.jsx
- src/components/shared/SelectableCard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/SelectableCard.jsx
- src/components/shared/Skeleton.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/Skeleton.jsx
- src/components/shared/Tabs.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/Tabs.jsx
- src/components/shared/ToolHero.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/ToolHero.jsx
- src/components/shared/UpdateBanner.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/UpdateBanner.jsx
- src/components/shared/WizardShell.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/shared/WizardShell.jsx
- src/components/ui/accordion.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/accordion.jsx
- src/components/ui/alert-dialog.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/alert-dialog.jsx
- src/components/ui/alert.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/alert.jsx
- src/components/ui/aspect-ratio.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/aspect-ratio.jsx
- src/components/ui/avatar.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/avatar.jsx
- src/components/ui/badge.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/badge.jsx
- src/components/ui/breadcrumb.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/breadcrumb.jsx
- src/components/ui/button.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/button.jsx
- src/components/ui/calendar.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/calendar.jsx
- src/components/ui/card.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/card.jsx
- src/components/ui/carousel.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/carousel.jsx
- src/components/ui/chart.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/chart.jsx
- src/components/ui/checkbox.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/checkbox.jsx
- src/components/ui/collapsible.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/collapsible.jsx
- src/components/ui/command.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/command.jsx
- src/components/ui/context-menu.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/context-menu.jsx
- src/components/ui/dialog.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/dialog.jsx
- src/components/ui/drawer.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/drawer.jsx
- src/components/ui/dropdown-menu.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/dropdown-menu.jsx
- src/components/ui/form.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/form.jsx
- src/components/ui/hover-card.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/hover-card.jsx
- src/components/ui/image-helpers.js: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/image-helpers.js
- src/components/ui/image.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/image.jsx
- src/components/ui/input-otp.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/input-otp.jsx
- src/components/ui/input.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/input.jsx
- src/components/ui/label.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/label.jsx
- src/components/ui/menubar.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/menubar.jsx
- src/components/ui/navigation-menu.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/navigation-menu.jsx
- src/components/ui/pagination.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/pagination.jsx
- src/components/ui/popover.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/popover.jsx
- src/components/ui/progress.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/progress.jsx
- src/components/ui/radio-group.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/radio-group.jsx
- src/components/ui/resizable.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/resizable.jsx
- src/components/ui/responsive-image.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/responsive-image.jsx

## Part 7

- src/components/ui/scroll-area.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/scroll-area.jsx
- src/components/ui/select.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/select.jsx
- src/components/ui/separator.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/separator.jsx
- src/components/ui/sheet.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/sheet.jsx
- src/components/ui/sidebar.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/sidebar.jsx
- src/components/ui/skeleton.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/skeleton.jsx
- src/components/ui/slider.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/slider.jsx
- src/components/ui/sonner.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/sonner.jsx
- src/components/ui/switch.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/switch.jsx
- src/components/ui/table.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/table.jsx
- src/components/ui/tabs.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/tabs.jsx
- src/components/ui/textarea.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/textarea.jsx
- src/components/ui/toast.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/toast.jsx
- src/components/ui/toaster.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/toaster.jsx
- src/components/ui/toggle-group.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/toggle-group.jsx
- src/components/ui/toggle.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/toggle.jsx
- src/components/ui/tooltip.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/tooltip.jsx
- src/components/ui/use-responsive-image.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/use-responsive-image.jsx
- src/components/ui/use-toast.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/ui/use-toast.jsx
- src/components/UserNotRegisteredError.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/components/UserNotRegisteredError.jsx
- src/pages/AdCampaign.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/AdCampaign.jsx
- src/pages/AdsHome.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/AdsHome.jsx
- src/pages/BuildLab.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/BuildLab.jsx
- src/pages/ContentHome.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/ContentHome.jsx
- src/pages/ContentPlan.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/ContentPlan.jsx
- src/pages/Dashboard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/Dashboard.jsx
- src/pages/ForgotPassword.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/ForgotPassword.jsx
- src/pages/GetClients.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/GetClients.jsx
- src/pages/Login.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/Login.jsx
- src/pages/OAuthConsent.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/OAuthConsent.jsx
- src/pages/OfferBuilder.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/OfferBuilder.jsx
- src/pages/OfferResult.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/OfferResult.jsx
- src/pages/OfferWizard.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/OfferWizard.jsx
- src/pages/Onboarding.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/Onboarding.jsx
- src/pages/Profile.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/Profile.jsx
- src/pages/ProspectDetail.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/ProspectDetail.jsx
- src/pages/Register.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/Register.jsx
- src/pages/ResetPassword.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/ResetPassword.jsx
- src/pages/SetupCheck.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/pages/SetupCheck.jsx

## Part 8

- src/App.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/App.jsx
- src/index.css: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/index.css
- src/main.jsx: https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/v2.0.0/src/main.jsx
