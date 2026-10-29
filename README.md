# Eleva member app

Interactive React prototype built with Vite. Photography is bundled locally; see PHOTO_CREDITS.md for sources. The Sites manifest is the canonical deployment identity.

## Run locally

Run `npm install` and `npm run dev`, then open the local URL printed by Vite. Run `npm run build` for a production bundle and publish the `build/` directory on a static host. The build also creates `open.html` and `onboarding-offline.html`, which you can double-click for local previews without a server. Keep the `dist/assets/` folder alongside them. All journeys use fictional data and browser-local state.

Use **Try onboarding** in the app header to open the 11-screen card application flow. The flow also lives at `/onboarding.html`; its final **Start using Eleva** button returns to the member app. Its React source is in `src/onboarding/`.

React renders the app shell, navigation, and page container. The existing screen templates, dialog handlers, and model remain in `dist/*.js` so the current demo flows and saved browser sessions behave as before. `scripts/prepare.mjs` copies those scripts and artwork into Vite's public assets before development or build. No external service is used at runtime.

## Main journeys

- Overview → card bill → amount selection → review → payment receipt → activity.
- Discover → category or search → save offer → terms → activation → demo voucher.
- Products → current card management or reward investing.
- My card → details, freeze/unfreeze, PIN validation, channel controls, per-transaction cap, and demo autopay.
- My limits → portfolio → additional pledge → consent → review → new limits.
- My limits → release investments → review → reduced limits; market-change simulator.
- Activity → search or filter → transaction details; statement → CSV export.
- Profile → reset the demo.

## Data model

All data is fictional. The opening linked portfolio is ₹12,00,000, of which ₹8,00,000 is pledged. A 50% illustrative advance rate produces a ₹4,00,000 limit. Eight transactions reconcile to ₹68,450 outstanding, leaving ₹3,31,550 available. The opening statement balance is ₹24,850. Payments restore available credit; pledge changes update the credit limit. Personal transaction caps never increase credit availability.

State is stored under `eleva-demo-v3` in browser localStorage. There is no banking API, actual payment, real pledge, merchant redemption, adviser booking, or account authentication inside the prototype. The deployed Sites audience is owner-private. Fictional card details are display-only. PIN values are never stored.

## Validation

Run `npm test` and `npm run build`.

Browser QA was performed using the Sites managed preview: desktop at 1366 pixels and responsive frames at 390 and 360 pixels (345-pixel content viewport with a desktop scrollbar). All five navigation destinations fit without horizontal overflow. Tested card freeze/unfreeze, international control, fictional card detail reveal, statement and partial payments, invalid payment amounts, offer search/category/save/activation, product interest, PIN mismatch and success, pledge consent, over-allocation validation, pledge review/confirmation, pledge release, and market simulation. Also tested autopay and transaction cap changes, persistence after reload, profile access, reset, and CSV export (eight transactions reconcile to ₹68,450).

`qa/mobile.html` is a development-only responsive-frame harness. Copy it temporarily to `dist/qa-mobile.html` to use through static preview, then remove that copy before packaging.

Native touch hardware, real banking integrations, and real commercial terms are outside this prototype validation.


## Card artwork

`dist/assets/eleva-card-signature.png` is an exact clipped rendering of the card shown on page 7 of `Eleva Investor Deck v201026.pdf (2).pdf` (Library source `libfile_0229ce3400ec8191a2bb93cff338e4e4`). The source rectangle is x=802–1237, y=268–543 PDF points, rendered at 2×. No card artwork was redrawn. The shared card component uses this asset in Overview, My card, and Discover → Products. The original black/silver design, printed logo, cardholder name, chip, motif, and Visa Signature artwork are preserved.


## Rewards → investments

Rewards is a primary destination on desktop and replaces Activity in the five-item mobile bar. Card transactions remain accessible from Home, desktop navigation, and My card → Transactions & payments. Home replaces the old portfolio-summary panel with the rewards-investing hero, displayed first on mobile. Both the destination and demo conversion fee are shown before the single-click action. The actual Eleva card artwork and locally bundled benefit photography are retained.

First use: select a fictional fund and explicitly consent once. Setup does not spend any points. After setup, Home and Rewards show the destination and rupee amount; one click on Invest submits the simulated conversion without a second confirmation screen.

