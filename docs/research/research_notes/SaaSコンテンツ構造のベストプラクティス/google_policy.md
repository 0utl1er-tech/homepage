# Google Search policies and observed behavior for a small-company blog + evergreen hub (guides, glossary, comparisons), as of Oct 2026

Research date: 2026-10-13. Every claim carries its source and, where known, its date. Google primary docs were fetched directly. Third-party 2026 numbers come from SEO vendors and aggregators of mixed quality, and they are flagged where they look shaky.

## Spam policies: scaled content abuse, site reputation abuse, expired domain abuse, doorways, and AI content guidance

### Takeaway
Google judges purpose and added value, not how the content was produced. "Many pages made mainly to rank, with little value" counts as scaled content abuse whether a human, an AI, or both wrote them. For this company, the realistic risks are mass-produced glossary or city pages (scaled content abuse and doorway abuse). Site reputation abuse and expired domain abuse only matter if it hosts third-party content or buys old domains.

### Cited Findings
- **Scaled content abuse** (spam policies doc, last updated 2026-08-28): "When many pages are generated for the primary purpose of manipulating search rankings and not helping users." The examples are: using generative AI to generate many pages without adding value; scraping feeds or search results; stitching content from other pages without adding value; creating multiple sites to hide the scale; and keyword-rich nonsensical pages. — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **Site reputation abuse** (same doc): "third-party content is published on a host site mainly because of that host's already-established ranking signals, which it has earned primarily from its first-party content." Examples include an education site hosting third-party payday-loan reviews. Google says third-party content by itself is not a violation; the purpose is what counts. — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies); the "not by itself a violation" framing is restated in [Elsner, Sept 2026](https://www.elsner.com/news/google-september-2026-spam-update/)
- **Expired domain abuse**: "an expired domain name is purchased and repurposed primarily to manipulate search rankings by hosting content that provides little to no value to users." Examples: affiliate content on a former government site, and casino content on a former elementary school site. — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **Doorway abuse**: "sites or pages are created to rank for specific, similar search queries" that lead users to intermediate pages. Examples include "multiple domains/pages targeting regions/cities funneling to one page" and "substantially similar pages closer to search results than browseable hierarchy." — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- **March 2024 origin**: Google folded helpful-content signals into core ranking. It expanded scaled content abuse to cover content made "through automation, humans, or a combination," added the site reputation abuse and expired domain abuse policies, and projected a reduction of roughly 40–45% in low-quality, unoriginal content in results. — [Search Central Blog, Mar 2024](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- **Generative AI content doc** (last updated 2026-10-01): "using generative AI tools or other similar tools to generate many pages without adding value for users may violate Google's spam policy on scaled content abuse." Google also says it is "critical to manually factcheck and review all AI-generated content for accuracy and trustworthiness before publishing." The review requirement extends to titles, meta descriptions, structured data and alt text. Google suggests telling readers how content was created. AI images in e-commerce need the IPTC `TrainedAlgorithmicMedia` label. — [Using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- **Helpful content doc** (last updated 2026-10-05): its "Who, How, Why" section asks for clear, genuine authorship and disclosure of automation where readers would expect it. Its red-flag questions include "Are you using extensive automation to produce content on many topics?", "producing lots of content on many different topics in hopes that some of it might perform well", and writing to a word count ("No, we don't [have a preferred word count]"). — [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- **Quality Rater Guidelines, Jan 2025**: added a definition of generative AI and guidance on scaled content abuse and "filler" content. If all or nearly all of the main content is auto- or AI-generated with little added value, raters should give the Lowest rating. — [Search Engine Land](https://searchengineland.com/google-quality-raters-content-ai-generated-454161); [SERoundtable](https://www.seroundtable.com/google-search-quality-rater-guidelines-generative-ai-38842.html)
- **Quality Rater Guidelines, Sept 2025**: a further update, which secondary sources summarize as purely AI-generated content without human review or unique value being rated Lowest. — [seo-kreativ (secondary)](https://www.seo-kreativ.de/en/blog/google-quality-raters-update_9-25/)
- **Enforcement cadence** (official Search Status Dashboard):
  - 2025: core updates in Mar, Jun–Jul and Dec 2025; spam update Aug 26 – Sep 22, 2025.
  - 2026: spam update Mar 24–25; core update Mar 27 – Apr 8; core update May 21 – Jun 2; spam updates Jun 24–26, Aug 18–21, and Sep 24 – Oct 8; Discover update Feb 2026.
  - Source: [Google Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history)
- Third-party claims (unverified) about which spam policies the Aug 2026 spam update targeted: [saascity](https://saascity.io/blog/google-august-2026-spam-update); [search summary](https://www.elsner.com/news/google-september-2026-spam-update/)
  - The Aug 2026 update reportedly targeted scaled content, not link spam or site reputation abuse.
  - Google has not confirmed this breakdown, so treat it as low confidence.

### Inferences
- An AI-assisted workflow is allowed. The risks are publishing volume without human review and fact-checking, and producing pages with no information gain.
- A batch of 300 near-template glossary or city pages published at once matches the textbook pattern of scaled content abuse or doorway abuse, even if humans wrote them.
- With six or more ranking updates a year (2026), any low-value cluster will be evaluated repeatedly.

### Gaps
- I did not fetch the full Jan 2025 or Sept 2025 Quality Rater Guidelines PDF text; their wording above comes from secondary coverage.
- Google publishes no official description of what each 2026 spam update targeted.

## The helpful content system folded into core ranking, site-wide signals, and what happened to glossary-heavy and programmatic sites (2024–2026)

### Takeaway
Since March 2024, helpful-content signals have been part of core ranking. Google's own documentation says a site with a relatively high amount of unhelpful content can see its other pages suffer, so the signal still works partly at the site level. Recovery has been slow and partial. The 2026 core updates favored first-party and official sources over aggregators and templated content.

### Cited Findings
- "Helpful content update signals are now folded into our core ranking systems" (Mar 2024). — [Search Central Blog](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- Google documentation on core updates says:
  - Any content on sites "determined to have relatively high amounts of unhelpful content overall is less likely to perform well."
  - Removing unhelpful content "could help the rankings of your other content."
  - There is no fixed timeline for recovery.
  - Source: [Google core updates doc](https://developers.google.com/search/docs/appearance/core-updates) (via search summary)
- Glenn Gabe (GSQI) tracked about 400 sites badly hit by the Sept 2023 Helpful Content Update. By Aug 2024 only 22% had recovered 20% or more of lost traffic. Many improved with the June 2025 core update, almost two years later. He also reported that the May 2026 core update was more volatile than the March 2026 one. — [search summary citing GSQI/Gabe](https://www.gsqi.com/marketing-blog/google-site-level-impact-gabeback-machine/); [ppc.land on Gabe](https://ppc.land/glenn-gabe/)
- **Lily Ray (Amsive), March 2026 core update**, published 2026-04-30:
  - She called it a "first-party, official-source correction," with traffic moving "away from user-generated content, comparison aggregators, and content built primarily for search visibility."
  - Winners: .gov sites (NIH, IRS, FDA), IMDB, and brand-owned pages.
  - Losers: YouTube, Reddit (-64.2), Instagram, X, TripAdvisor, Yelp, Expedia, Indeed, and health publishers such as WebMD.
  - Source: [Amsive](https://www.amsive.com/insights/seo/google-march-2026-core-update-winners-losers-analysis/)
- Lower-quality aggregators claim that in the March 2026 update, thin, affiliate and templated content fell 30–50% and programmatic city or location pages fell 32% on average. The methodology is not shown, so this is low confidence. — [digitalapplied / almcorp via search](https://www.digitalapplied.com/blog/march-2026-core-update-content-quality-winners-losers)
- Gabe also reports that Reddit's AI-translated content dropped heavily in the May 2026 core update and the June 2026 spam update. — [ppc.land on Gabe](https://ppc.land/glenn-gabe/)

### Inferences
- A small brand that writes first-party content (its own data, its own case studies, its own service expertise) fits the 2026 winner profile.
- Comparison or aggregator content with no first-hand basis fits the loser profile.
- Because site-level weighting exists, a large thin glossary can drag down the whole domain, including service pages. Keep the share of weak pages low.

### Gaps
- I found no reliable Sistrix or Ahrefs study that isolates glossary-heavy sites in 2025–2026 core updates.
- I found no Marie Haynes data in this pass.

## Glossary pages: are thin glossary pages still effective?

### Takeaway
For Google clicks, mostly no. "What is X" queries are largely answered by AI Overviews, so a glossary can rank well and still get almost no clicks. Glossary pages do earn outsized citations in AI answer engines, which helps when the terms are niche and thinly documented elsewhere. Thin, templated glossaries also carry scaled-content risk.

### Cited Findings
- **Otterly.ai experiment, Oct 2025 – Aug 2026**, on Conversal.be's 304 glossary pages (33% of the indexable site):
  - Google: 568,000 impressions and 565 clicks (CTR 0.10%), even though average position improved from 47.1 to 17.9.
  - Bing: 1.70% CTR at average position 6.
  - AI citations: glossaries earned 38 times more citations than other page types. The site ranked #1 of more than 1,400 domains, with 3.0% of 64,453 citations.
  - Conclusion: this works best for "narrow, technical, thinly documented categories."
  - Source: [Otterly.ai](https://otterly.ai/blog/geo-experiment-seo-glossary-pages/)
- Seer Interactive (Apr 2026): AI Overviews trigger on 85.9% of question-format queries and 36% of informational queries. — [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)
- Secondary sources say definition and how-to queries were hit hardest. One reports that HubSpot, whose traffic relied heavily on a blog and glossary, lost 70–80% of organic traffic between Nov 2024 and Q2 2025. That figure is secondary; I did not verify it against the primary source. — [Contently, Apr 2026](https://contently.com/2026/04/27/ai-overview-traffic-impact/)

### Inferences
- Do not build a glossary for traffic. If one is built, use it as internal-link support, as entity definitions for AI citation, and as linkable reference material.
- Each entry should add something an AI Overview cannot: your own example, a local or industry context (MEO in Japan, for example), or a link to the deeper guide.
- Start small and merge very short definitions into a single page rather than one URL per term.

### Gaps
- There is only one controlled glossary experiment, from a single site in a niche B2B category in Belgium. I found no Japanese-market glossary data.

## AI Overviews, AI Mode, and LLM search: impact on informational queries and what still earns clicks and citations

### Takeaway
AI Overviews roughly halve organic CTR on informational queries. Being cited in the AI Overview recovers a large share of those clicks. Google still sends about 90% of search-type referrals, and ChatGPT referrals are small but growing. Google says no special optimization is needed for AI features.

### Cited Findings
- Google (doc last updated 2025-12-10): "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." AI features use "query fan-out." Clicks from pages with AI Overviews are "higher quality." Best practices are crawlability, people-first content, internal linking, page experience, and keeping Business Profile information current. Controls are `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex`. — [Google AI features doc](https://developers.google.com/search/docs/appearance/ai-features)
- **Seer Interactive**, Jan 2025 – Feb 2026 (53 brands, 5.47M queries, published Apr 2026):
  - Organic CTR on queries with an AI Overview: 3.19% falling to 2.36%, after bottoming at 1.3% in Dec 2025.
  - Organic CTR on queries without one: 2.75% rising to 3.82%.
  - Pages cited in the AI Overview get 120% more clicks per impression than pages that are not cited.
  - AI Overview trigger rates: 95.4% of comparison queries, 8% of commercial and 5% of transactional queries.
  - Source: [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)
- Other studies:
  - Pew: an AI Overview present cuts clicks from 15% to 8%.
  - Ahrefs: position-1 CTR drops 58% when an AI Overview is present.
  - Sistrix: position-1 CTR goes from 27% to 11%.
  - Source: [summary via cognizo / presenc](https://presenc.ai/research/ai-overviews-ctr-impact-2026)
- Ahrefs: 76% of AI Overview citations come from the top 10 organic results. — [Ahrefs](https://ahrefs.com/blog/search-rankings-ai-citations/)
- **Referral share, Aug 2026**: AI chatbots were 0.25% of global referrals, against 91.66% for search engines. ChatGPT accounted for 79.4% of AI referrals, Gemini 10.9% and Perplexity 4.3%. — [upgrowth](https://upgrowth.in/ai-traffic-share-report-2026/)
- SE Ranking reports that ChatGPT referral traffic hit an all-time high in May 2026. — [SE Ranking](https://seranking.com/blog/chatgpt-referral-traffic-may-2026/)

### Inferences
- Comparison pages are about 95% likely to trigger an AI Overview, so they need to be citable: clear tables, explicit criteria, and first-hand testing.
- Ranking in the organic top 10 is still the main path to AI citation.
- Commercial and transactional local-service pages are least exposed to AI Overviews, which makes them the best click targets for an MEO business.
- Glossary and guide pages should answer quickly, then go deeper into things an AI summary cannot replicate: their own data, screenshots, case studies and local specifics.

### Gaps
- Japan-specific AI Overview and AI Mode CTR data was not found.
- I found no reliable published measurement of AI Mode click-through.

## Freshness: date guidance, "last updated" practices, pruning and consolidation, and how often to refresh

### Takeaway
Google wants accurate, visible dates that match the structured data. It explicitly flags changing dates without substantial changes as a search-first practice. Refresh content on substance, not on a calendar. Deleting or merging unhelpful content can lift the rest of the site, according to Google's own documentation. AI assistants other than Google's cite noticeably fresher pages.

### Cited Findings
- Google's byline dates doc (last updated 2025-12-10) gives these rules. — [Google publication dates doc](https://developers.google.com/search/docs/appearance/publication-dates)
  - Show a visible, labeled date, such as "Last updated: …".
  - Use Article or BlogPosting markup with `datePublished` and `dateModified`.
  - Make sure the visible date and the structured-data date match.
  - Do not use future dates, or the date of the event described in the article.
  - Remove competing dates from the page if Google shows the wrong one.
- Google's helpful content doc (2026-10-05) lists as a red flag: "Are you changing the date of pages to make them seem fresh when the content has not substantially changed?" — [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google's core updates doc says deleting unhelpful content "can help the good content on your site perform better," with no fixed timeline. — [Google core updates doc](https://developers.google.com/search/docs/appearance/core-updates)
- John Mueller's position, as reported by secondary sources: improve content first, and delete it if improving is not practical. — [search summary](https://blog.gtm8020.com/content-pruning)
- Pruning case studies, all vendor-reported and of varying rigor:
  - CNET removed thousands of pages and saw about +29% traffic in two months.
  - A vehicle valuation site went from 4.86M pages to 1,500 and saw +160% traffic.
  - Source: [gtm8020 summary](https://blog.gtm8020.com/content-pruning)
- Ahrefs studied 17M URLs cited by ChatGPT, Perplexity, Copilot and Gemini. Pages cited by these AI assistants are about 25.7% fresher than pages Google ranks. ChatGPT cites pages averaging 2.6 years old; Google AI Overviews averages 3.9 years and slightly favors older pages than organic results. — [authoritytech summary of Ahrefs](https://authoritytech.io/curated/ahrefs-content-freshness-ai-citation-platform-refresh-2026); [nogood](https://nogood.io/blog/content-freshness-ai-citations/)

### Inferences
- Show both "published" and "updated" dates, and change `dateModified` only on substantive edits. Keep a short change note, for example "2026-10: revised for the GBP spec change."
- Run a quarterly review:
  - Pages whose facts depend on time (pricing, specs, policies, Google Business Profile features) get updated when the facts change.
  - Evergreen definitions get an annual check.
- Pages with no impressions, no links and no purpose get merged with a 301 redirect, or deleted.

### Gaps
- Google publishes no recommended refresh interval.
- The freshness numbers come from Ahrefs via secondary summaries; I did not fetch the original Ahrefs article.

## Internal linking, topic clusters and pillar pages

### Takeaway
Google names internal linking as a basic practice, including for AI features. I found no rigorous 2025–2026 study that isolates a "pillar page" effect.

### Cited Findings
- Google lists "Ensure internal linking" among best practices for appearing in AI Overviews and AI Mode (2025-12-10). — [Google AI features doc](https://developers.google.com/search/docs/appearance/ai-features)
- Doorway policy warns against "substantially similar pages closer to search results than browseable hierarchy." By implication, pages should sit in a real navigable hierarchy. — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Amsive (Apr 2026): "Specialist destinations with deep topical focus often outperformed broader utility sites." This is reported via a search summary of March 2026 coverage. — [Amsive](https://www.amsive.com/insights/seo/google-march-2026-core-update-winners-losers-analysis/)

### Inferences
- Use a hub-and-spoke structure: a guide page linking to glossary entries and comparisons, all linking back to the service page.
- Keep the topic focus narrow (MEO, local search, reviews) rather than writing about many topics. Google flags "many different topics" as a red flag.

### Gaps
- I found no quantitative 2025–2026 study on topic clusters or pillar pages from a reputable analyst.

## Syndication and cross-posting to note and Zenn

### Takeaway
Since May 2023, Google recommends that syndication partners use `noindex` rather than relying on a canonical tag. Zenn does not render a canonical tag pointing to an external URL, and note's support is limited. So cross-posting full articles risks the platform version outranking your own domain.

### Cited Findings
- In May 2023, Google changed its guidance. It no longer recommends a canonical tag for syndicated content and calls `noindex` on the partner site the most effective way to avoid the partner outranking the original. The reason given is that syndicated pages are "often very different" once boilerplate is included, so Google may not honor the canonical. — [SERoundtable](https://www.seroundtable.com/google-updates-canonicalization-help-documentation-35329.html); [SEJ](https://www.searchenginejournal.com/google-answers-question-about-signals-and-syndicated-content/506861/)
- Glenn Gabe tracked 3,000 syndicated news articles and found that noindexing on the partner is the reliable approach. — [GSQI case study](https://www.gsqi.com/marketing-blog/news-syndication-seo-case-study/)
- I checked the current canonicalization pages (updated 2026-08-20). The fetched text no longer contains the syndication paragraph, so I could not verify the current wording directly. — [Google canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- Zenn's frontmatter has no canonical field, and its public HTML does not output an external canonical. The workaround is to link to the original at the top of the article. — [Zenn article (2026)](https://zenn.dev/zhener/articles/zenn-canonical-crosspost-seo); [Qiita](https://qiita.com/Cosoado/items/4e7353d400340583c007)
- For note, practitioners recommend adding different or supplementary content and linking clearly to the original rather than posting identical text. — [note.com/berkiefer](https://note.com/berkiefer/n/ne93c11b13148)

### Inferences
- Publish on your own domain first, and wait until Google has indexed it.
- Post to note or Zenn as a summary or adapted version (an excerpt plus a link to the original), not a full copy. You cannot noindex or canonicalize on those platforms.

### Gaps
- I could not confirm whether note currently supports canonical tags to external URLs (some secondary claims say it does for imported articles; unverified).

## Local SEO (MEO): which content helps, service area pages, and doorway risk

### Takeaway
City and service-area pages are legitimate only when each page has real, location-specific substance and sits in a browsable structure. Many near-identical "[service] in [city]" pages are the textbook example of doorway abuse. Google's AI features guidance also tells site owners to keep Business Profile information current.

### Cited Findings
- Doorway examples include "multiple domains/pages targeting regions/cities funneling to one page." — [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Google advises keeping Business Profile information current as part of AI features best practice. — [Google AI features doc](https://developers.google.com/search/docs/appearance/ai-features)
- Seer: AI Overviews appear on only 5–8% of transactional and commercial queries, but secondary data claims they appear on 76.9% of informational "near me" queries. — [Seer](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update); [search summary](https://click-vision.com/zero-click-search-statistics)
- Practitioner advice (vendor blogs, low confidence) — [BrightLocal](https://www.brightlocal.com/learn/service-area-pages/); [stacc](https://thestacc.com/blog/city-service-landing-pages-seo/)
  - Use local proof: reviews from customers in that city, local case studies and photos.
  - Limit pages to the areas you actually serve.
  - Some vendors also claim a "60–70% unique content" rule, and that Mueller said 1,300 location pages would likely be doorways. Both are unverified.

### Inferences
- For an MEO agency, only create area pages backed by real clients or case studies in that area, for example 久喜, さいたま and 春日部.
- Concentrate on service pages, case studies with numbers, and a Google Business Profile how-to guide.

### Gaps
- I did not locate the primary Mueller quote; there is no official Google number for "too many" location pages.

## Priorities for a very small team (1–3 writers)

### Takeaway
Based on the above, put effort into fewer, first-party, citable pages: service pages, case studies and original guides. Treat a glossary as a supporting layer, not a traffic engine.

### Cited Findings
- Winners in 2026 core updates were first-party and official sources; losers were aggregators and content "built primarily for search visibility." — [Amsive, Apr 2026](https://www.amsive.com/insights/seo/google-march-2026-core-update-winners-losers-analysis/)
- Pages cited in AI Overviews get +120% clicks per impression, and 76% of AI Overview citations come from the organic top 10. — [Seer](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update); [Ahrefs](https://ahrefs.com/blog/search-rankings-ai-citations/)
- Google flags lots of content on many topics, extensive automation, and refreshing dates without substantive changes as red flags. — [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### Inferences
Proposed build order:
1. Service and money pages, plus a complete Google Business Profile.
2. Three to five deep original guides built on your own data or process, which serve as hubs.
3. Case studies with numbers.
4. Comparison pages based on first-hand evaluation, using tables and explicit criteria.
5. A small set of glossary entries that link into the guides, ideally around 20–40 terms. Avoid hundreds of templated entries.
6. Blog posts on news and changes, such as Google Business Profile or Google updates, which give timely freshness signals.

Process rules:
- A human fact-checks every AI-assisted draft.
- Every page shows a real author, a published date and an updated date.
- Review content quarterly.
- Merge or remove content that has no impressions, no links and no purpose.

### Gaps
- None of the evidence is specific to small Japanese B2B or local-service sites; the build order above is synthesized, not measured.
