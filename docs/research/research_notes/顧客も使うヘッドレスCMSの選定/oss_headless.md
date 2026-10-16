# Self-hostable OSS headless CMS comparison (2026-10) for an agency self-hosting on Kubernetes with non-technical Japanese clients

Research date: 2026-10-13. Repo/release data pulled from the GitHub API that day. Sources are linked inline. "Primary" means the vendor's docs, pricing page, GitHub, or official blog.

Snapshot (GitHub API, 2026-10-13):
| Project | Stars | License (GitHub) | Latest release |
|---|---|---|---|
| strapi/strapi | 73.3k | MIT core + `ee/` dirs (GitHub reports NOASSERTION) | v5.57.0 (2026-10-07) |
| payloadcms/payload | 45.2k | MIT | v3.90.2 (2026-09-23); v4 in beta/canary |
| directus/directus | 38.5k | MSCL-1.0-GPL since v12 (NOASSERTION) | v12.5.0 (2026-10-07) |
| TryGhost/Ghost | 55.5k | MIT | v6.70.0 (2026-10-13) |
| wagtail/wagtail | 20.6k | BSD-3 | v8.0 (2026-08-25) |
| decaporg/decap-cms | 19.4k | MIT | 3.16.3 (2026-09-22) |
| tinacms/tinacms | 13.8k | Apache-2.0 | active (packages released 2026-10-12) |
| sanity-io/sanity (Studio) | 6.4k | MIT | v6.19.0 (2026-10-13) |
| Thinkmill/keystatic | 2.5k | MIT | @keystatic/core 0.6.9 (2026-08-26) |
Sources: https://github.com/strapi/strapi , https://github.com/payloadcms/payload , https://github.com/directus/directus , https://github.com/TryGhost/Ghost , https://github.com/wagtail/wagtail , https://github.com/decaporg/decap-cms , https://github.com/tinacms/tinacms , https://github.com/sanity-io/sanity , https://github.com/Thinkmill/keystatic , https://www.npmjs.com/package/@keystatic/core

## License and paywalled features (Strapi / Directus / Payload / Ghost)

### Takeaway
Payload is the only one of the big three where everything you need (drafts, versions, scheduled publish, live preview, multi-tenant, MCP) is MIT and free. Its paid Enterprise extras are SSO, publishing workflows, AI features and the visual editor, and free community OIDC plugins cover SSO. Strapi Community is free but puts Live Preview, Releases and Content History behind Growth ($45/mo). SSO is a $150/mo Growth add-on, and Review Workflows and Audit Logs are Enterprise only. **Directus is no longer BSL.** Since v12 (May 2026) it ships under the new MSCL license with license-key enforcement. Its free "Core" tier caps you at 3 seats, 25 collections, 5 flows and no SSO, unless your organization qualifies for the Open Innovation Grant (<$5M revenue and <50 employees), which unlocks everything for free.

