# Statistical methods for relating topic-trend series to content performance (small, noisy data)

Context assumed throughout: tiny company, ~2–8 articles/month, daily per-article counts often 0–20 (GSC impressions/clicks, sessions, conversions); trend series = mention counts (news/social) or Google Trends index. Analysis platform: Trino (SQL) on the kuki-dc lakehouse, Python available as a side tool.

## Q1. Cross-correlation with lags (CCF), prewhitening and differencing

### Takeaway
A raw CCF between two trending/seasonal series is mostly noise from each series' own autocorrelation and will show "significant" lags even when the series are unrelated. If you use CCF at all, first difference or deseasonalize (e.g. weekly aggregation, or remove day-of-week), ideally prewhiten, and read only the lag structure, not the size. With a few months of daily data at counts of 0–20, CCF is a rough exploratory tool, not evidence.

### Cited Findings
- Spurious cross-correlation mechanism: when either series is strongly autocorrelated, the raw CCF shows large peaks that reflect each series' own persistence rather than a real cross-relationship. If both are autocorrelated, many lags look significant even for independent series. — [Penn State STAT 510, 8.2 Cross Correlation Functions and Lagged Regressions](https://online.stat.psu.edu/stat510/lesson/8/8.2)
- Prewhitening procedure: fit an ARIMA/AR model to the input (predictor) series, take its residuals (≈ white noise), apply the same filter to the response series, then compute the CCF of the filtered series. The point is to remove autocorrelation from at least one series. — [Penn State STAT 510](https://online.stat.psu.edu/stat510/); [Dean & Dunsmuir 2016, "Dangers and uses of cross-correlation…", Behavior Research Methods](https://link.springer.com/article/10.3758/s13428-015-0611-2)
- Dean & Dunsmuir argue that CCF on unfiltered autocorrelated series is dangerous and recommend transfer-function (ARX) models instead of reading raw CCF peaks. — [Behavior Research Methods (Springer)](https://link.springer.com/article/10.3758/s13428-015-0611-2)
- Slides on relationships between two time series (Box–Jenkins transfer-function view, prewhitening). — [Hitchcock, U. South Carolina STAT 520 Ch. 11](https://people.stat.sc.edu/hitchcock/stat520ch11slides.pdf)
- Hyndman & Athanasopoulos (FPP3): regressing with autocorrelated errors gives p-values that are "too small, and so some predictor variables will appear to be important when they are not. This is known as 'spurious regression'". Variables in dynamic regression must be stationary (difference first) or coefficients are inconsistent. — [FPP3 §7 / estimation](https://otexts.com/fpp3/estimation.html); [FPP3 Ch.10 Dynamic regression models](https://otexts.com/fpp3/dynamic-regression.html); STL decomposition for removing trend/seasonality: [FPP3 Ch.3](https://otexts.com/fpp3/decomposition.html)

### Inferences
- Approximate white-noise significance band for a CCF of length n is about ±2/√n (standard textbook bound, see PSU lesson above). With n = 90 days that is ±0.21; with n = 13 weeks it is ±0.55. Over 29 lags (−14..+14) you expect ~1–2 lags to cross the band by chance alone at 5% — so a single peak means little.
- Practical recipe for this case: (1) aggregate to weekly totals to kill day-of-week and reduce zeros, (2) first-difference both series (or log1p then difference), (3) compute CCF for lags −4..+4 weeks, (4) only trust it if the peak is at a positive lag (trend leads site) and is consistent across keywords/periods. Prewhitening with an AR fit needs Python (statsmodels) — Trino has no ARIMA. Simple differencing + `corr()` at fixed lags is doable in SQL.
- Count data with many zeros violates the Gaussian assumptions behind the ±2/√n band; weekly aggregation or log1p transform mitigates but does not fix it.

### Gaps
- Could not fetch the PSU lesson page text directly (TLS error); the ±2/√n band is a standard result but not quoted verbatim from the page.
- Found no published guidance on minimum series length for CCF specifically on count data at this scale.

## Q2. Granger causality

### Takeaway
Granger causality tests whether the past of X improves forecasts of Y beyond Y's own past. It is predictability, not causation, requires stationary series, is sensitive to lag choice, and is confounded by any common driver (e.g. seasonality, news cycle that drives both). For a tiny site it adds little over a well-done lagged regression and is easy to misuse; treat it as optional/exploratory in Python only.

### Cited Findings
- Granger causality = predictability: X's past improves Y's forecast; necessary but not sufficient for causation. It can reflect a true effect, a hidden third variable driving both with different lags, or an artifact of lag structure. — [MetricGate, "Granger Causality, Explained"](https://metricgate.com/blogs/granger-causality-explained/)
- The classic test assumes stationarity; on trending data it gives spurious rejections; remedy is differencing until stationary (ADF test). Too few lags omit dependencies; too many overfit; analysts sometimes pick lags that produce the desired result. — [MetricGate](https://metricgate.com/blogs/granger-causality-explained/)
- Toda–Yamamoto style procedure and practical pitfalls of testing Granger causality with non-stationary/cointegrated data (econometrician's practical guide). — [Dave Giles, Econometrics Beat: Testing for Granger Causality](https://davegiles.blogspot.com/2011/04/testing-for-granger-causality.html)
- Same spurious-regression caveat applies (autocorrelation → p-values too small). — [FPP3](https://otexts.com/fpp3/estimation.html)

### Inferences
- In Python: `statsmodels.tsa.stattools.grangercausalitytests` (or VAR). Not practical in Trino (needs OLS with multiple lagged regressors and F-tests; possible by hand but not worth it).
- Data length: each lag adds parameters; with daily data and p lags you need n ≫ 2p+1. A rough working rule (inference, not sourced): at least ~50–100 observations after differencing and a pre-chosen small lag set (e.g. 1, 7, 14 days or 1–4 weeks). Short series → low power, so "not Granger-causal" is not evidence of no relationship.
- Testing many keywords × many lags is a multiple-comparisons trap (see Q6).

### Gaps
- No authoritative source found giving a minimum sample size for Granger tests; the rule of thumb above is inference.

## Q3. Event study / interrupted time series, DiD, synthetic control

### Takeaway
The natural unit here is the article: "publish date" is the event. The most defensible design for a small site is a per-article event-time alignment (day 0 = publish) and a comparison between article groups (trend-aligned vs not) on outcomes over a fixed window — a simple cohort comparison / DiD-flavored design — rather than site-level ITS. Staggered DiD with two-way fixed effects is biased when effects vary over time; synthetic control needs a long, well-fitting pre-period, which new articles don't have (they start at zero).

### Cited Findings
- TWFE regressions in staggered-adoption settings estimate weighted sums of group-time effects with weights that can be negative, so the coefficient can be negative even when all true effects are positive; the TWFE estimate is a weighted average of 2×2 DiDs that uses already-treated units as controls. — [Roth, Sant'Anna, Bilinski, Poe, "What's Trending in Difference-in-Differences?" (arXiv 2201.01194)](https://arxiv.org/pdf/2201.01194)
- Callaway & Sant'Anna propose estimating group-time average effects by time since treatment per cohort, then aggregating; diagnostics include reporting the share of negative weights (Goodman-Bacon decomposition). — [arXiv 2201.01194](https://arxiv.org/pdf/2201.01194); [Sant'Anna, Modern DiD slides (NABE 2024)](https://psantanna.com/DiD/NABE_202410.pdf)
- DiD with continuous treatment ("trend strength" as a dose) requires stronger parallel-trends assumptions than binary DiD. — [Callaway, Goodman-Bacon, Sant'Anna, NBER WP 32117](https://www.nber.org/system/files/working_papers/w32117/w32117.pdf)
- Synthetic control credibility depends on tracking the treated unit's outcome over an extended pre-intervention period; when pre-period fit is poor, Abadie et al. recommend against using it. Weights can be fixed using pre-period data before outcomes are seen. — [Abadie 2021, JEL 59(2) "Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects"](https://conference.nber.org/confer/2021/SI2021/Abadie_2021.pdf)
- Industry practice (SEO A/B testing) compares a variant page group against a statistically similar control group and reports credible intervals; SearchPilot suggests ~30,000 organic sessions/month to the tested page group as a working threshold (a few thousand if the effect is large). — [SearchPilot SEO split-testing guide](https://www.searchpilot.com/resources/blog/what-is-seo-split-testing); [SearchPilot data analysts page](https://www.searchpilot.com/data-analysts)

### Inferences
- New articles have no pre-period, so ITS/synthetic control "per article" is ill-posed. Where ITS fits: site-level or topic-cluster-level series around a publish date (does total site clicks on cluster X jump after the article?), but at this traffic level the noise will usually swamp the signal.
- Recommended framing: event-time panel (article × days since publish, 0..90), outcome = cumulative clicks/impressions at day 30/60/90; compare groups defined *before* looking at outcomes (e.g. "trend index rising at publish" yes/no). Report medians and bootstrap CIs. This is "cohort comparison", not a clean DiD — say so.
- The traffic threshold cited by SearchPilot (tens of thousands of sessions/month) is 2–3 orders of magnitude above this site; that is a useful anchor for setting expectations: formal causal tests will almost always be underpowered here.
- Event-time alignment, cumulative windows and group medians are all easy in Trino.

### Gaps
- No source found applying staggered DiD to blog articles at this scale.

## Q4. Bayesian structural time series / CausalImpact and Python ports (status 2026)

### Takeaway
CausalImpact (Brodersen et al. 2015) builds a counterfactual from control series that were not affected by the intervention, assuming the pre-period relationship stays stable. It fits site- or cluster-level questions with a decent pre-period, not per-article analysis of new pages. In Python as of 2026: tfcausalimpact is the maintained TensorFlow port (VI by default, differs from R); pycausalimpact is inactive; a newer no-TensorFlow Rust-backed port (bsts-causalimpact) claims R-equivalent results.

### Cited Findings
- Paper: Brodersen, Gallusser, Koehler, Remy, Scott, "Inferring causal impact using Bayesian structural time-series models", Annals of Applied Statistics 9(1):247–274 (2015), DOI 10.1214/14-AOAS788. Unlike classic DiD, it infers the temporal evolution of impact, uses empirical priors, and handles local trend, seasonality and time-varying covariate effects; demonstrated on an online ad campaign's effect on search-related site visits. — [Project Euclid](https://projecteuclid.org/journals/annals-of-applied-statistics/volume-9/issue-1/Inferring-causal-impact-using-Bayesian-structural-time-series-models/10.1214/14-AOAS788.full); [Google Research PDF](https://research.google.com/pubs/archive/41854.pdf)
- Package assumptions: control series "themselves not affected by the intervention"; "the relationship between covariates and treated time series, as established during the pre-period, remains stable throughout the post-period"; results are sensitive to priors, especially `prior.level.sd`. Violations can inflate, deflate, or invent effects. — [CausalImpact R docs](https://google.github.io/CausalImpact/CausalImpact.html)
- tfcausalimpact: latest release Jan 13, 2025 (0.0.18 per Libraries.io); requires tensorflow ≥2.10, tensorflow_probability ≥0.18; Python 3.8–3.13; defaults to variational inference (faster) with HMC optional ("better precision", can take hours). — [GitHub WillianFuks/tfcausalimpact](https://github.com/WillianFuks/tfcausalimpact); [Libraries.io](https://libraries.io/pypi/tfcausalimpact)
- pycausalimpact: maintenance "Inactive", no PyPI release in 12 months, considered possibly discontinued. — [Snyk advisor](https://security.snyk.io/package/pip/pycausalimpact)
- bsts-causalimpact: Python port with a Rust (PyO3) Gibbs sampler, no TensorFlow, Python 3.10+, claims CI-enforced numerical equivalence to R within ±1% on five scenarios. — [GitHub YuminosukeSato/bsts-causalimpact](https://github.com/YuminosukeSato/bsts-causalimpact)
- SearchPilot originally built on CausalImpact but found it could not capture layered seasonality of organic search traffic and moved to a neural model. — [SearchPilot SEO split-testing guide](https://www.searchpilot.com/resources/blog/what-is-seo-split-testing)

### Inferences
- For this site, sensible CausalImpact uses: "Did total organic clicks to the /blog cluster change after we started trend-aligned publishing?" with controls such as non-blog pages' clicks, or Google Trends for an unrelated stable category. Need a pre-period of several months (inference; docs don't give a number) and the control must not be influenced by the articles.
- Per-article: not suitable — no pre-period, outcome starts at 0.
- Do not use the Google Trends series of the *same* topic as a control: it is exactly the driver whose effect you want to separate, and it is plausibly correlated with the treatment decision.
- The R package remains the reference implementation; if Python is required, prefer bsts-causalimpact (R-equivalent, light deps) or tfcausalimpact with HMC, and sanity-check against R once. bsts-causalimpact is a single-maintainer project — verify before relying on it.

### Gaps
- Exact current PyPI version/date of bsts-causalimpact not confirmed.
- No official guidance found on minimum pre-period length.

## Q5. Simple, robust descriptive metrics for small counts

### Takeaway
At this scale the defensible core is descriptive and per-article: cumulative clicks at fixed horizons (30/90 days), share of first-30-day clicks (front-loaded vs evergreen), traffic half-life, CTR shrunk with empirical-Bayes / pseudo-counts, and a Spearman rank correlation across articles between "trend strength at publish" and outcome with a bootstrap CI. All but the bootstrap and beta-prior fitting are easy in Trino.

### Cited Findings
- Empirical Bayes shrinkage for rates with few trials: fit a Beta(α, β) prior to the population of rates (using units with enough data), then estimate each unit as (successes + α) / (trials + α + β); low-data units are pulled toward the overall average. — [Robinson, "Understanding empirical Bayes estimation (using baseball statistics)"](http://varianceexplained.org/r/empirical_bayes_baseball/); [ebbr package](http://varianceexplained.org/r/ebbr-package/); extension to beta-binomial regression (prior depends on covariates, e.g. exposure): [R-bloggers](https://www.r-bloggers.com/2016/05/understanding-beta-binomial-regression-using-baseball-statistics/)
- Same approach applied outside baseball (soccer shooting over-performance) as a template for ratios with small denominators. — [Tony ElHabr](https://tonyelhabr.rbind.io/posts/xg-ratio-empirical-bayes/)
- Trino supports `corr`, `covar_samp`, `regr_slope`, `regr_intercept`, `stddev`, `var_samp`, `skewness`, `kurtosis` as aggregates, and all aggregates can be used as window functions with `OVER`. `lag/lead(x, offset, default)` exist and value functions support `IGNORE NULLS`. — [Trino aggregate functions](https://trino.io/docs/current/functions/aggregate.html); [Trino window functions](https://trino.io/docs/current/functions/window.html)

### Inferences
- **Share of first-30-day clicks** = clicks(day 0–29) / clicks(day 0–89). High share → trend-driven spike; low share → evergreen. Only compute for articles ≥ 90 days old (right-censoring), and only when total clicks ≥ some floor (e.g. 10), else report "insufficient".
- **Half-life**: days until cumulative clicks reach 50% of the 90-day total (robust, SQL-friendly) — preferable to fitting an exponential decay on 0–20 daily counts.
- **Smoothed CTR** = (clicks + α)/(impressions + α + β). Simplest version: α, β from method of moments over all articles (mean m, variance v of raw CTR among articles with ≥100 impressions: α+β = m(1−m)/v − 1). Doable in SQL; a fixed pseudo-count (e.g. α = site-wide CTR × 20, β = 20 − α) is a defensible simpler fallback.
- **Spearman correlation** across articles: Trino has no `spearman`, but `corr(rank_x, rank_y)` over `rank()`-transformed columns equals Spearman (with average ranks for ties ideally; `rank()` gives min-rank — small bias with many ties, acceptable for exploration). With n = 20–40 articles, |ρ| must be roughly > 0.35–0.45 to be distinguishable from zero at 5% (inference from standard critical values) — expect wide CIs.
- **Bootstrap CIs**: easiest in Python (resample articles, 2,000+ times). Possible in Trino via `CROSS JOIN UNNEST(sequence(1,1000))` + `rand()` resampling, but clumsy; recommend Python for CIs and SQL for metrics.
- Resample at the article level (the independent unit), never at the day level (days within an article are autocorrelated).

### Gaps
- No source found giving benchmark distributions of first-30-day share or half-life for small B2B blogs.

## Q6. Common errors

### Takeaway
The biggest risks here are not the choice of model but: testing many keyword × lag combinations and reporting the hits; selection bias (you choose trend topics you already expect to work); regression to the mean (acting after an unusual spike); aggregation reversals (Simpson's paradox across topics/channels); day-of-week and seasonality; and treating Google Trends 0–100 values as comparable counts across requests.

### Cited Findings
- Google Trends: only a sample of searches is used; values are normalized by total searches for the geography/time range and scaled 0–100; "search terms with low volume appear as '0'". — [Google Trends Help FAQ](https://support.google.com/trends/answer/4365533?hl=en)
- The 0–100 scale is rescaled per request: change dates, geo or comparison terms and the 100 point moves; samples can differ between lookups minutes apart. — [Glimpse Google Trends FAQ](https://meetglimpse.com/google-trends/faq/); [ppc.land, Explaining Google Trends](https://ppc.land/google-trends/) (secondary sources, consistent with Google's FAQ)
- Each Google Trends sample differs even for the same term/date/location; this sampling noise can make forecasting gains appear by chance; paper explains when it matters and how to overcome it. — [Medeiros & Pires, "The Proper Use of Google Trends in Forecasting Models" (arXiv 2104.03065)](https://arxiv.org/abs/2104.03065)
- Stitching/calibrating Google Trends series across requests (anchor-term method, "G-TAB") to get comparable scales and avoid rounding to 0 for low-volume terms. — [West, "Calibration of Google Trends Time Series" (arXiv 2007.13861)](https://arxiv.org/pdf/2007.13861)
- Lag selection chosen to "produce desired results" is a recognized abuse in Granger analysis — an instance of researcher degrees of freedom. — [MetricGate](https://metricgate.com/blogs/granger-causality-explained/)
- Autocorrelated errors → p-values too small (spurious regression). — [FPP3](https://otexts.com/fpp3/estimation.html)

### Inferences
- **Multiple comparisons**: k keywords × L lags ⇒ k·L tests; at 5% you get 0.05·k·L false hits. Pre-register a small set (e.g. one aggregated trend index per topic cluster, lags fixed at 0/1/2/4 weeks), and if testing many keywords use Benjamini–Hochberg FDR in Python (statsmodels `multipletests`). (Standard statistics; not sourced above.)
- **Selection bias**: articles on trending topics are chosen because the writer expected them to work, and may also get more effort/promotion. Compare against a pre-declared label ("trend-aligned" decided at planning time) and record effort/promotion as covariates. Ideally randomize a small share of topic choices (e.g. alternate trend vs evergreen topics month by month).
- **Regression to the mean**: if you decide to write because a trend just spiked, the trend will likely fall back regardless; likewise "articles that did badly last month improved" after tweaks. Use fixed windows and compare against the group, not against an article's own extreme.
- **Simpson's paradox**: pooled correlation across topics can reverse within topics (e.g. one high-volume cluster that is both trendy and high-traffic). Stratify by topic cluster or use within-cluster ranks.
- **Seasonality/day-of-week**: B2B search has weekday peaks; aggregate weekly or compare same-weekday; use YoY or 7-day centered averages.
- **Google Trends handling**: pull all compared terms in one request (max 5) or anchor to a common reference term; fetch the same request several times and average; use the same time window for the whole analysis; treat 0 as "below threshold", not zero; prefer weekly granularity for longer windows. Store raw pulls with request metadata (terms, geo, timeframe, fetch time) so values are never mixed across requests.
- **GSC data caveats** (low-volume anonymized queries are filtered, page-level vs query-level totals differ) further bias small-count analyses — check with GSC docs (not covered here).

### Gaps
- Did not retrieve Google's own GSC documentation on anonymized query filtering in this session.
- Did not find a primary source quantifying Google Trends sample-to-sample variance for low-volume Japanese terms.

## Q7. SQL patterns for Trino and a recommended minimal method set

### Takeaway
Everything in the recommended minimal set except bootstrap CIs, prewhitening, Granger and CausalImpact can be done in Trino with window functions (`lag`, moving `avg` with ROWS frames, `corr`, `rank`). Recommended minimal, defensible set: (1) per-article event-time cumulative metrics, (2) EB-smoothed CTR, (3) trend label at publish fixed in advance, (4) group comparison of medians + Spearman across articles with bootstrap CI, (5) weekly-differenced lag correlation as exploration only. Reserve CausalImpact for one site-level before/after question once ≥6 months of pre-data exist.

### Cited Findings
- All aggregates usable as window functions via `OVER`; `lag(x, offset, default)`; `IGNORE NULLS` supported for value functions; `corr`, `regr_slope`, `stddev` available. — [Trino window functions](https://trino.io/docs/current/functions/window.html); [Trino aggregate functions](https://trino.io/docs/current/functions/aggregate.html)

### Inferences (SQL sketches — untested, adapt table/column names)

Daily series must be densified first (GSC/GA omit zero days). Use a date spine:

```sql
-- 1. dense daily series per page (zeros filled)
WITH spine AS (
  SELECT p.page, d.dt
  FROM (SELECT DISTINCT page, min(dt) AS first_dt FROM gsc_page_daily GROUP BY page) p
  CROSS JOIN UNNEST(sequence(p.first_dt, current_date - INTERVAL '3' DAY, INTERVAL '1' DAY)) AS d(dt)
)
SELECT s.page, s.dt,
       coalesce(g.clicks, 0) AS clicks,
       coalesce(g.impressions, 0) AS impressions
FROM spine s LEFT JOIN gsc_page_daily g ON g.page = s.page AND g.dt = s.dt;
```

```sql
-- 2. rolling 7-day mean, z-score vs trailing 28 days (excluding today)
SELECT topic, dt, mentions,
  avg(mentions) OVER (PARTITION BY topic ORDER BY dt ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS ma7,
  (mentions - avg(mentions) OVER w28) / nullif(stddev(mentions) OVER w28, 0) AS z28
FROM trend_daily
WINDOW w28 AS (PARTITION BY topic ORDER BY dt ROWS BETWEEN 28 PRECEDING AND 1 PRECEDING);
```

```sql
-- 3. weekly, first-differenced lagged correlation (trend leads site by k weeks), k = 0..4
WITH wk AS (
  SELECT date_trunc('week', t.dt) AS wk, sum(t.mentions) AS trend, sum(s.clicks) AS clicks
  FROM trend_daily t JOIN site_cluster_daily s ON s.dt = t.dt AND s.cluster = t.topic
  WHERE t.topic = 'X' GROUP BY 1
), d AS (
  SELECT wk,
    trend  - lag(trend)  OVER (ORDER BY wk) AS d_trend,
    clicks - lag(clicks) OVER (ORDER BY wk) AS d_clicks
  FROM wk
)
SELECT k, corr(d_clicks, d_trend_lagged) AS r, count(*) AS n, 2 / sqrt(count(*)) AS approx_band
FROM (
  SELECT k, d_clicks, lag(d_trend, k) OVER (PARTITION BY k ORDER BY wk) AS d_trend_lagged
  FROM d CROSS JOIN UNNEST(sequence(0, 4)) AS t(k)
)
WHERE d_trend_lagged IS NOT NULL AND d_clicks IS NOT NULL
GROUP BY k ORDER BY k;
```

```sql
-- 4. per-article event-time metrics: cum clicks @30/@90, first-30 share, half-life
WITH e AS (
  SELECT a.article_id, date_diff('day', a.published_at, s.dt) AS t, s.clicks, s.impressions
  FROM articles a JOIN dense_page_daily s ON s.page = a.url
  WHERE s.dt >= a.published_at
), c AS (
  SELECT article_id, t, clicks, impressions,
    sum(clicks) OVER (PARTITION BY article_id ORDER BY t ROWS UNBOUNDED PRECEDING) AS cum_clicks,
    sum(clicks) FILTER (WHERE t < 90) OVER (PARTITION BY article_id) AS clicks90
  FROM e WHERE t < 90
)
SELECT article_id,
  max(clicks90) AS clicks90,
  sum(clicks) FILTER (WHERE t < 30) AS clicks30,
  CAST(sum(clicks) FILTER (WHERE t < 30) AS double) / nullif(max(clicks90), 0) AS first30_share,
  min(t) FILTER (WHERE cum_clicks >= 0.5 * clicks90) AS half_life_days,
  max(t) AS observed_days   -- keep only observed_days = 89 for 90-day metrics
FROM c GROUP BY article_id;
```

```sql
-- 5. empirical-Bayes CTR (method of moments prior from articles with >=100 impressions)
WITH a AS (SELECT article_id, sum(clicks) c, sum(impressions) n FROM article_window GROUP BY 1),
prior AS (
  SELECT avg(CAST(c AS double)/n) m, var_samp(CAST(c AS double)/n) v FROM a WHERE n >= 100
), ab AS (SELECT m * (m*(1-m)/v - 1) AS alpha, (1-m) * (m*(1-m)/v - 1) AS beta FROM prior)
SELECT a.article_id, a.c, a.n, (a.c + ab.alpha) / (a.n + ab.alpha + ab.beta) AS ctr_eb
FROM a CROSS JOIN ab;
```

```sql
-- 6. Spearman across articles: trend strength at publish vs 90-day clicks
SELECT corr(r_trend, r_out) AS spearman_approx, count(*) AS n
FROM (
  SELECT rank() OVER (ORDER BY trend_z_at_publish) AS r_trend,
         rank() OVER (ORDER BY clicks90)          AS r_out
  FROM article_features WHERE observed_days >= 89
);
```

- **Recommended minimal, defensible set (Python only where noted):**
  1. Article-level event-time table (SQL #4) — the backbone.
  2. Trend label/strength fixed at publish time from data before publish (e.g. z-score of 4-week trend vs prior 12 weeks; SQL #2) — avoids look-ahead.
  3. Group comparison: median clicks90 / first30_share for trend-aligned vs other, with bootstrap 90% CI on the difference (Python, resample articles).
  4. Spearman ρ between trend strength and outcome with bootstrap CI (SQL #6 + Python CI). Report n; expect "inconclusive" for the first year.
  5. EB-smoothed CTR (SQL #5) when comparing article quality.
  6. Exploratory only: weekly differenced lagged correlation (SQL #3), a few pre-chosen lags; never claim causality.
  7. Optional later: one CausalImpact run (R or bsts-causalimpact) on a site/cluster-level series with unaffected controls, once ≥6 months pre-period exist.
  - Skip for now: Granger, synthetic control, staggered DiD regressions, per-article CausalImpact.
- Sample-size reality check: at 2–8 articles/month, 12 months gives ~25–100 articles; after the 90-day censoring and minimum-traffic floors, effectively perhaps 20–60. That supports descriptive comparisons with wide CIs, not fine-grained causal claims. Phrase findings as "consistent with" and give intervals.

### Gaps
- SQL sketches were not executed against the actual lakehouse (Trino MCP unreachable during research); syntax should be validated, especially `sum(...) FILTER (...) OVER (...)` support and `lag` inside the k-unnest pattern (#3 may be simpler as a self-join on `wk = wk + k weeks`).
