# How global SaaS / B2B tech companies structure marketing content (blog vs evergreen pages)

Method note: Pages were fetched on 2026-10-13 with curl, a reader proxy (r.jina.ai, used for Cloudflare, which returns 403 to bots) and WebFetch. "Verified" means the URL was fetched and its final URL and status were recorded. Anatomy data (H2s, JSON-LD dates, CTA labels, table counts) was extracted from raw HTML by script. Stripe geo-redirects from Japan: `stripe.com/guides` becomes `/jp/guides` and `stripe.com/resources/more/...` becomes `/en-jp/resources/more/...`. The global canonical paths are the same without the locale prefix. Navigation placement comes from checking homepage HTML for link positions before or after the `<footer>` element. A "pre-footer" link may sit in the mega-menu or in the page body, so it is reported as "header/body".

## 1. URL design per content type

### Takeaway
Every company keeps evergreen content in **subfolders on the main domain**. The URL is a short type prefix (`/glossary/`, `/learning/`, `/fundamentals/`, `/resources/more/`, `/kb/guide/`, `/customers/`) followed by a slug. Topic or category nesting appears only in hub-style learning centers (Cloudflare `/learning/ddos/...`, Atlassian `/agile/agile-at-scale/okr`). Blogs are the only content type still put on a subdomain, and only at HubSpot and Cloudflare. Several companies renamed or merged evergreen sections in 2025–26 and redirected the old paths. Databricks folded its glossary into the blog, Snowflake renamed guides and trending to "fundamentals", and Vercel renamed guides to the knowledge base.