### Cited Findings
**Strapi (v5) self-hosted plans**
- Community: "Free Forever", "Open-Source under MIT License", RBAC, REST & GraphQL, unlimited entries/API calls, community support. No SSO, review workflows, audit logs, content history, releases, live preview or AI. — [Strapi self-hosted pricing](https://strapi.io/pricing-self-hosted)
- Growth: **$45/month incl. 3 seats (+$15/month/seat)**. Adds Strapi AI (1,000 credits/month), Live Preview, Releases, Content History (14-day retention), basic support. **SSO is an add-on at $150/month (+$50/month per seat).** Review Workflows and Audit Logs are not included. — [Strapi self-hosted pricing](https://strapi.io/pricing-self-hosted)
- Enterprise: custom price ("Let's talk"). Adds SSO, Review Workflows, Audit Logs, enhanced Strapi AI, SOC 2 report, offline licensing add-on. — [Strapi self-hosted pricing](https://strapi.io/pricing-self-hosted)
- Basic **Preview is a free feature on all plans incl. CE**. **Live Preview (side-by-side editor, double-click to edit in place) is Growth/Enterprise only.** — [Strapi docs: Preview](https://docs.strapi.io/cms/features/preview)
- Draft & Publish is part of Strapi 5 core. Scheduled publishing in Strapi 5 goes through "Releases" (paid Growth+ per pricing page). — [Strapi self-hosted pricing](https://strapi.io/pricing-self-hosted)

**Directus (v11 → v12)**
- The repo `license` file is now the **Monospace Sustainable Core License v1.0 (MSCL-1.0-GPL)**, not BSL. It restricts "Competing Use" (making the software available to parties competing with the licensor's commercial offerings) and grants a GPL-3.0 license "effective on the fourth anniversary" of each release. — [directus/directus license](https://github.com/directus/directus/blob/main/license)
- The license change was announced in April 2026 and took effect with v12, released 2026-05-26. v12 brought a redesigned Studio, native draft/publish workflows, AI-assisted translations, OAuth 2.1 for MCP, and active license enforcement. Self-hosted instances default to the Core tier. — [GitHub release v12.0.0](https://github.com/directus/directus/releases/tag/v12.0.0) (search summary; release page not fetched in full), [Medium: "Is Directus dead?"](https://medium.com/@kutubkhanmakda/is-directus-dead-the-truth-behind-v12-the-mscl-license-and-new-pricing-restrictions-8505353096ed) (secondary)
- Official licensing doc: the **Open Innovation Grant** gives free commercial use to organizations with "less than $5M in annual revenue and fewer than 50 employees". Eligibility is assessed on "legal entities whose representatives access Directus Studio". License keys bind to the project and `PUBLIC_URL`. "Enforcement never deletes data" (it restricts access instead). API-only users don't consume seats. The page doesn't address agencies hosting for clients; it points to sales@ / licensing@directus.com. — [Directus docs: Licensing overview](https://directus.com/docs/licensing/overview)
- Pricing page tiers: **Core $0: 3 user seats, 25 collections, 5 flows, no SSO, "Advanced RBAC", AI Assistant included. Team $499/mo annual ($599 monthly): 10 SSO seats, 50 collections, 20 flows, SSO. Enterprise custom: SAML/OIDC, 200+ collections, unlimited flows, custom LLM, offline mode, AI translations. Open Innovation Grant: "Full access to Directus at no cost. No feature limits."** (self-hosted free; $99/mo cloud) — [Directus pricing](https://directus.com/pricing)
- SSO in v12: "SSO is no longer in the free Core tier". The openid/oauth2/ldap/saml drivers and env vars are unchanged from v11. Grant-eligible organizations keep SSO free "in exchange for registration and telemetry". — [Contensu blog, 2026-08-09](https://contensu.com/blog/what-happens-to-sso-in-directus-v12) (secondary; consistent with the pricing page)
- Pre-v12 BSL 1.1 terms: free for organizations under $5M "total finances". The term was criticized as ambiguous and honor-system based. — [mobian.studio Directus license guide](https://mobian.studio/directus-cms-license/) (secondary)

**Payload (v3)**
- Payload is MIT. The Figma acquisition announcement said the repo stays MIT and self-hosting is unchanged. — [GitHub Discussion #12843 "Payload is joining Figma!"](https://github.com/payloadcms/payload/discussions/12843)
- Enterprise-only features on the enterprise page: SSO, Publishing Workflows, AI Auto-Embedding, A/B Variant Testing, Enterprise AI, Visual Editor (coming soon), Multi-Player Editing (coming soon). No public price. — [Payload Enterprise](https://payloadcms.com/enterprise)
- Multi-tenant plugin and MCP plugin are open-source and free (see the sections below). — [Payload docs: multi-tenant](https://payloadcms.com/docs/plugins/multi-tenant), [Payload docs: MCP](https://payloadcms.com/docs/plugins/mcp)

**Ghost**
- MIT licensed (GitHub). v6.70.0 shipped 2026-10-13. — [TryGhost/Ghost](https://github.com/TryGhost/Ghost)

### Inferences
- **Directus for an agency**: the agency itself probably qualifies for the grant (<$5M, <50 people). But the licensing doc assesses eligibility per "legal entities whose representatives access Directus Studio". If client companies' staff log into Studio, each client entity's size may matter. Large clients (>$5M revenue) logging into a shared instance could push it into paid tiers. This needs written confirmation from licensing@directus.com. "Competing Use" may also be relevant if the agency resells hosted Directus as a CMS service.
- For Strapi, a workflow with scheduled publishing, content history and live preview means paying Growth per instance ($45/mo + seats). SSO via the official route would add $150/mo, so free OIDC means using community plugins.
- Payload has the least licensing risk. Missing from free: approval/publishing workflows (an Enterprise plugin), but these can be approximated with custom fields, access control and hooks.

### Gaps
- Strapi Enterprise and Payload Enterprise prices are not public.
- Directus self-hosted price above Core besides Team $499/mo, and whether Team/Enterprise apply per project (per `PUBLIC_URL`), was not confirmed in primary docs. That matters if the agency runs one instance per client.
- I didn't fetch the full MSCL text or the v12 release notes, so the definition of "Competing Use" as it applies to agencies is unverified.

## Japanese localization of the admin UI

### Takeaway
Payload's Japanese translation is complete (key parity with English) and covers the Lexical editor. Strapi's is mostly there (core admin about 88% of keys, content-manager about 98%), with missing strings falling back to English. Directus ja-JP covers only about 68% of keys, so some English will be visible. Wagtail ships a Japanese locale. Ghost Admin appears to be English-only.

### Cited Findings (computed by key comparison of translation files on main/develop, 2026-10-13)
- Payload `packages/translations/src/languages/ja.ts`: 728 keys vs 728 in `en.ts`, i.e. full key parity. `richtext-lexical` i18n includes `ja`. — [payload ja.ts](https://github.com/payloadcms/payload/blob/main/packages/translations/src/languages/ja.ts), [lexical i18n](https://github.com/payloadcms/payload/blob/main/packages/richtext-lexical/src/i18n.ts)
- Strapi `core/admin` ja.json: 891 keys vs 1005 in en (**88% overlap**). `core/content-manager` ja.json: about 98% of en keys present. — [strapi admin ja.json](https://github.com/strapi/strapi/blob/develop/packages/core/admin/admin/src/translations/ja.json), [content-manager ja.json](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/admin/src/translations/ja.json)
- Directus `app/src/lang/translations/ja-JP.yaml`: 2,072 flattened keys vs 3,062 in en-US (**68%**). Last updated 2026-09-22 via Crowdin sync. — [directus ja-JP.yaml](https://github.com/directus/directus/blob/main/app/src/lang/translations/ja-JP.yaml)
- Wagtail has `wagtail/admin/locale/ja/LC_MESSAGES/django.po` (file present). — [wagtail ja po](https://github.com/wagtail/wagtail/blob/main/wagtail/admin/locale/ja/LC_MESSAGES/django.po)

### Inferences
- Key-count parity says nothing about translation quality. Payload's ja.ts was historically machine-assisted (via its translation script), so expect some stilted wording. It's overridable in config via `i18n.translations`.
- For non-technical Japanese clients: Payload is best, then Strapi (custom-field and plugin labels still English unless translated by you), then Directus (noticeable English gaps, notably in newer v12 features).
- Ghost's admin was not verified in this session. My belief is that Ghost Admin is English-only and Ghost's i18n covers Portal, comments and themes. Treat that as unverified.

### Gaps
- No qualitative review of Japanese wording quality was found for any product.
- Locale coverage for Keystatic, TinaCMS, Decap and Sanity Studio wasn't checked. Decap historically ships a `ja` locale. Sanity Studio has community/official locale plugins (`@sanity/locale-ja-jp`). Both are unverified here.

## Multi-tenancy

### Takeaway
Payload has an official, free multi-tenant plugin (shared DB, `tenant` field, admin tenant selector, enforced per-tenant access). Strapi and Directus have no first-class multi-tenancy: you either run one instance per client or emulate it with roles and permissions on a shared instance. Directus v12's per-instance license enforcement and 3-seat Core cap make "instance per client" costly unless you qualify for the grant.

### Cited Findings
- Payload multi-tenant plugin: officially maintained and "completely open-source". Adds a `tenant` field to specified collections (single database). Has an admin tenant selector. Filters list views and relationship fields by tenant and "rejects writes that assign a tenant the user is not a member of". By default, deleting a tenant deletes its documents. — [Payload docs: Multi-tenant plugin](https://payloadcms.com/docs/plugins/multi-tenant)
- Directus license keys bind to a project and `PUBLIC_URL`. Core is 3 user seats; API-only users don't consume seats. — [Directus licensing overview](https://directus.com/docs/licensing/overview), [Directus pricing](https://directus.com/pricing)
- Strapi's pricing is per instance/project and per seat (Growth $45/mo incl. 3 seats). — [Strapi self-hosted pricing](https://strapi.io/pricing-self-hosted)

### Inferences
- Strapi on a shared instance: RBAC can scope content types per role, but row-level "only this client's entries" needs custom conditions (RBAC conditions API). Media library and global settings leak across clients. Instance per client is the common pattern; on K8s that's N Node pods plus N databases/schemas.
- Directus has strong row-level permission filters (e.g. `client = $CURRENT_USER.client`), so a single instance can be tenant-scoped. But all clients' Studio users count toward seats (3 on Core).
- Payload's plugin fits "one admin with a tenant switcher for the agency; each client sees only their own content". With Next.js multi-domain routing, one Payload app can serve several client sites. The flip side is blast radius: one upgrade or outage hits all clients.

### Gaps
- No published scale limits or benchmarks for the Payload multi-tenant plugin (number of tenants, performance) were found.

## Editor UX (rich text, live preview, images, mobile)

### Takeaway
Payload has the richest free editing stack: Lexical rich text, free live preview, drafts/versions/autosave and scheduled publish in core. v4 (beta) adds an admin redesign, content branching, a better upload UI and tags. Strapi has a clean, approachable Content Manager, but Live Preview is paid and the Blocks editor is fairly basic. Directus is database-first and feels like an admin/data tool to non-technical users; v12 redesigned the Studio and added native draft/publish.

### Cited Findings
- Strapi Live Preview: side-by-side editor and double-click-to-edit in the preview (paid). — [Strapi docs: Preview](https://docs.strapi.io/cms/features/preview)
- Strapi Jun–Aug 2026: publishing warnings when an entry references unpublished content; real links in list rows; component preview screenshots in dynamic zones; Ctrl+Enter save / Ctrl+Shift+Enter publish. **New Media Library (beta, feature flag `betaMediaLibrary`) with folder tree, search/filter, modal asset editing and mobile support, launching 2026-09-16**; S3 credential rotation; SVG uploads blocked by default on new projects. — [Strapi release roundup Jun–Aug 2026](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026)
- Payload 4.0: beta.0 dated 2026-04-22 by one source, but a later source dates beta.0 to 2026-10-09 (conflict noted); canary.39 on 2026-10-08. Features: Admin UI redesign, TanStack Start adapter, content branching, dashboard components, accessibility improvements, hierarchies, tags, grid view, improved file upload UI, file upload versions, rewritten MCP. Default relationship depth goes from 2 to 1. — [Payload releases](https://github.com/payloadcms/payload/releases), [v4.0.0-beta.0](https://github.com/payloadcms/payload/releases/tag/v4.0.0-beta.0), [buildwithmatija: Payload 4.0 status](https://www.buildwithmatija.com/blog/payload-4-0) (secondary)
- Directus v11.13 added content comparison (and native MCP). v12 added native draft/publish workflows and a redesigned Studio. — [Directus v11.13 blog](https://directus.io/blog/directus-v11-13-release), [GitHub v12.0.0](https://github.com/directus/directus/releases/tag/v12.0.0)

### Inferences
- Payload v3's live preview, drafts, versions, autosave and scheduled publish (`versions.drafts.schedulePublish`) are documented core features. I didn't re-fetch those doc pages this session, so verify the details in the docs.
- Payload uploads support focal point and crop, and `imageSizes` uses sharp. Strapi's media library offers crop on upload. Directus has a built-in image transformation API with focal point (v10+). All three are from prior knowledge and weren't re-verified this session.
- Mobile: Strapi's new media library explicitly mentions mobile support. No source rated mobile admin usability for the others.
- None of the three has a free approval workflow out of the box except Directus (via Flows/permissions, or the Grant). Strapi Review Workflows is Enterprise, and Payload Publishing Workflows is Enterprise.

### Gaps
- No independent 2026 usability study comparing editor UX for non-technical users was found.

## Ops: Docker/K8s, upgrades, Postgres + S3, OIDC

### Takeaway
All three run as a single stateless Node container against Postgres with S3-compatible storage, which fits kuki-dc (CNPG + Ceph RGW). Payload is a Next.js app: it can be embedded in the site's Next.js app or deployed separately, and schema lives in code (migrations via Drizzle for Postgres). Strapi v4 is EOL (final v4.26.2 on 2026-06-09). Free OIDC/Keycloak works in Payload and Strapi via community plugins, and in Directus natively but only on the Grant or paid tiers since v12.

### Cited Findings
- Strapi's final v4 release was v4.26.2 (2026-06-09). v5 releases run continuously (v5.49–v5.52 in Jun–Aug; v5.57.0 on 2026-10-07). Added S3 credential rotation support. — [Strapi roundup Jun–Aug 2026](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026), [GitHub](https://github.com/strapi/strapi)
- Strapi has official docs for configuring a Keycloak SSO provider, but that is the paid SSO feature. Free community Strapi 5 plugins: `strapi-plugin-oidc` (Authorization Code + PKCE; works with Keycloak, Authentik, etc.) and `strapi-keycloak-passport` (Keycloak OAuth2, RBAC mapping, Strapi v5, Keycloak 17+). — [Strapi docs: Keycloak](https://docs.strapi.io/cms/configurations/sso-providers/keycloak), [edmogeor/strapi-plugin-oidc](https://github.com/edmogeor/strapi-plugin-oidc), [Strapi Market: Keycloak Passport](https://market.strapi.io/plugins/strapi-keycloak-passport)
- Payload: the official SSO plugin is Enterprise. Free community options: `payload-plugin-oidc` (gousta; OIDC sign-in button, optional user creation), `payload-oauth2` (WilsonLe, MIT, about 17.9k weekly downloads, last published May 2026), and `payload-authjs` (Auth.js v5). — [gousta/payload-plugin-oidc](https://github.com/gousta/payload-plugin-oidc), [payload.market OAuth2](https://payload.market/item/payload-oauth2-IOLWOH7), [CrawlerCode/payload-authjs](https://github.com/CrawlerCode/payload-authjs)
- Directus: OIDC via `AUTH_PROVIDERS` with the `openid` driver is unchanged in v12, but SSO is excluded from Core and requires the Grant or Team+. — [Contensu](https://contensu.com/blog/what-happens-to-sso-in-directus-v12), [Directus pricing](https://directus.com/pricing)
- Payload Cloud paused new sign-ups after the Figma deal, so self-hosting is the path anyway. — [search summary of Figma/Payload coverage; e.g. CMSWire](https://www.cmswire.com/digital-experience/when-cms-meets-ux-design-what-figmas-payload-deal-really-means/) (secondary)

### Inferences
- Upgrade pain: Strapi v4→v5 was a major breaking migration (Document Service API, `documentId`, response format flattening; Strapi provides `npx @strapi/upgrade` codemods). Expect a similar step for any future v6. Payload v3→v4 is coming (beta now), and its breaking changes (default depth, `forceSelect`) look moderate. Directus v11→v12 adds license enforcement on top of features.
- Backups for all three are Postgres dumps (CNPG backups to RGW) plus the S3 bucket. That's relevant given the memory note that some kuki-dc DBs had no backups.
- Resource use (prior knowledge, not re-verified): each is one Node process at roughly 300–700MB RAM. Payload embedded in Next.js inherits the Next build and SSR footprint.

### Gaps
- No primary 2026 resource benchmarks were found.
- Official Helm charts: none are first-party for Strapi or Payload. Directus has community Helm charts. Not verified this session.
- Maturity of the community OIDC plugins (maintenance, security review) wasn't assessed. `payload-plugin-oidc` shows low weekly downloads (68, per search snippet).

## MCP / AI integration for drafting with Claude

### Takeaway
All three now ship first-party MCP servers. Payload: `@payloadcms/plugin-mcp`, stable since 3.78 (Feb 2026), MIT. Strapi: native MCP, beta in 5.47 and GA in 5.49 (June 2026), with agent actions in audit logs from 5.52. Directus: native MCP since v11.12/11.13 with OAuth 2.1 in v12, plus a built-in AI Assistant. All enforce the CMS's own permissions.

### Cited Findings
- Payload `@payloadcms/plugin-mcp`: stable; HTTP MCP endpoint; Bearer API keys managed in the admin; per-key capabilities on top of enabled collections/globals; access inherits from the associated Payload user; CRUD on collections, find/update on globals, custom tools/prompts/resources; open source. — [Payload docs: MCP plugin](https://payloadcms.com/docs/plugins/mcp)
- The Payload MCP plugin went stable in 3.78 (Feb 2026) and is "reworked" in v4. — [elitecontentmarketer review](https://www.elitecontentmarketer.com/stack/payload-cms/) (secondary), [buildwithmatija 4.0](https://www.buildwithmatija.com/blog/payload-4-0) (secondary)
- Strapi MCP: beta from 5.47 (2026-05-28), GA in v5.49.0. Tools for list/read/create/update/delete/publish/unpublish. Sessions tied to an Admin token with permissions enforced at tool visibility, field filtering and runtime. i18n locale params. Plugin API `strapi.ai.mcp.registerTool()`, later typed `defineTool/defineResource/definePrompt`. Agent actions recorded in audit logs (v5.52; audit logs are an Enterprise feature). — [Strapi: MCP server GA](https://strapi.io/blog/the-strapi-mcp-server-is-now-ga), [Strapi roundup Jun–Aug 2026](https://strapi.io/blog/strapi-release-roundup-everything-that-changed-between-june-and-august-2026)
- Directus: built-in MCP server (disabled by default; Settings → AI → Model Context Protocol; endpoint `/mcp`) using existing permissions, with changes logged in activity. v11.13 announced "Native MCP Support". AI Assistant chat in Studio (Dec 2025) supports OpenAI, Anthropic, Gemini and Ollama. v12 adds OAuth 2.1 for MCP. — [Directus docs: MCP](https://directus.com/docs/guides/ai/mcp), [Directus v11.13 blog](https://directus.io/blog/directus-v11-13-release)
- Strapi AI (in-admin generation) is a paid Growth feature with 1,000 credits/month. — [Strapi pricing](https://strapi.io/pricing-self-hosted)

### Inferences
- For "Claude drafts, client approves": an MCP client creates drafts with a key limited to create/update and no publish. Payload's per-key capability model and Strapi's admin-token scoping both support this. Pair it with drafts so humans publish.
- Whether the Strapi MCP server works on Community (free) wasn't explicitly confirmed. The blogs don't mark it paid, but the audit trail for agent actions only applies on Enterprise.

### Gaps
- MCP OAuth support for Claude.ai remote connectors: Directus v12 has OAuth 2.1. Payload and Strapi appear to be API-key/token-based, which means Claude Desktop/Code can connect via header, but the claude.ai web connector would need OAuth. Not verified.

## Community health and company backing (incl. Figma–Payload)

### Takeaway
All three are very active, with commits on 2026-10-13 and releases within the past month. Figma acquired Payload (announced 2025-06-17). Payload stays MIT, the team joined Figma, and Payload Cloud closed to new sign-ups. Directus's v12 relicensing to MSCL with key enforcement is the main 2026 governance and risk event.

### Cited Findings
- "Payload is joining Figma!" was the official announcement. The repo stays MIT and self-hosting is unchanged. — [GitHub Discussion #12843](https://github.com/payloadcms/payload/discussions/12843); date 2025-06-17 per [Crain's Grand Rapids](https://www.crainsgrandrapids.com/news/technology/grand-rapids-tech-firm-acquired-by-san-francisco-web-designer/) / search summary
- Payload Cloud paused new sign-ups after the acquisition. — [CMSWire analysis](https://www.cmswire.com/digital-experience/when-cms-meets-ux-design-what-figmas-payload-deal-really-means/) (secondary)
- Release cadence: Strapi v5.49→v5.52 in about 2 months (Jun–Aug 2026), now v5.57.0. Payload v3.90.2 plus v4 canaries. Directus v12.5.0. — GitHub API (see snapshot table)
- Directus relicensing (BSL → MSCL) drew community criticism ("Is Directus dead?"). — [Medium](https://medium.com/@kutubkhanmakda/is-directus-dead-the-truth-behind-v12-the-mscl-license-and-new-pricing-restrictions-8505353096ed) (opinion piece)

### Inferences
- Payload now has deep-pocketed backing, but its roadmap is tied to Figma's design-to-code strategy (Visual Editor, Figma integration). The risk is that future value-add lands in Enterprise or Figma-only features. The MIT core keeps a fork option open.
- Strapi is VC-backed, with open-core monetization steadily moving editor features (live preview, releases, history) into paid tiers.

### Gaps
- No primary source on Payload headcount or roadmap commitments post-acquisition beyond the announcement.

## Brief notes on the other options

### Takeaway
None of these fits "many non-technical Japanese clients, Postgres, S3, OIDC, multi-tenant" as well as Payload or Strapi. Git-based CMSs (Keystatic, Decap, TinaCMS) are simple and cheap but commit to Git, so they lack DB, RBAC and approvals. Ghost is excellent for blogs and newsletters but MySQL-only and blog-shaped. Sanity's Content Lake is SaaS. Wagtail is mature and Japanese-capable but Python/Django and not headless-first. Headless WordPress has the best editor familiarity in Japan, but the ops and security burden is high and it needs MySQL.

### Cited Findings
- Keystatic: MIT, 2.5k stars, @keystatic/core 0.6.9 (2026-08-26), still 0.x. — [GitHub](https://github.com/Thinkmill/keystatic), [npm](https://www.npmjs.com/package/@keystatic/core)
- TinaCMS: Apache-2.0, 13.8k stars, active (2026-10-12 package release). — [GitHub](https://github.com/tinacms/tinacms)
- Decap CMS: MIT, 19.4k stars, 3.16.3 (2026-09-22). — [GitHub](https://github.com/decaporg/decap-cms)
- Ghost: MIT, 55.5k stars, v6.70.0 (2026-10-13). — [GitHub](https://github.com/TryGhost/Ghost)
- Sanity Studio: MIT, v6.19.0 (2026-10-13). Studio is self-hostable, but content lives in Sanity's hosted Content Lake. — [GitHub](https://github.com/sanity-io/sanity)
- Wagtail: BSD-3, v8.0 (2026-08-25). Japanese admin locale present. — [GitHub](https://github.com/wagtail/wagtail), [ja .po](https://github.com/wagtail/wagtail/blob/main/wagtail/admin/locale/ja/LC_MESSAGES/django.po)

### Inferences (prior knowledge, not re-verified this session)
- Ghost requires MySQL 8 in production (no Postgres), and its admin is English-only. It has no OIDC without proxy hacks.
- TinaCMS's self-hosted backend needs its own database adapter. Visual editing is its strength.
- Wagtail has free OIDC via `mozilla-django-oidc`, Postgres and S3 via `django-storages`, and a headless API, plus multi-site support. It's a Python stack rather than the agency's Go/Node stack.

### Gaps
- Japanese locale quality and OIDC options for Tina, Keystatic, Decap and Sanity weren't verified this session.

## Overall fit (inference for report writer)
- **Best fit: Payload v3 (move to v4 when stable).** It's MIT with no paywall on drafts, versions, scheduled publish, live preview, multi-tenant or MCP. It's Next.js-native, runs on Postgres with the S3 storage adapter, and has the best Japanese coverage. Gaps to cover yourself: OIDC via a community plugin, and an approval workflow (custom, or Enterprise). Risks: Figma's direction, and the v3→v4 migration soon.
- **Runner-up: Strapi v5 Community.** It has the friendliest Content Manager and a free MCP server. But Live Preview, Releases (scheduling) and History cost $45+/mo per instance, approval workflows are Enterprise-only, and SSO is paid unless you use community plugins.
- **Directus v12:** strongest data, permissions and AI tooling (MCP with OAuth 2.1, AI Assistant), but Japanese UI coverage is about 68% and the new MSCL license has key enforcement. The free Core tier is limited to 3 seats with no SSO unless the agency qualifies for the grant, and how that applies to client staff is unclear. Get written confirmation from Directus before choosing it.
