# Shopify lead form: research, copy and validation plan

Research date: 11 November 2026. Audience: Israeli business owners considering paid Shopify maintenance or a store build. Success means suitable sales conversations and customers within Evyatar's capacity, not the largest possible number of submissions.

This is a design recommendation, not a claim of measured conversion uplift. No published study establishes a universally best form for this specific audience. Functional and usability checks can be completed before launch; conversion performance requires real traffic and enough outcomes to compare fairly.

## Skills applied

- **Content Creation**: specific benefit, plain language, one action, minimum necessary fields, mobile-first copy.
- **Brand Review**: consistent ad-to-page promise and tone; remove unsupported superlatives, results, scarcity, invented prices and testimonials.
- **UX Copy**: short questions, meaningful button labels, helpful field errors and accurate delivery states.
- **Performance Report**: define qualified-lead and customer outcomes, diagnose funnel loss, test one variable and avoid invented results. Its generic benchmarks are not treated as targets for this business.
- **Alex Hormozi Pitch** was inspected but not used to introduce guarantees, bonuses, scarcity or prices. Those would need a real business offer behind them.

The user requested a form-only landing page. Generic skill templates for long landing pages, proof blocks and FAQs do not override that requirement.

## Positioning and local market context

The angle is a focused conversation about the work a store needs, with a defined scope. The form should continue the ad's message, not restart the sales pitch or imply a free audit.

Public competitor positioning was checked on these pages:

