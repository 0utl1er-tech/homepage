# Agency delivery of a CMS to many small non-technical clients (research notes, as of 2026-10-13)

Scope: how an agency like 0UTL1ER (one K8s namespace per tenant on "tilcayo"; a mix of WordPress and static/Next.js tenants) should give a CMS to both its own staff and local-shop clients. Research budget was limited (~18 tool calls), so some sub-questions (ops practices, competitor role features) rest more on inference than on cited sources. Those are marked.

## 1. Architecture: one shared multi-tenant CMS, one CMS per client, or WordPress per client

### Takeaway
The WordPress hosting world has largely settled on separate installs for unrelated clients. Shared multisite networks get recommended only for uniform franchises, because of blast radius, per-site restore, plugin compatibility and offboarding. Payload's official multi-tenant plugin is the same kind of shared design as multisite: one database, isolation enforced in application code. It is cheap to run but has the same blast-radius and export trade-offs. Only one combination fits 0UTL1ER's one-namespace-per-tenant model: a single CMS codebase and image, deployed as one instance and database per tenant.

### Cited Findings
- Payload multi-tenant plugin: shared database, isolation at the application level. It adds a `tenant` field to enabled collections and assigns users to tenants through an array field on users. "Every create and update to a tenant-enabled collection is checked" against the user's tenants. A `userHasAccessToAllTenants` function covers super admins. By default, deleting a tenant also deletes its documents. Unauthenticated (public) creates cannot assign a tenant, so server-side logic has to handle them — [Payload docs: Multi-Tenant plugin](https://payloadcms.com/docs/plugins/multi-tenant)
- WordPress multisite risk: "A vulnerability in a network-activated plugin, a compromised theme, or a compromised Super Admin account can affect every site in the network." Separate installs keep a compromise contained — [Pagely: Multisite vs separate installations](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- Multisite plugin compatibility: "Not all [plugins] are network-aware… licensing models, media tools, backup utilities, and caching plugins behave differently in a network" — [Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- Multisite backup and restore: restoring a single site is complicated ("you might need to recover just one site without taking down the whole network"). With separate installs, each site has its own backup and recovery — [Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- Multisite performance: "A traffic spike on one site can use up resources like CPU, memory, or database connections for the whole network" — [Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- Moving a site out of multisite "usually requires planning, staging, and careful handling of domains, media paths, user accounts, and plugin behavior" — [Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- Agency-oriented summaries say multisite suits franchises with uniform branding. They say separate installs suit clients who have distinct branding, billing or plugin needs, or who expect "the option to move away easily". They also claim hosting savings of "up to ~50% for 10+ sites" with multisite. That savings figure comes from secondary or marketing blogs, so treat it as unverified — [DCHost](https://www.dchost.com/blog/en/wordpress-multisite-vs-separate-installations-choosing-the-right-architecture/), [GigaPress](https://gigapress.net/wordpress-multisite-vs-multiple-individual-sites/), [ZestCode: multisite for agencies](https://zestcode.co.uk/blog/wordpress-multisite-for-agencies/)

### Inferences
- For 0UTL1ER, a reasonable decision table:
  - **Shared multi-tenant Payload, one DB:** lowest compute and one upgrade. But a code bug or a leaked super-admin credential exposes every client. A client leaving means a filtered export rather than a pg_dump. Restoring one client means surgery on the shared DB. It also cuts across the namespace-per-tenant boundary the platform already has (NetworkPolicy, quotas, per-namespace backups).
  - **One CMS instance per tenant, same image (recommended):** one container image and one schema/config package, versioned in Git. Each tenant namespace gets its own deployment plus a small Postgres (CNPG) or SQLite/libSQL and an S3 bucket prefix. Upgrades go out as rolling image bumps through ArgoCD (an ApplicationSet per tenant). Restore and export happen per tenant. The cost is roughly 150–300 MB RAM per idle Node instance. That number is my estimate, not a cited figure; scale-to-zero (e.g. KEDA/Knative) could offset it.
  - **Per-client WordPress:** keep it for tenants that already run WP or need WP plugins (reservations, EC). It carries the heaviest patching load.
- The agency's own corporate site and blog can run as just another tenant of the same per-tenant CMS. Staff then "dogfood" the client UX.
- The memory notes (incident-rgw-host-strict) record that phox, forgejo and harbor DBs had no backups at all. With per-tenant DBs, CNPG backup configuration has to be part of the tenant template, or it will be forgotten again.

### Gaps
- I found no primary docs from WP Engine or Pantheon on how they structure agency multi-site plans in 2026 (not fetched within budget).
- I found no public benchmark of Payload per-instance memory cost.
- I did not verify Strapi or Directus multi-tenant patterns.

## 2. What SMB owners actually edit, why they stop, and patterns that keep them editing

### Takeaway
Japanese survey data shows many SMB sites go stale. Owners give "no one in charge" and "don't know how" as the top reasons for not updating, both around 30%. Visitors read a stale site as a sign the business may be closed. The editable surface should therefore be small, structured and fast. Free-form page editing should stay agency-managed.

### Cited Findings
- Survey of 1,127 executives of companies with fewer than 50 employees (2020-09). 46.1% update their site themselves, 28.8% outsource updates, 7.0% have never updated, and 18.1% have no site. Reasons for not updating: no one in charge 30.5%, "やり方が分からない" 30.2%, no need felt 25.9%, nothing to post 11.1%. Perceptions of non-updated sites: "営業しているか不安になる" 49.8%, unsure whether the information is correct 35.3% — [PR TIMES (プラスト調査)](https://prtimes.jp/main/html/rd/p/000000006.000049109.html)
- Sample of 300 companies with 100 or fewer employees in Tokyo, Kanagawa, Chiba and Saitama, in construction and architecture. Only 60% had a news (新着情報) section, and 40% either lacked one or had it empty. 36% had posted nothing new for 3+ years. Only about 17% kept the news section actively updated with quality content — [イーコネクション: 新着情報の活用状況を300社調査](https://www.e-conne.co.jp/blog/1268)
- Agency commentary in English describes the same pattern: "Most business websites die slowly because nobody can update them… every change is a developer ticket… the site freezes in time" — [RapidRocket: A website your team can actually update](https://www.rapidrocket.co/blogs/website-cms-seo-done-right)
- Japanese shop builders sell the editable surface as news, menu, coupons, reservations and mobile editing. グーペ lists coupons and menu pages, reservations (10–20 services), and smartphone editing in both plans — [グーペ プラン・料金](https://goope.jp/service/price/)
- Google Business Profile has a structured menu editor (sections, items, descriptions, prices) for restaurants. The data model shop owners already know is structured items, not free text — [GBP ヘルプ: メニュー エディタ](https://support.google.com/business/answer/9455840?hl=ja)

### Inferences
- **Client-editable** (structured forms, mobile-first): お知らせ (title, date, one photo, short body), menu and price items (name, price, tax-inclusive flag, photo, category, sold-out toggle), staff (name, role, photo, short bio), business hours, holidays and temporary closures (臨時休業) as date entries, a gallery or photos, and, if the client wants one, a blog.
- **Agency-managed:** layout, navigation, page structure, SEO meta and structured data, legal pages, forms and integrations, design tokens.
- **Patterns:** use field-level forms instead of rich-text page builders. Cap body length. Compress and crop images server-side. Use one-tap "today closed". Offer preview and drafts. Set a "last updated" nudge, e.g. a LINE or email reminder when the news section has been idle for 30 days. Provide undo or version history. Do not give clients delete rights on structural content.
- The 30% "don't know how" figure argues for an agency-drafted, client-approves flow (see section 5) as a product tier. The 30% "no one in charge" figure argues for selling 更新代行 as a tier.

### Gaps
- I found no rigorous international study of CMS abandonment rates. The English evidence is agency opinion.
- I found no Japan data specific to salons, restaurants or clinics.

## 3. Japan market: competitors, packaging and pricing of 「更新できるホームページ」

### Takeaway
DIY builders set a low price anchor: グーペ at about ¥1,300–4,000/mo and Studio at about ¥590–12,900/mo. Japanese agencies selling to salons and restaurants mostly use subscriptions with little or no initial fee, at about ¥2,500–12,800/mo. Update outsourcing (更新代行) is priced separately, from about ¥5,000 to ¥20,000+/mo. 0UTL1ER's edge has to be done-for-you plus MEO integration, not the CMS itself.

### Cited Findings
- グーペ (GMO Pepabo): Standard ¥3,993/mo on a 12-month contract (¥4,658 otherwise); Light ¥1,331/mo (¥1,996 otherwise); initial fee ¥3,630; 15-day free trial; mobile editing; reservations; coupons and menu pages. Custom domain is +¥399/mo — [グーペ プラン・料金](https://goope.jp/service/price/)
- Studio (JP no-code), monthly prices with annual / monthly billing: Mini ¥590/¥1,290 with 3 CMS models; Personal ¥1,190/¥1,720 with 5 models; Business ¥3,980/¥5,460 with 10 models; Business Plus ¥9,980/¥12,900 with 30 models and up to 15,000 public items; Enterprise is custom. The team plan advertises per-member permission control ("メンバー毎の細かな権限管理") — [Studio 料金](https://studio.design/ja/pricing)
- Agency subscription examples for salons and restaurants: "初期費用0円＋月額1万円から" with monthly contracts; "制作費0円・月額2,500円〜"; ¥6,600/mo for a 3-page plan, ¥9,900/mo for 6 pages, ¥12,800/mo with blog; restaurants "月額7,980円〜 with update work included". These come from search-result snippets of comparison and aggregator pages; the individual vendor pages were not verified — [ミツモア](https://meetsmore.com/services/salon-website-development), [biz.ne.jp 美容室](https://www.biz.ne.jp/matome/2003016/), [biz.ne.jp 飲食店](https://www.biz.ne.jp/matome/2003010/)
- 更新代行 and maintenance price ranges (aggregator and vendor blogs):
  - small sites ¥3,000–10,000/mo for maintenance
  - ¥5,000–20,000/mo is the most common band
  - "更新代行まで含めると月2万〜5万円"
  - a text or image change is ¥1,000–5,000 per job
  
  Sources: [nexer](https://nexer.co.jp/blog/hp-koushin-daikou), [webkanri](https://webkanri.jp/column/2027/), [lolipop](https://lolipop.jp/lp/subscription-homepage/articles/maintenance-costs/). One vendor sells 更新代行 from ¥22,000/mo — [4696.co.jp](https://www.4696.co.jp/wm/)

### Inferences
- Suggested packaging, as a hypothesis for 0UTL1ER:
  - (a) Self-edit plan: structured CMS with mobile UI, about ¥5,000–10,000/mo including hosting, SSL, backups and monitoring.
  - (b) Self-edit plus GBP sync and monthly MEO report.
  - (c) Full 更新代行: the client sends a LINE message or photo, and the agency (with AI drafting) publishes, from about ¥20,000/mo.
  
  Japanese SMB clients compare against グーペ and ペライチ price anchors, so (a) has to beat them on "done for you" and Google visibility, not on price.
- The Japanese UI has to be complete. That includes date and time pickers, 税込 price formatting and 祝日 handling. The UI also has to work one-handed on a smartphone; this is inferred from builders advertising スマホ編集.

### Gaps
- ペライチ's pricing page moved (peraichi.com/pricing → peraichiapp.com/pricing returned 404), so its pricing was not verified.
- Wix, Jimdo and STUDIO.design editor-role details were not verified.
- I found no source on "LINE-like" editing expectations. A search for LINE-based homepage updating returned only LINE official-account material. Treat the claim that LINE-style simplicity is expected as an unverified hypothesis.

## 4. Syncing local business info: Google Business Profile ↔ website

### Takeaway
Single-source sync is technically possible. The CMS can be the master for hours, special hours (holidays) and posts, and push them to GBP: Business Information API `locations.patch` handles `regularHours`, `specialHours` and `moreHours`, and the v4 `localPosts` API handles posts. API access needs an application, and approval requires a profile that has been verified for 60+ days and has a website. Since 0UTL1ER does MEO, this is the main differentiator.

### Cited Findings
- Posts: `https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts` supports create (POST), edit (PATCH with `updateMask`) and delete. Post types are Event, Call to Action (BOOK, ORDER, SHOP, LEARN_MORE, SIGN_UP, CALL) and Offer. "Product Posts cannot be created using the Google My Business API" — [Google: Posts data](https://developers.google.com/my-business/content/posts-data)
- Location and hours: `PATCH https://mybusinessbusinessinformation.googleapis.com/v1/locations/{locationId}?updateMask={fields}`; "It is required that an updateMask is used in a patch request" — [Google: Work with location data](https://developers.google.com/my-business/content/location-data). Patchable fields include `regularHours`, `specialHours`, `moreHours`, `openInfo`, `websiteUri`, `phoneNumbers` and others — [Python client reference, mybusinessbusinessinformation v1 locations](https://googleapis.github.io/google-api-python-client/docs/dyn/mybusinessbusinessinformation_v1.locations.html)
- Access prerequisites: you must "Manage a Google Business Profile that is verified and active for 60+ days" and "Have a website representing the business listed on the GBP". You apply through the GBP API contact form ("Application for Basic API Access"). A quota of 0 QPM means not approved; 300 QPM means approved — [Google: Prerequisites](https://developers.google.com/my-business/content/prereqs)
- Third-party unified APIs (bundle.social, postproxy, zernio) wrap GBP hours and posts updates, which is an alternative if direct API approval stalls — [bundle.social hours API](https://bundle.social/google-business-profile-hours-api), [postproxy how-to](https://postproxy.dev/how-to/update-google-business-hours-api/)
- GBP menus can be edited in the GBP UI. Whether the API supports writing menus was not confirmed in this research — [GBP ヘルプ: メニュー エディタ](https://support.google.com/business/answer/9455840?hl=ja)

### Inferences
- Architecture: the CMS holds `BusinessHours`, `SpecialClosures` and `News`. An afterChange hook, or a worker such as the existing Dagster or a K8s CronJob, maps them to GBP: news becomes a STANDARD or EVENT localPost with a link back to the site, and closures become `specialHours`. The same data feeds the site's JSON-LD `openingHoursSpecification`. One edit then updates the site, GBP and structured data, which sells well as an MEO feature.
- The agency should hold GBP manager access on one agency Google account and one approved GCP project. Clients should not need their own API access.
- Users or Google can suggest edits on GBP, so conflicts are possible. Plan a periodic read-back and diff alert. Whether API edits go through Google review was not confirmed.

### Gaps
- I did not verify current rate limits, whether hours edits via the API are moderated, or Food Menus API write support.
- I did not check whether Japanese builders such as グーペ or Wix offer native GBP sync.

## 5. AI-assisted editing (CMS + LLM/MCP, agency or Claude drafts, client approves)

### Takeaway
Both main candidates now have MCP endpoints. Payload has an official `@payloadcms/plugin-mcp` at `/api/mcp` with per-collection find, create, update and delete toggles and per-key permissions. WordPress has an official MCP Adapter built on the Abilities API, which is in core since 6.9. That makes an "AI drafts → saved as draft → client approves on phone" workflow feasible on either stack. Drafts-only enforcement has to be configured: grant no publish or update rights on published docs.

### Cited Findings
- Payload MCP plugin: endpoint `/api/mcp` with Bearer API keys created in the admin panel ("All MCP requests must include a valid API key as a Bearer token"). "You can allow / disallow find, create, update, and delete operations for each collection", and per-key capability toggles sit on top of normal Payload access control. The official docs do not mention drafts — [Payload docs: MCP plugin](https://payloadcms.com/docs/plugins/mcp)
- Third-party write-ups describe the official plugin as on npm since 2025-10-23. They describe a "draft-first" setup where every agent edit is stored as a draft until a human publishes it. That design comes from a community toolkit and third-party blogs, not from the official docs, which do not mention drafts — [idealabz: Payload MCP](https://idealabz.ae/blog/payload-cms-mcp), [payload-mcp-toolkit](https://github.com/jon8800/payload-mcp-toolkit), [FocusReactive: Payload content agent](https://focusreactive.com/blog/payload-content-agent/)
- WordPress: the MCP Adapter "adapts Abilities registered by the Abilities API into the primitives supported by the Model Context Protocol so that AI agents can use them". The Abilities API is in core from WordPress 6.9 — [WordPress Developer Blog, 2026-02](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/), [MCP Adapter plugin](https://wordpress.org/plugins/mcp-adapter/). Secondary sources claim write access arrived around March 2026 and the plugin reached v0.7.0 with 40k+ installs; these are unverified aggregator claims — [smartwp](https://smartwp.com/wordpress-mcp/), [reptile.haus](https://reptile.haus/journal/wordpress-71-abilities-api-ai-agent-platform-2026/)

### Inferences
- Workflow for 0UTL1ER:
  1. The client sends raw input (a photo, a short note, or "臨時休業 10/20") through LINE, a form or email.
  2. Claude, through MCP, creates a draft in that tenant's CMS using a key that can create and update drafts only.
  3. The client gets a preview link and taps 承認 (approve).
  4. Publishing triggers the site rebuild and GBP sync (section 4).
- The memory notes show 0UTL1ER already runs an MCP OAuth stack for phox (RFC9728 plus DCR). The same pattern could front per-tenant CMS MCP endpoints, but scope each key or token to one tenant. With one instance per tenant, the instance boundary provides that scoping naturally.
- The guardrails have to live server-side: field length limits, no publish ability for AI keys, and an audit log of AI-originated edits.

### Gaps
- I did not verify Payload's native drafts and versions behaviour when edits go through MCP.
- I found no Japanese agency case study of an AI-draft, client-approve workflow.

## 6. Operational best practices (backups, staging and preview, SSO, roles, audit, update cadence)

### Takeaway
The cited evidence here is thin. The strongest sourced point is that per-site backup and restore is far simpler with separate instances ([Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)). Japanese maintenance plans at ¥5,000–20,000/mo usually bundle backups and tamper monitoring ([webkanri](https://webkanri.jp/column/2027/), [lolipop](https://lolipop.jp/lp/subscription-homepage/articles/maintenance-costs/)), so clients expect those as standard.

### Cited Findings
- Restoring one site in a shared network is hard; separate installs have their own backup and recovery — [Pagely](https://pagely.com/blog/wordpress-multisite-vs-managing-separate-installations/)
- In the Japanese market, plans in the ¥5,000–20,000/mo band commonly include light content updates, backups and tamper monitoring (改ざん監視) — [webkanri](https://webkanri.jp/column/2027/)
- Payload multi-tenant: access control layers on top of tenant assignment, and a super-admin function covers agency staff — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Studio advertises per-member permission control on team plans, which is the competitor baseline for roles — [Studio 料金](https://studio.design/ja/pricing)

### Inferences (not directly sourced; based on the platform context)
- **Backups:** CNPG scheduled backups to RGW for each tenant's DB, plus media bucket versioning. Run a monthly automated restore test into a scratch namespace that diff-checks row counts, and keep a quarterly manual drill. This matters given the earlier "no backups" finding for phox, forgejo and harbor.
- **Staging and preview:** draft and preview mode in the CMS covers clients. Agency code changes go through a shared staging tenant and a canary tenant (the agency's own site first), then ArgoCD sync waves out to client tenants.
- **SSO:** agency staff use the existing OIDC (as with Plane), mapped to a super-admin role across instances. Clients use email magic links or passwords, since most SMB owners will not have an IdP. LINE Login is an option worth considering.
- **Roles per tenant:** owner (edit and publish), staff (draft only), agency (all), AI key (draft only).
- **Audit:** use CMS versions or history plus a per-tenant append-only log of who changed what. This is also useful in disputes such as "the price on the site was wrong".
- **Update cadence:** monthly minor and security bumps of the shared image, applied as a rolling update across tenants, with immediate patching for CVEs. WP tenants need weekly plugin updates with auto-update for minor releases.
- **Offboarding:** per-tenant pg_dump plus a media zip plus a static export of the site. Promise this in the contract.

### Gaps
- I did not fetch WP Engine, Pantheon or Kinsta docs on backup retention and restore SLAs.
- I found no sources on restore-testing cadence for agencies or on audit-log norms for SMB CMS.