### Cited Findings
**Databricks**
- Blog: `https://www.databricks.com/blog`, with categories at `/blog/category/databricks-ai`. Verified 200. — [Databricks Blog](https://www.databricks.com/blog)
- **Glossary has been merged into the blog.** `/glossary` still loads, titled "Glossaries Archive". Individual term URLs now redirect to blog posts named "what-is-X": `/glossary/agentic-ai` → `/blog/what-is-agentic-ai`, `/glossary/acid-transactions` → `/blog/what-are-acid-transactions`, `/glossary/apache-kudu` → `/blog/what-is-apache-kudu`. The redirected pages carry `BlogPosting` JSON-LD with author "Databricks Staff". — [Databricks glossary archive](https://www.databricks.com/glossary), [What are ACID transactions](https://www.databricks.com/blog/what-are-acid-transactions)
- `/discover` redirects to `/discover/data-lakes`, a multi-page "discover" guide hub with subpages such as `/discover/data-lakes/best-practices`, `/challenges`, `/history`. `/discover/data-lakes/introduction` itself redirects back to `/discover/data-lakes`. `/discover/data-warehouse` is linked from the homepage FAQ. — [Databricks Discover: Data Lakes](https://www.databricks.com/discover/data-lakes)
- Customer stories live at `/customers`. — [Databricks Customer Stories](https://www.databricks.com/customers)

**Snowflake**
- `/en/guides/` returns a 404 page, and `/trending/` redirects to **`/en/fundamentals/`** ("AI Data Cloud Fundamentals"). Fundamentals articles nest by topic, for example `/en/fundamentals/ai-security/agents/`, `/en/fundamentals/observability/cloud/`, `/en/fundamentals/observability-vs-monitoring/`. Developer how-tos moved to `/en/developers/guides`. — [Snowflake Fundamentals](https://www.snowflake.com/en/fundamentals/), [Observability vs. Monitoring](https://www.snowflake.com/en/fundamentals/observability-vs-monitoring/)
- Blog: `/en/blog/`. Customers: `/en/customers/all-customers/{format}/{slug}/`, where the URL carries the format: `case-study/mercury/`, `snapshot/canva/`, `video/mandai-wildlife-group/`. — [Snowflake Customers](https://www.snowflake.com/en/customers/), [Mercury case study](https://www.snowflake.com/en/customers/all-customers/case-study/mercury/)
- Every path has a locale prefix: `/en/`, `/ja/`, `/de/` and so on.

**HubSpot**
- Blog is on a **subdomain**, `blog.hubspot.com/{section}/{slug}`, for example `https://blog.hubspot.com/marketing/loop-marketing`. — [HubSpot Blog post](https://blog.hubspot.com/marketing/loop-marketing)
- Resources hub: `www.hubspot.com/resources`. Templates: `/resources/templates` (title "285 Free Resources"), with single templates at `/resources/templates/marketing-dashboard`. — [HubSpot Resources](https://www.hubspot.com/resources), [Marketing dashboard template](https://www.hubspot.com/resources/templates/marketing-dashboard)
- Case studies: `/case-studies/{slug}`, with industry directories at `/case-studies/directory/{industry}`. — [HubSpot Case Studies](https://www.hubspot.com/case-studies), [Unipart](https://www.hubspot.com/case-studies/unipart)
- Academy is on a subdomain, `academy.hubspot.com`. Localized sites use ccTLDs (`hubspot.jp/resources`, `hubspot.de/resources`). — [HubSpot Resources](https://www.hubspot.com/resources)

**Stripe**
- `/guides` holds long-form guides (`/guides/introduction-to-online-payments`, `/guides/atlas/building-your-finance-team`). `/resources/more` holds short explainers (`/resources/more/card-authorization-explained`, `/resources/more/accounting-reconciliation-101`) plus topic hubs (`/resources/more/billing`, `/resources/more/accounting`). Customers: `/customers/{slug}` and `/customers/all`. Blog: `/blog`. — [Stripe guides](https://stripe.com/guides), [Stripe resources/more](https://stripe.com/resources/more), [Card authorization explained](https://stripe.com/resources/more/card-authorization-explained), [Stripe customers](https://stripe.com/customers)

**Cloudflare**
- Learning Center: `/learning/{topic}/{slug}/` and `/learning/{topic}/glossary/{slug}/`. The glossary sits *inside* each topic: `/learning/ddos/glossary/tcp-ip/`, `/learning/ddos/glossary/malware/`. — [What is a DDoS attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
- Blog is on a **subdomain**, `blog.cloudflare.com`. Case studies: `/case-studies/{slug}/`. — [Cloudflare Blog](https://blog.cloudflare.com/), [Gusto case study](https://www.cloudflare.com/case-studies/gusto/)

**Vercel**
- `/guides` **redirects to `/kb`** ("Vercel Knowledge Base: Guides, Videos, and Tutorials"). Single guides are at `/kb/guide/{slug}`, and topic hubs at `/kb/nextjs`, `/kb/security`, `/kb/ai-gateway`. — [Vercel KB](https://vercel.com/kb), [Agentic commerce readiness guide](https://vercel.com/kb/guide/agentic-commerce-readiness)
- Customers: `/customers/{long-sentence-slug}`, for example `/customers/shopify-and-vercel-are-rebuilding-hydrogen-for-faster-storefronts`. Blog: `/blog`. Templates: `/templates`. — [Vercel customers](https://vercel.com/customers)

**Atlassian**
- The evergreen hubs are deeply nested topic trees under top-level subjects: `/agile/agile-at-scale/okr`, `/agile/advantage/agile-mindset`, `/work-management/knowledge-sharing/documentation/process-documentation`. Some links in that tree return 404 (`/work-management/knowledge-sharing/documentation/standard-operating-procedures`), a sign of link rot. — [Atlassian Agile](https://www.atlassian.com/agile), [OKR guide](https://www.atlassian.com/agile/agile-at-scale/okr), [Work management](https://www.atlassian.com/work-management)
- Blog: `/blog` (titled "Inside Atlassian"). Customers: `/customers/{company}`. — [Atlassian blog](https://www.atlassian.com/blog), [Cisco story](https://www.atlassian.com/customers/cisco)

**Zapier**
- Everything editorial, including "best apps" comparisons, sits in a flat `/blog/{slug}/`, for example `/blog/best-crm-app/`. The category appears only on listing pages (`/blog/all-articles/best-apps/`, `/blog/all-articles/app-comparisons/`). — [Zapier best CRM](https://zapier.com/blog/best-crm-app/), [Zapier blog](https://zapier.com/blog/)
- Programmatic integration pages: `/apps`, `/apps/{app}/integrations`, `/apps/categories/{cat}`. Customer stories: `/customer-stories/{slug}`. Guides: `/resources/guides/{slug}`. Also `/templates` and `/compare`. — [Zapier apps](https://zapier.com/apps), [Okta story](https://zapier.com/customer-stories/okta)

**Notion**
- Templates: `/templates`, `/templates/category/{cat}`, a marketplace of "30,000+" templates. Customers: `/customers/{company}`. `/help/guides` **redirects to `/help`**. Academy is a subdomain, `academy.notion.com`. — [Notion templates](https://www.notion.com/templates), [Notion customers](https://www.notion.com/customers), [Notion help](https://www.notion.com/help)

**Ahrefs / Semrush**
- Ahrefs: blog at `/blog/` with categories such as `/blog/category/product-blog/`, academy at `/academy`, glossary at `/seo/glossary/{term}` (title "190+ Terms"), comparisons at `/vs`, `/vs/semrush`, `/vs/profound`. — [Ahrefs glossary](https://ahrefs.com/seo/glossary), [301 redirect](https://ahrefs.com/seo/glossary/301-redirect), [Ahrefs vs Semrush](https://ahrefs.com/vs/semrush)
- Semrush: blog at `/blog/{slug}/` with categories only on listing pages (`/blog/category/marketing/ai/`), academy at `/academy/`, knowledge base at `/kb/`, news at `/news/{id}-{slug}/`, comparisons at `/vs/` (footer). No `/glossary` link was found on the homepage. — [Semrush blog](https://www.semrush.com/blog/), [Semrush academy](https://www.semrush.com/academy/), [Semrush KB](https://www.semrush.com/kb/)

### Inferences
- Single articles use flat slugs (`/blog/slug`, `/glossary/slug`, `/resources/more/slug`). Topic nesting is reserved for curated hubs that work like a book (Cloudflare, Atlassian, Snowflake fundamentals, Databricks discover).
- Renames and redirects are common (Databricks glossary→blog, Snowflake trending/guides→fundamentals, Vercel guides→kb, Notion help/guides→help), so a URL scheme should expect consolidation later. Short type prefixes and stable slugs make that easier.
- Subdomain blogs survive only at companies whose blog predates the current site (HubSpot, Cloudflare). No company in the set puts evergreen SEO content on a subdomain.

### Gaps
- No public statement explaining Databricks' glossary→blog consolidation was found. It was observed from redirects only. The modified dates on the redirected pages (April and September 2026) suggest it happened in 2026.
- The date of Snowflake's trending/guides→fundamentals change was not confirmed.

## 2. Navigation placement

### Takeaway
**Customer stories and the blog are near-universal in the header mega-menu** (usually under "Resources", "Learn" or "Company"). **Evergreen SEO libraries (glossaries, learning centers, explainers) are usually footer-only or not linked from the homepage at all.** They exist to collect search traffic, not to be browsed. Comparison ("vs") pages are footer-only.

### Cited Findings (homepage HTML link positions, 2026-10-13)
- Databricks: `/blog`, `/customers`, `/resources`, `/learn`, `/discover` (as FAQ links), `/university` are in the header/body. **`/glossary` has zero links on the homepage.** Homepage FAQ links point to blog "what-is" posts and `/discover/data-warehouse` with tracking `itm_data=homepage-faq-prefooter`. — [Databricks home](https://www.databricks.com/)
- Snowflake: the homepage links to `/ja/fundamentals/` and `/developers/guides/` once each (probably the language-switch/nav markup). The fundamentals pages link back to `/en/resources/`. Most navigation is JS-rendered, so placement could not be determined fully. — [Snowflake home](https://www.snowflake.com/en/)
- HubSpot: blog, `/resources`, `/resources/templates`, `/case-studies`, academy are all in the header/body. — [HubSpot home](https://www.hubspot.com/)
- Stripe: `/guides`, `/customers`, `/blog` are in the header/body. **`/resources/more` and `/sessions` are footer-only.** — [Stripe home](https://stripe.com/)
- Cloudflare: **`/learning/`, `/case-studies/` and `blog.cloudflare.com` are all footer-only** on the homepage. The header shows "Resources" → `/resource-hub/`. On Learning Center pages, the header is Products / Solutions / Resources / Pricing. — [Cloudflare home](https://www.cloudflare.com/), [Cloudflare DDoS page](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
- Vercel: `/kb`, `/blog`, `/customers`, `/docs`, `/changelog` are in the header/body. `/templates` is footer-only on the homepage. — [Vercel home](https://vercel.com/)
- Atlassian: `/agile`, `/work-management/...`, `/team-playbook`, `/blog`, `/customers` are in the header/body (mega-menu "Resources"). — [Atlassian home](https://www.atlassian.com/)
- Zapier: `/blog` (34 links, including direct links to "best X app" posts), `/apps` (127), `/customer-stories`, `/resources/guides`, `/templates` are in the header/body. `/compare` appears in both header/body and footer. — [Zapier home](https://zapier.com/)
- Notion: `/templates`, `/customers`, `/help`, academy are in the header/body. No `/blog` link on the homepage. — [Notion home](https://www.notion.com/)
- Ahrefs: `/blog`, `/academy` are in the header/body. **`/vs`, `/vs/semrush`, `/vs/profound` are footer-only.** **`/seo/glossary` is not linked from the homepage.** No `/customers` or case-study links. — [Ahrefs home](https://ahrefs.com/)
- Semrush: `/blog`, `/academy`, `/kb`, `/news`, `/features` are in the header/body. `/vs/` is footer-only. No glossary link. — [Semrush home](https://www.semrush.com/)

### Inferences
- Navigation splits by audience. Things a buyer browses (customers, blog, templates, docs) go in the header. Things a searcher lands on from Google (glossary, learning center, "vs") are reached from search and internal links, and appear in the footer at most.
- Glossary pages connect through hub pages (`/glossary`, `/learning/`) and related links from other articles. They do not depend on the global nav.

### Gaps
- The full mega-menu contents for JS-rendered navs (Snowflake, parts of Atlassian and HubSpot) were not captured in a rendered browser. Placement is based on the HTML only.

## 3. Role split: blog vs guide vs glossary vs comparison vs case study

### Takeaway
- The **blog** carries timely items: news, launches, opinion, research, company updates. It increasingly also absorbs "what is" evergreen articles (Databricks, Zapier, Semrush, HubSpot).
- **Guides and learning centers** are curated, structured, long-lived explanations organized as a library (Stripe guides, Cloudflare Learning, Atlassian Agile Coach, Snowflake Fundamentals, Vercel KB).
- **Glossaries** are short definitional pages for top-of-funnel keywords.
- **Comparisons** split two ways. "Best X apps" listicles live in the blog (Zapier). Branded "us vs competitor" pages live on product-marketing URLs (`/vs/`).
- **Case studies** are proof assets kept separate under `/customers` and filterable by industry and product.

### Cited Findings
- Blog posts are dated, with timely or essay content. HubSpot's "The future of marketing isn't humans vs. AI" (2026-08-31) promotes a book pre-order. Semrush's homepage links blog research such as "AI overviews commercial search study". — [HubSpot post](https://blog.hubspot.com/marketing/loop-marketing), [Semrush blog](https://www.semrush.com/blog/)
- Atlassian's blog is titled "Inside Atlassian" (company and team content). The education material sits in `/agile` and `/work-management`. — [Atlassian blog](https://www.atlassian.com/blog), [Atlassian agile](https://www.atlassian.com/agile)
- Stripe uses two tiers of evergreen content. `/guides` holds long multi-chapter guides (introduction-to-online-payments is about 6,900 words and has a "Download PDF" option). `/resources/more` holds shorter single-topic explainers of about 3,400 words. — [Stripe guide](https://stripe.com/guides/introduction-to-online-payments), [Stripe explainer](https://stripe.com/resources/more/card-authorization-explained)
- Cloudflare Learning Center pages are "What is X" explainers with learning objectives, organized into topic sections (DDoS, DNS and others), each with its own glossary. — [Cloudflare DDoS page](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
- Zapier's "best apps" comparison listicles are blog posts (`/blog/best-crm-app/`, "The 11 best CRM software in 2026"), listed under `/blog/all-articles/best-apps/`. — [Zapier best CRM](https://zapier.com/blog/best-crm-app/)
- Foundation Inc reports the Zapier listicles drive about 455k sessions a month and rank on 287k keywords across about 100 posts, a little over half of blog traffic. Integration pages are programmatic: about 50k app landing pages, 25k ranking in the top 100. These are third-party estimates. — [Foundation Inc: Zapier listicles](https://foundationinc.co/lab/zapier-listicles-seo), [StrategyBreakdowns](https://strategybreakdowns.com/p/zapier-automatic-traffic-machine)
- Ahrefs' branded comparison `/vs/semrush` is a product-marketing page: "18 things only Ahrefs can do", 2 comparison tables, 6 sign-up CTAs, plus a section titled "Semrush got acquired by Adobe". — [Ahrefs vs Semrush](https://ahrefs.com/vs/semrush)
- Snowflake fundamentals cover both definitions and "X vs Y" comparisons of concepts (not competitors), such as "Observability vs. Monitoring: Comparison Guide". — [Snowflake fundamentals](https://www.snowflake.com/en/fundamentals/observability-vs-monitoring/)
- HubSpot templates are gated downloads: the "Download Template" CTA appears 12 times on the marketing-dashboard page, which is about 570 words with an FAQ and `SoftwareApplication`/`Offer` schema. — [HubSpot template](https://www.hubspot.com/resources/templates/marketing-dashboard)

### Inferences
- The line between "blog" and "evergreen" is becoming an editorial and template decision more than a URL decision. Databricks moved glossary terms into `/blog/what-is-*`, while Zapier and Semrush always kept evergreen material in the blog. The companies that keep a separate evergreen section (Cloudflare, Stripe, Snowflake, Atlassian, Vercel) treat it as a curated library with its own template and hierarchy.
- Comparisons of concepts ("X vs Y") belong to the evergreen library. Competitor comparisons are sales pages under `/vs/`, kept out of the nav.

### Gaps
- No internal editorial guideline from these companies defining "what goes in blog vs guide" was found.

## 4. Anatomy of guide and glossary pages

### Takeaway
The common template has five parts:
1. An H1 phrased as a question ("What is X?") with a **one-sentence definition immediately after it**.
2. A **table of contents** ("On this page" / "Table of contents").
3. H2s that cover definition, how it works, types, use cases, "X vs Y", challenges, best practices, then an FAQ.
4. A closing **"How [product] can help"** section.
5. A **light CTA** (one or two "Try/Start/Sign up" buttons, usually at the end, sometimes sticky), plus "Additional resources" and related links.

Comparison tables are common only in Snowflake fundamentals and Zapier listicles. FAQ blocks and FAQ schema are spreading.

### Cited Findings
- **Cloudflare**: breadcrumb "Learning Center / DDoS attacks", then H1 "What is a DDoS attack?", then a one-sentence definition. Next come a sidebar list of all articles in the topic (including the `/glossary/` items), a "Learning objectives — After reading this article you will be able to: Define… Explain… Identify…" box, a "Related content" link, an "On this page" TOC, and H2s (What is / How does it work / common types / How is it mitigated). The article ends in "Getting started", and the footer has Plans and Contact sales. — [Cloudflare DDoS page](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) (via reader proxy; inline product mentions may have been trimmed by the extraction)
- **Databricks (glossary-now-blog)**: has a "Table of contents". H2s on the ACID page: What is a transaction / properties / Why… / "Delta Lake: Reliable…" (the product section) / Additional Resources / Frequently Asked Questions / Sign up. CTAs: one "Try Databricks" and one "Sign up". There are no tables. — [Databricks ACID](https://www.databricks.com/blog/what-are-acid-transactions)
- Foundation Inc's description of the Databricks glossary template: a definitional header and intro, imagery, 400–600 words of secondary headers with related keywords, "Additional resources" internal links, and a "non-intrusive signup button at page bottom". They report it ranks for 14,000+ keywords and would cost about $225k in Google Ads to match. (Third-party estimate, April 2024.) — [Foundation Inc: Databricks glossary](https://foundationinc.co/lab/databricks-keyword-glossary)
- **Snowflake fundamentals**: JSON-LD `TechArticle` + `DefinedTerm`/`DefinedTermSet`. H2s run difference → technical differences → use cases → implementation → migration → best practices and pitfalls → FAQs → Resources. The page has **14 tables**. CTAs: "Download now" (gated asset) and "Start for free". — [Snowflake observability vs monitoring](https://www.snowflake.com/en/fundamentals/observability-vs-monitoring/)
- **Stripe explainer**: H2s are all questions (What is card authorization? How does it work? …), ending with "How Stripe Payments can help". CTAs: "Contact sales" ×5, "Start now" ×3. — [Stripe card authorization](https://stripe.com/resources/more/card-authorization-explained)
- **Stripe guide**: segmented by audience ("For online retailers", "For SaaS and subscription companies", "For platforms and marketplaces"), plus "Additional reading" and a "Payments glossary" section. "Download PDF" ×2. — [Stripe guide](https://stripe.com/guides/introduction-to-online-payments)
- **Vercel KB guide**: "8 min read", `TechArticle` + `BreadcrumbList` + `FAQPage` JSON-LD, anchor-linked H2s (checklist, how to test, Next steps, Read more, Frequently asked questions), "More Next.js guides", and a "Ready to deploy?" CTA block. — [Vercel guide](https://vercel.com/kb/guide/agentic-commerce-readiness)
- **Atlassian OKR guide**: about 5,900 words, `Article` + `BreadcrumbList` JSON-LD. CTAs mix product and template: "Get started", "Get it free", "Use template". — [Atlassian OKR](https://www.atlassian.com/agile/agile-at-scale/okr)
- **Ahrefs glossary**: H2s are "What is a 301 redirect? / Why important / How to implement / How to find and fix 301 redirect issues on your site". The last section is where the product comes in (the site-audit use case). CTAs: "Get started" ×2. Only `BreadcrumbList` schema. — [Ahrefs 301](https://ahrefs.com/seo/glossary/301-redirect)
- **Zapier best-apps listicle**: about 8,400 words, "28 min read". Order: "What makes the best CRM platform?" (methodology), "at a glance" comparison table, then numbered "Best CRM for [use case]" sections. Zapier's own CTAs are minimal ("Try Zapier", "Sign up"). — [Zapier best CRM](https://zapier.com/blog/best-crm-app/)
- **Semrush blog guide**: "8 min read", "Table of contents", final H2 "GET STARTED WITH SEMRUSH TODAY". It has many CTA variants ("Start free trial", "Try free for 7 days", "Book a demo", "Create free account"), the heaviest CTA load in the sample. — [Semrush banner ad sizes](https://www.semrush.com/blog/banner-ad-sizes/)

### Inferences
- CTA intensity follows the business model. Infrastructure and enterprise vendors (Cloudflare, Databricks, Snowflake) keep one or two CTAs at the end. PLG SEO-tool vendors (Semrush) place CTAs throughout. Stripe pairs "Contact sales" with "Start now".
- Product insertion follows a fixed pattern: generic explanation first, then a dedicated product section near the end ("How Stripe Payments can help", "Delta Lake: …", "How to find and fix … on your site").

### Gaps
- Sticky CTA behavior could not be verified without a rendered browser.

## 5. How case studies relate to product pages

### Takeaway
Every company in the set uses a **separate top-level `/customers` (or `/case-studies`, `/customer-stories`) section**, not nested under product URLs. The index page is filterable by **industry, product, region and company size**. Product and industry pages pull individual stories in as tiles. Story pages use a Challenge → Solution → Results structure and a sales-led CTA.

### Cited Findings
- The Databricks customers index has "Industries" and "Product" facets. — [Databricks customers](https://www.databricks.com/customers)
- The Snowflake customers index has region / Product / Industries facets. Its URLs encode content format (case-study / snapshot / video). — [Snowflake customers](https://www.snowflake.com/en/customers/)
- The Stripe customers index shows a "ProductUsed" component (products used per story) and an `/customers/all` listing. A story page (`/customers/atlassian`) has the H2s **Challenge / Solution / Results** and "Contact sales" ×5. — [Stripe customers](https://stripe.com/customers), [Stripe Atlassian story](https://stripe.com/customers/atlassian)
- The Atlassian customers index queries industry, region and product collections (GraphQL markup in HTML). The Cisco story is about 5,200 words with "Download Cisco PDF", "Try Atlassian cloud today" and `dateModified` 2026-06-09. — [Atlassian customers](https://www.atlassian.com/customers), [Cisco](https://www.atlassian.com/customers/cisco)
- HubSpot uses industry directory pages (`/case-studies/directory/construction` and others) plus Team Size and Products facets. Its story H1s are outcome headlines ("Unipart Unifies 5 Divisions to Grow its Global Pipeline from Millions to Billions"), with a "Get a demo" CTA. — [HubSpot case studies](https://www.hubspot.com/case-studies), [Unipart](https://www.hubspot.com/case-studies/unipart)
- The Notion customers index has Region and Team size facets. Its stories are use-case-led ("Figma's knowledge base keeps everyone informed and aligned"), with "Request a demo" ×3 and a "How other teams use Notion" related block. — [Notion customers](https://www.notion.com/customers), [Notion Figma](https://www.notion.com/customers/figma)
- The Vercel customers index has industry and product facets (`products/previews`, `products/observability`). Its story slugs are full headlines. — [Vercel customers](https://vercel.com/customers)
- Zapier customer stories end with "See what automation can do for your business" and "Contact sales". — [Zapier Okta](https://zapier.com/customer-stories/okta)
- Homepages pull stories into product context. Snowflake's homepage links case studies directly (AT&T, Pfizer, ICE). Databricks tracks `homepage-customerstories-middle-cta-seemorecustomerstories`. — [Snowflake home](https://www.snowflake.com/en/), [Databricks home](https://www.databricks.com/)

### Inferences
- The pattern is one canonical story URL with many entry points: product pages, industry pages and the homepage embed tiles, and the faceted index handles discovery. None of the companies duplicates stories under product paths.
- Case-study CTAs are sales-led (demo or contact sales) even at PLG companies. Glossary CTAs are self-serve (sign up or try).

### Gaps
- It was not verified which specific product pages embed which stories (this would need rendered pages).

## 6. Freshness signals: updated dates, authors, reviewers

### Takeaway
How freshness is shown varies widely. Editorial publishers with SEO-driven blogs (Zapier, Semrush, HubSpot) show **named authors and published/updated dates**. Corporate evergreen libraries (Cloudflare, Ahrefs glossary, Databricks, Snowflake, Stripe) usually use **organizational authorship** ("Databricks Staff", "Snowflake", "Stripe") or none, and expose freshness mainly through **JSON-LD `dateModified`**. Stripe also shows a visible "Last updated". No "Reviewed by" or fact-check bylines were found in the sample. Old URLs are kept and refreshed instead of republished, with the year in the title updated.

### Cited Findings
- Zapier best CRM: JSON-LD `datePublished` "September 23, 2014", `dateModified` "June 22, 2026", author Miguel Rebelo, with the title updated to "in 2026". The URL has stayed the same since 2014. — [Zapier best CRM](https://zapier.com/blog/best-crm-app/)
- Stripe explainer: visible "**Last updated April 9, 2026**" against JSON-LD `datePublished` 2022-10-06, author "Stripe". — [Stripe card authorization](https://stripe.com/resources/more/card-authorization-explained)
- Databricks: `article:published_time` 2021-07-27 and `article:modified_time` 2026-09-30 on the ACID page. On Apache Kudu, published 2018, modified 2026-04-20. Author "Databricks Staff". — [Databricks ACID](https://www.databricks.com/blog/what-are-acid-transactions), [Databricks Kudu](https://www.databricks.com/blog/what-is-apache-kudu)
- Snowflake fundamentals: `datePublished` 2026-04-02, `dateModified` 2026-04-03, author "Snowflake" (organization). — [Snowflake page](https://www.snowflake.com/en/fundamentals/observability-vs-monitoring/)
- Vercel KB: `datePublished`/`dateModified` 2026-10-01, author "Vercel", "8 min read". — [Vercel guide](https://vercel.com/kb/guide/agentic-commerce-readiness)
- Semrush blog: author Grace Brennan, published 2024-03-18, modified 2024-10-18. — [Semrush post](https://www.semrush.com/blog/banner-ad-sizes/)
- Atlassian OKR: JSON-LD `dateModified` 2026-02-20, no person author detected. Notion customer story: published 2020, modified 2026-07-30. — [Atlassian OKR](https://www.atlassian.com/agile/agile-at-scale/okr), [Notion Figma](https://www.notion.com/customers/figma)
- Ahrefs glossary and Cloudflare learning pages: no published or modified date and no author were detected in schema or visible text. — [Ahrefs 301](https://ahrefs.com/seo/glossary/301-redirect), [Cloudflare DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
- HubSpot's practice of "historical optimization" (updating and republishing old posts): Pamela Vaughan reported that 70% of monthly blog views and 92% of blog leads came from posts at least a month old. Updating them raised organic views of old posts by an average of 106% and more than doubled their leads. — [HubSpot: Optimizing the Past](https://blog.hubspot.com/marketing/historical-blog-seo-conversion-optimization), [HubSpot on Medium](https://medium.com/@HubSpot/how-we-tripled-our-leads-using-this-rarely-discussed-blogging-tactic-4eb78ba938e4)

### Inferences
- Content refreshed on a rolling basis keeps its original URL and published date and bumps `dateModified` (Zapier 2014→2026, Databricks 2018→2026). For listicles the visible year in the title is the key freshness cue.
- Person bylines appear where E-E-A-T and editorial voice matter (reviews and listicles). Brand bylines are used for definitional reference content.

### Gaps
- No refresh cadence (for example "every 6 months") is publicly stated by any of these companies, apart from HubSpot's historical-optimization program.
- The absence of reviewer bylines was checked only on sampled pages.

## 7. Public statements and analyses on why glossaries and guides were built

### Takeaway
First-party statements are scarce. HubSpot's historical-optimization posts are the main one. Most "why" explanations come from third-party SEO teardowns (Foundation Inc, Scott Mathson, StrategyBreakdowns, Gracker). They agree on the logic: capture high-volume top-of-funnel definitional queries at scale with a consistent template, then route readers to the product through a closing section and a light CTA.

### Cited Findings
- Databricks: glossary ranks for 14,000+ keywords and is described as "more than half of Databricks' website value". It targets prospects unfamiliar with jargon at the top of the funnel and avoids overselling. (Foundation Inc, 2024-04-03, third-party.) — [Foundation Inc](https://foundationinc.co/lab/databricks-keyword-glossary)
- Cloudflare: 32 DNS Learning Center articles ranked for about 7,800 keywords, including "What is DNS?". The analysis credits the consistent template (definition, how it works, product mention). (Scott Mathson, 2020, third-party.) — [Scott Mathson](https://scottmathson.com/blog/2020/04/23/cloudflare-dns-content-hub-case-study-pt-1-seo-rankings/)
- Cloudflare: one estimate puts about 80% of site visitors as arriving from organic search. (Gracker, an unverified third-party marketing site; treat with caution.) — [Gracker](https://gracker.ai/case-studies/cloudflare)
- Zapier: the blog is said to be over 67% of organic traffic, and best-app lists plus app-integration pages form two traffic engines. (Third-party.) — [StrategyBreakdowns](https://strategybreakdowns.com/p/zapier-automatic-traffic-machine), [Foundation Inc: Zapier](https://foundationinc.co/lab/zapier-listicles-seo)
- HubSpot (first-party): old posts generate most views and leads, so updating them is a core strategy. — [HubSpot](https://blog.hubspot.com/marketing/historical-blog-seo-conversion-optimization)

### Inferences
- Taken together, the evidence suggests three roles:
  - Evergreen libraries are long-lived assets that are periodically refreshed.
  - The blog adds new demand and timeliness.
  - Case studies convert.
- The 2025–26 consolidations (Databricks glossary into blog, Snowflake into "fundamentals") may reflect pressure from AI Overviews and LLM answers on thin definitional pages, which pushes toward fewer, longer, FAQ- and schema-rich pages. This is speculative; no company statement confirms it.

### Gaps
- No first-party talks or posts from Databricks, Snowflake, Stripe, Cloudflare, Vercel, Notion or Ahrefs marketers explaining their glossary or guide programs were found within the search budget.
- No sources for Kevin Indig, Eli Schwartz, Animalz or Grow and Convert were retrieved in this pass.