| Competitor | Observed positioning | Implication for this form |
|---|---|---|
| [Convo](https://convo-agency.co.il/) | Shopify build, development and maintenance under one agency; broad service menu and quote CTA | Keep our two offers explicit and route directly to the relevant questions. Do not borrow their credentials, scale or client proof. |
| [DanMedia](https://danmedia.co.il/) | Shopify builds/migrations, process and sales-oriented outcomes | Ask whether a store exists and where it operates today; do not promise zero downtime or increased revenue. |
| [Shopmaster](https://www.shopmaster.co.il/) | Design, launch and ongoing support; simple contact capture | Preserve the clarity of a direct inquiry while asking enough to assess workload and suitability. Their public page does not reveal conversion performance. |

The main audience tensions are inferred from this service category and the user's brief: recurring store tasks consume the owner's time; a new store has unclear scope; the owner wants to know what happens after leaving details. These are hypotheses to validate with actual prospects, not survey findings.

## What the primary research supports

| Source | Finding used | Application and limit |
|---|---|---|
| [GOV.UK: Structuring forms](https://www.gov.uk/service-manual/design/form-structure) | Know why each answer is needed; start with one decision/question per page; branch to relevant questions | Supports the requested interaction and a question protocol. Public-service usability guidance does not prove a B2B lead-conversion uplift. |
| [GOV.UK: Question pages](https://design-system.service.gov.uk/patterns/question-pages/) | Mark optional information, permit uncertainty when valid, keep progress truthful; an elaborate progress display can distract | Use a small bar and text count, not a large navigation wizard. The user explicitly requested progress; do not claim that a bar itself increases conversions. |
| [W3C: Multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/) | Logical stages, clear progress, skippable optional steps, no unnecessary time limit | Give each screen a question heading and accessible progress information. Explain changes to the total if branching changes the path. |
| [NN/g: Reduce cognitive load in forms, July 2025](https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/) | Structure, transparency, clarity and support; disclose requirements and show only relevant information | Keep the interface calm even though the ad is animated. Avoid vague budget or timeline wording and unverified completion-time promises. |
| [Baymard: Form design, updated June 2026](https://baymard.com/blog/form-design) | One primary column, fewer irrelevant visible fields, labels and explanations near inputs | Use simple mobile controls and ask for one contact channel. Baymard's checkout statistics are not transferred to a service inquiry form. |
| [NN/g: Website forms usability](https://www.nngroup.com/articles/web-form-design/) | Minimize unnecessary fields, clearly associate labels, avoid destructive reset actions | Keep answers when going back and remove any “clear form” button. Its usability recommendations are a starting point, not a promised lift. |
| [Seckler et al., CHI 2014, original study](https://research.google/pubs/designing-usable-web-forms-empirical-evaluation-of-web-form-improvement-guidelines/) | Empirical evaluation of basic form-improvement guidelines | Supports investing in usability testing. The study is not an experiment on this Hebrew Shopify audience or this exact step sequence. |
| [GOV.UK: Phone numbers](https://design-system.service.gov.uk/patterns/phone-numbers/) | Give a choice of contact method; accept familiar formats; use telephone autocomplete | Phone can be the default method, with email as an alternative. Normalize spaces, hyphens and country codes rather than rejecting ordinary input. |
| [W3C: Validating input](https://www.w3.org/WAI/tutorials/forms/validation/) | Clear required fields, forgiving formats, accessible errors, and server-side validation | Validate on Continue/submission, preserve entries after errors and validate again on the server. Frontend validation alone is insufficient. |
| [Google Ads: Ads and landing pages](https://support.google.com/google-ads/answer/6238826/optimising-your-ad-and-landing-page?hl=en-GB) | The page should match the ad's promise/action and be useful on mobile | Maintain the orange maintenance or purple build theme and offer. Google Search advertising guidance is used for relevance, not as a claim about Meta ranking. |
| [Google Analytics: Avoid PII](https://support.google.com/analytics/answer/6366371?hl=en) | Names, personal phone numbers and email addresses must not enter Analytics dimensions, events or URLs | Analytics receives only fixed step IDs, service, variant and aggregate outcomes. Keep submitted business/contact answers out of tracking payloads. |
| [Microsoft Research: Trustworthy experimentation](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/) | Experiment design and data quality determine whether results are trustworthy | Define the metric, randomization and stopping plan before launch; verify assignment and event collection. A few leads cannot establish a winner. |

## Recommended question protocol

Use the ad link to select **maintenance** or **build** from an allowlist. Show the selected service clearly, with an accessible way to change it. A visitor without a valid service parameter chooses a service first. Do not silently infer answers about their business from ad targeting.

The compact default is eight questions plus a review/send screen. Each question earns its place by supporting fit, preparation or contact. Where implementation needs a separate business-name field, make its purpose explicit rather than collecting many CRM fields by habit.

| # | Question and control | Why / requiredness |
|---|---|---|
| 1 | **מה העסק שלכם מוכר?** Short text. Hint: **למשל, בגדי ילדים או מוצרי טיפוח.** | Business context for the call. Required, generous length limit; no essay. A business name may be supplied separately if the CRM genuinely requires it. |
| 2M | **החנות כבר פועלת ב-Shopify?** Radio: **כן, החנות פעילה / החנות עדיין בבנייה / היא בפלטפורמה אחרת / לא בטוחים** | Establish platform/readiness. Required choice. Other platforms should be tagged for build/migration assessment, not mislabeled as existing Shopify maintenance. |
| 2B | **איפה העסק מוכר היום?** Radio: **ברשתות חברתיות / בחנות פיזית / באתר קיים / עדיין לפני השקה** | Determine build context without demanding technical knowledge. Required choice. |
| 3M | **מה הכי חשוב לכם לקדם בחנות?** Choices: **עדכוני מוצרים ותוכן / תיקוני תצוגה / שינויים שוטפים / תחזוקה חודשית / משהו אחר** | Surface scope and distinguish recurring work. If multiple selection is allowed, say **אפשר לבחור כמה תשובות** and require at least one. |
| 3B | **מה הכי חשוב לכם בהקמת החנות?** Choices: **חנות חדשה למותג / מעבר מאתר קיים / עיצוב והתאמה למובייל / עדיין צריך להגדיר את ההיקף** | Scope and readiness. Include an honest uncertainty option; no guarantee of sales. |
| 4 | **יש קישור לחנות או לעמוד העסק?** URL/text field marked **לא חובה**. Secondary control: **דלגו על השאלה** | Lets Evyatar prepare without demanding screenshots or an account. Accept a bare domain and common social links. Do not block prelaunch businesses. |
| 5 | **מתי תרצו להתחיל?** Radio: **בהקדם / בחודש הקרוב / בהמשך / עדיין בודקים אפשרויות** | Capacity matching. Hint: **נקבע מועד בהתאם להיקף העבודה ולזמינות.** Never imply an unverified response or delivery deadline. |
| 6 | **כבר הוגדר תקציב לשירות?** Radio: **יש תקציב לשירות בתשלום / צריך להבין את ההיקף והעלות / רק בודקים כרגע** | Make the commercial purpose clear without inventing a rate. If monetary budget bands are added later, define them as the prospect's budget, not a quote, and include **עדיין לא הוגדר**. |
| 7 | **איך קוראים לכם?** One name field, not first/last splitting | A human callback and lead record. Required; allow Hebrew, Latin, spaces, hyphens and short names. |
| 8 | **איך נוח לחזור אליכם?** Contact-method choice **טלפון / אימייל**, then one corresponding value field | One logical contact question, not two required channels. Hint: **נשתמש בפרט הזה כדי לחזור אליכם בנוגע לפנייה.** Use telephone/email autocomplete and the appropriate keyboard. |

**Israel qualification:** Campaign location, Hebrew and a +972 number do not prove that the business is Israeli. If the operating rule is strictly Israel-only, add **העסק פועל בישראל?** with **כן / בישראל וגם בחו״ל / לא** and explicitly tag the result. Do not ask for a full address. A non-Israeli response can receive an honest suitability message before contact details are collected. This adds a justified question; it should not be hidden inside a misleading progress count.

**Do not ask initially:** annual revenue, home address, company registration number, customer data, passwords, store-admin access, both phone and email, a mandatory long project essay, or payment details. None is necessary to start this sales conversation.

## Hebrew microcopy and visual continuity

Maintenance label: **תחזוקת Shopify חודשית**. Optional brief intro: **נבין מה החנות צריכה ונבדוק התאמה לליווי שוטף.**

Build label: **בניית חנויות Shopify**. Optional brief intro: **נבין מה העסק צריך לקראת החנות החדשה.**

Shared expectation: **כמה שאלות ממוקדות כדי להגיע לשיחה עם תמונה ברורה.** Do not promise a completion time until observed in representative testing.

- Continue: **המשך**
- Back: **חזרה**
- Optional skip: **דלגו על השאלה**
- Review: **אלה הפרטים שנשלח**
- Edit review answer: **עריכה** with an accessible label naming the relevant answer
- Final action: **שליחת הפרטים לאביתר**
- Sending: **שולחים את הפרטים…**
- Persisted success only: **הפרטים התקבלו. תודה!** / **אביתר יחזור אליכם לגבי הבקשה.**
- Failed submission: **השליחה לא הושלמה. הפרטים עדיין כאן — אפשר לנסות שוב.**
- Required choice: **בחרו תשובה כדי להמשיך.**
- Name missing: **הוסיפו שם כדי שנדע למי לחזור.**
- Invalid phone: **בדקו את מספר הטלפון. אפשר להזין גם קידומת מדינה.**
- Invalid email: **בדקו שכתובת האימייל כוללת שם וכתובת אתר.**
- Invalid URL: **בדקו את הקישור, או דלגו על השאלה.**

The final action must describe what actually happens. If the implementation merely opens WhatsApp with a draft, the button must say **פתיחת הפנייה ב-WhatsApp**, and the UI must not claim the lead was received. Automatic receipt requires a confirmed server-side delivery/storage step.

Use the ads' palette: maintenance warm paper/dark ink/orange; builds dark purple/lilac/yellow. Keep a single calm content column and generous touch targets. No personal logo is required. There is no need to replay the ad's continuous motion behind a form. Use a short nonoverlapping change between questions and respect reduced-motion preferences.

## Behavioral and technical acceptance checks

1. Both ad-specific URLs select the correct service, colors and questions. Invalid query parameters cannot inject content/styles or create broken states.
2. Only one active question is exposed to keyboard and screen-reader navigation. The next heading receives focus after Continue; selection alone does not unexpectedly change screens.
3. Back preserves all entered answers. Changing service clears or revalidates only incompatible answers. Review edits return to a sensible point.
4. Progress reflects the real path, counts optional screens consistently, and does not show 100% before successful submission. Expose a text equivalent such as **שאלה 3 מתוך 8**.
5. Check 320, 360, 390 and 768 CSS-pixel widths; portrait and landscape; long Hebrew options; 200% zoom; a visible mobile keyboard; and reduced motion. No horizontal scroll, overlapping controls or covered Continue button.
6. Labels remain visible after typing. Telephone, email and URL values use readable LTR direction inside the RTL layout. Do not make the whole page LTR to solve these fields.
7. Accept normal phone variations and plus-addressed email. Do not impose arbitrary name rules. Optional blanks are accepted.
8. Validation is specific, adjacent and programmatically associated with its field. Pressing Enter does not accidentally submit a prior step. Server validation matches frontend expectations.
9. Disable duplicate submission while pending, use an idempotent submission identity, preserve answers on errors, and display success only after the authoritative backend response.
10. A test submission with clearly marked synthetic data must appear in the actual intended inbox/admin destination. Test network failure, retry, double-click, offline state and server rejection. A green button animation is not a delivery test.
11. Confirm the public page cannot read other people's leads. No browser-shipped secret may be required for delivery. Do not put user answers in query strings, analytics events or routine console logs.
12. Privacy wording must match the implemented use and actual policy. Do not add a prechecked marketing subscription or claim that no data is stored while storing it.

## Measurement and A/B plan

Primary metric: **suitable lead submissions per eligible unique landing-page visitor**, then qualified calls held and paying customers. Report cost per qualified conversation where ad spend is available. Completion rate is a supporting metric: a form that creates more unsuitable leads can waste the user's limited schedule.

Anonymous event plan: `form_view`, `form_start`, `step_view`, `step_complete`, `validation_error`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`. Allowed properties: fixed service/variant IDs, fixed step IDs, input/error categories and counts. No contact values, links provided by the lead, business descriptions or free text in analytics. Define conversion as confirmed submission, not clicking the button.

Analyze drop-off by step and by maintenance/build separately. Add lead-status fields for suitability, contacted, call booked, call held, proposal and customer. Record the criteria used; a personal impression should not silently become a numeric score.

First experiment, once the baseline works: test **when the budget-readiness question is asked** while keeping the questions, offer, traffic source and styling constant. Alternatively test one CTA wording. Do not test both at once. Keep assignment stable and random within each service; do not compare the orange maintenance audience with the purple build audience as if that isolated a design effect.

Predefine the minimum detectable improvement, sample size, duration and guardrails using the actual baseline. Monitor data quality and errors immediately, but do not stop for an apparent early win after a handful of leads. If traffic is insufficient, report the result as inconclusive and prioritize observed usability issues. A/B performance has **not** been measured as part of this research.