Illustrative opening rewards: 8,400 available points worth ₹840, 1,260 pending points, and ₹3,600 of previously allotted principal. Demo terms are 10 points = ₹1, a 100-point minimum and zero conversion fee. Funds and NAVs are fictional. No actual investment or bank debit occurs. Integer paise accounting preserves conversion value.

Orders progress through requested → processing → allotted. A clearly labelled, collapsed demo control on the receipt lets a reviewer advance the status. Units and invested-principal totals update only at allotment. Reward investments stay separate from card collateral and cannot change the pledged portfolio, dues, or credit limit. Existing v3 local sessions receive the rewards fields without losing their saved card state. Reset demo restores the opening rewards and clears setup and new orders.

Validation: 19 model tests cover the existing balance/limit rules plus consent and fund selection, single-click deduction, pending-point exclusion, duplicate protection, minimums, precision, migration, status progression, unit allotment, destination changes, collateral separation, and the completed-investment Home state. Browser QA passed desktop setup, conversion from Home, status progression, persistence, filters and empty states; mobile setup and conversion at 360px, points balance, Home tracking, transaction access from Card, and all five navigation screens at narrow widths. Mobile Rewards also checked at 390px. No app console errors were observed.


## Rewards hub and shared redemption balance

Rewards now begins with one shared available RP balance and presents five choices: mutual funds (featured), flights, experiences, drops and vouchers. Desktop shows the featured mutual-fund card beside the other four photographic choices. Mobile presents all five as direct shortcuts before the featured card. The MF rupee conversion is labelled only within that option rather than as a universal value for all points.

MF investing supports 25%, 50% or all available RP, preserving the one-click action after destination setup. Home keeps the featured MF journey and links to all rewards. Other rewards can be redeemed without MF setup. A sample catalogue provides flight credits (not tickets), experience requests (not confirmed reservations), drop claims (no shipping) and demo vouchers (codes not valid with merchants). Each has details, a review, an eligibility check, a receipt and a persistent entry in a combined activity list.

All options deduct from the same available points. Pending points remain excluded. Each catalogue item can be redeemed once per demo member; request IDs also prevent duplicate deductions. Existing reward sessions receive an empty non-MF history without resetting saved balances or investment preferences. No redemption changes card debt, collateral or limits.

Validation: 28 model tests passed, including partial MF conversion, cross-category accounting, insufficient balance, replay protection, mixed redemption types, state migration and separation from collateral. Desktop browser QA covered a partial MF conversion followed by a voucher and an experience, insufficient drops and flight credits, a successful flight-credit receipt, and combined activity. Mobile QA at 360/390 px covered all five shortcuts, drop claim, shared point details and partial MF investing after a non-MF redemption, without horizontal overflow. No application console errors were observed. All terms, prices and fulfilment remain simulated.


## Home reward portfolio metrics

The Home RP → MF card shows invested principal, current value and annualised XIRR together, above the available-points conversion amount. Current value marks allotted units to fictional NAVs as of 26 Oct 2026. Opening principal is ₹3,600, current value ₹3,611.52, and calculated XIRR +4.50%. The India Equity Index demo NAV is ₹125.40; newly allotted units use the same NAV, so a same-day conversion does not manufacture a gain.

XIRR uses the rupee value and UTC allotment date of each completed reward investment plus terminal portfolio value, on a 365-day basis. Empty portfolios, same-day-only holdings, unavailable valuation data and invalid dates show a dash rather than an invented return. Pending conversions, non-MF redemptions and card collateral are excluded. The clickable XIRR label opens the amount, value, unrealised gain/loss, NAV date, pending conversions and calculation explanation. Zero available RP is shown separately from invested principal.

Validation: 34 model tests passed, including known positive/negative/flat XIRR, irregular contributions, empty/same-day holdings, missing data and exclusion of pending investments and other rewards. Desktop and 360/390 px responsive QA verified the three metrics, their explanation sheet, no horizontal overflow, and that principal/current value update only after simulated unit allotment. No application console errors were observed.

## Rewards layout reference

The attached Scapia screen recording informed the Rewards page structure: a dark balance hero, two photographic learning cards, a horizontal row of redemption choices, a featured conversion, reward discovery, a dark member-privileges rail, and expandable FAQs. Eleva branding, local real photography, the RP → MF emphasis and all existing redemption/accounting flows are retained. On mobile, the balance leads directly into the two guides; desktop retains the page introduction.

All five choices are linked: featured mutual funds, flights, experiences, drops and vouchers. The balance includes a direct MF shortcut and a rewards-activity shortcut. Learning cards open real guides with further destinations. Catalogue carousel arrows scroll the native horizontal rail; all cards and category tiles remain keyboard reachable. FAQ disclosures use native details/summary. Current earning rates and point-expiry policy are explicitly unspecified rather than invented. Lifetime earned RP is the available balance plus points already used; pending points remain separate.

Validation: all 34 accounting/valuation tests and JavaScript syntax checks passed. Desktop QA covered the earn/use guides, MF destination setup, a 50% conversion, voucher redemption against the remaining shared balance, the activity shortcut and filter, and FAQs. Mobile frames at 360/390 px verified the compact balance and guides, category access including the final vouchers tile, MF shortcut, reward carousel movement, insufficient flight-credit handling, member privilege details, FAQ expansion and sheets without horizontal overflow. No application console errors were observed. Temporary responsive QA output was removed before packaging. The deployed audience remains owner-private.

## Home portfolio hero and monthly RP history

Home now leads the reward-investment card with current portfolio value and annualised XIRR directly underneath. Invested principal and the demo NAV date remain visible. The reference’s segmented-bar treatment is implemented as native HTML/CSS with exact data-driven fill proportions, month buttons, and 3M / 6M / 1Y / All ranges. Selecting a month displays exact points and their conversion value. Changing history periods does not change the all-time current value or XIRR.

Bars sum RP actually redeemed for mutual funds by conversion month. Requested and processing conversions are included because their points have already been deducted, with the awaiting-allotment amount identified. Investment value continues to include allotted units only. Other reward categories and pending unredeemed RP remain outside this chart. Earlier months without conversions show zero. All history starts at the first valid conversion; invalid, future and cancelled entries are excluded. The timeline uses the prototype’s 26 Oct 2026 snapshot. Native buttons, pressed states, exact accessible labels, focus restoration and an active-month summary support keyboard and mobile use. Home’s setup, one-click invest, track-investment and completed-investment paths remain connected.

`dist/assets/portfolio-backdrop.png` is a decorative background created with the built-in Imagegen tool; it contains no chart or financial data. Prompt: “Create a quiet premium background texture for a small Eleva fintech portfolio card. Portrait 4:5 composition. Almost entirely near-black / midnight forest green (#070d08) with extremely subtle smooth satin depth, and a very faint diffuse acid-lime ambient glow confined to the lower central edge. Minimal, restrained, elegant, flat-facing, with large empty near-black space. This is ONLY a background texture: absolutely no text, numbers, currency, charts, bars, lines, grids, icons, logos, objects, borders, frames or interface elements. No bright green areas and no conspicuous grain. Solid opaque background.” All amounts, percentages and bars are rendered from the app model, independently of the image.

Validation: 39 model tests pass, including monthly reconciliation, zero months, cross-year ranges, pending allotment, exclusion of other rewards, invalid/future/cancelled records, range validation and unchanged portfolio valuation during chart browsing. Desktop browser QA passed all history periods, exact month selection, keyboard activation, zero months and XIRR details. Mobile QA at 360/390 px passed range controls without horizontal overflow, fund setup and a one-click ₹840 conversion. The new conversion added 8,400 RP to October while current value stayed ₹3,611.52; simulated allotment then updated current value to ₹4,451.52 and removed the pending label. No application console errors were observed. The owner-private audience is preserved.

## Investment story on Rewards

Rewards now shows current investment value, annualised XIRR, invested principal and unrealised gain/loss directly below the points balance, before the guides and redemption catalogue. The same monthly RP conversion model and segmented chart used on Home appear in this section. Shared chart controls now update their nearest chart container, preserving keyboard focus on either route. Range and selected-month state carry between Home and Rewards.

The invested amount in the points header and the featured MF card’s investment-story link jump to this visible section. Portfolio details explain valuation and XIRR; Invest more reward points scrolls to the existing MF conversion controls. Pending investment value appears separately when applicable. No accounting rules, collateral or real transactions change.

Validation: all 39 model tests passed. Desktop and 360/390 px responsive QA passed chart filters and exact month selection on both routes, the points-header shortcut, story/conversion navigation, portfolio details and no horizontal overflow. No application console errors were observed. The audience remains owner-private.
