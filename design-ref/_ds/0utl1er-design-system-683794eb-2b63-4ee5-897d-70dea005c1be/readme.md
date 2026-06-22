# 0UTL1ER Design System

Design system for **0UTL1ER株式会社** and its internal BI tool, **0UTL1ER Insight**.

## What this product is

0UTL1ER Insight is a **profit-attribution BI tool**. It answers one question clearly and visually:

> **誰が・どれだけの売上を作り・いくらのコスト（社保込み）を経て・どれだけの利益を会社に残しているか。**

The canonical example from the brief: 代表の **黒羽 晟** は毎月 **¥800,000** の売上を作り、社保込みで **¥350,000** を支払っている。つまり会社に約 **¥450,000** の利益をもたらしている。本ツールはこの因果関係（売上 → コスト → 利益）を、メンバー一人ひとりについて視覚的に分かりやすく示す。

Core views: **概要 (Overview)**, **貢献フロー (Sankey)**, **利益ランキング**, **メンバー詳細**.

## Sources

This system was built from scratch from a written brief — **no codebase, Figma, logo, or font files were provided.** Direction was confirmed with the user:
- Tone: professional / trustworthy, finance & accounting feel.
- Theme: **dark-mode-first** (deep navy base).
- Financial colors: **green = profit, red = cost** (cyan = revenue).
- Type: modern gothic (Noto Sans JP), **monospace for all figures**.
- Visualizations requested: Sankey flow, per-member cards/table, ranking.

If a brand kit, logo, or self-hosted fonts exist, share them and this system will be updated.

---

## CONTENT FUNDAMENTALS

**Language.** UI copy is **Japanese**. Labels are short noun phrases — 概要, 貢献フロー, 利益ランキング, 純利益, 社保込み — no trailing punctuation on labels or buttons. Full sentences (summaries, hints) use a calm declarative 丁寧体 (…です／…ています).

**Voice.** Neutral, factual, analytical — never salesy or playful. The tool states relationships plainly: 「黒羽 晟さんは毎月¥800,000の売上を生み出し、社保込みで¥350,000のコストがかかっています。つまり会社に+¥450,000の利益をもたらしています。」 Numbers carry the message; prose connects them.

**Person.** Third-person about members (「〜さんは」), no first-person company voice. Members are referred to with name + さん in prose, name alone in tables.

**Money & numbers.** Always yen with the ¥ symbol and thousands separators: `¥800,000`. Profit is signed positive `+¥450,000`; cost/loss negative `−¥350,000` (use the real minus `−`, not a hyphen). Percentages to one decimal: `38.5%`. Period-over-period uses ▲/▼ + percent. All figures monospace, tabular.

**Casing.** Latin micro-labels (eyebrows, section keys) are UPPERCASE with wide tracking (e.g. `INSIGHT`). Everything else sentence/noun case.

**Emoji.** None. This is a financial tool — emoji are off-brand. Status is conveyed with color + dot badges (黒字/赤字), never emoji.

**Vibe.** Quiet confidence. Dense but legible. The screen should feel like a well-instrumented cockpit, not a marketing page.

---

## VISUAL FOUNDATIONS

**Overall.** Dark, calm, instrument-panel aesthetic. Deep navy canvas, restrained accent, color reserved almost entirely for **meaning** (profit/cost/revenue) rather than decoration.

**Color.** Base is a deep-navy neutral ramp (`--bg-app #0a0e18` → `--surface-3`). Surfaces step up in lightness with elevation; borders are low-contrast navy hairlines (`--border-default`) plus a 5% inner top highlight (`--edge-highlight`) to lift cards off the void. The three financial semantics are the loudest colors on screen: **profit green `#22c55e`**, **cost red `#ef4444`**, **revenue cyan `#22d3ee`**. Brand/interactive accent is **blue `#3b82f6`** (links, focus, primary buttons) — deliberately distinct from the financial trio so "interactive" never reads as "profit." Amber is reserved for warnings.

**Type.** Noto Sans JP for all UI text and Japanese; **JetBrains Mono for every figure** (money, %, deltas, ranks) with `tabular-nums` so columns align. Display sizes use weight 700–900 and slightly negative tracking; body is 14px (dense BI default). Micro-labels: 11–12px, semibold, uppercase, `0.12em` tracking.

**Spacing.** 4px base grid (`--space-*`). Cards pad 20–24px; KPI tiles and table rows are compact. Layout: fixed 248px sidebar + 56px topbar, scrolling content area, content max ~1180px.

**Backgrounds.** Flat dark fills — **no photographic imagery, no decorative gradients.** The only gradients used are subtle vertical shading inside the ContributionBar/Sankey ribbons to give the bars dimension, and the Sankey link ribbon gradients (semantic, not decorative). No textures, no patterns.

**Corners.** Soft but not pill-ish: controls/cards `--radius-md (10px)` to `--radius-lg (14px)`; bars and chips fully rounded (`--radius-pill`); small chips `--radius-sm (6px)`.

**Cards.** `--surface-1` fill, 1px `--border-default`, `--radius-lg`, `--shadow-sm` + inner top highlight. Optional 3px left **tone stripe** (profit/cost/accent) to flag financial meaning. Interactive cards lift `translateY(-2px)` with a stronger shadow on hover.

**Shadows.** Tuned for dark UIs — deep, soft, low-opacity black (`--shadow-sm/md/lg`), paired with the inner highlight rather than relying on light glows. Emphasis glows (`--glow-profit/cost/accent`) exist but are used sparingly.

**Borders.** Hairline navy throughout; strengthen to `--border-strong` on hover/elevated surfaces; accent border on active/selected (e.g. selected sort toggle, result row).

**Motion.** Confident and brief. Default `--ease-out` (cubic-bezier(.22,1,.36,1)), durations 120/200/360ms. The signature motion is the **flow reveal**: ContributionBar segments grow from 0 width (`--dur-flow 900ms`) and Sankey ribbons fade in staggered. All gated behind `prefers-reduced-motion`. No bounces on data, no infinite loops.

**Hover / press.** Hover: surface lightens one step (`--surface-2/3`), buttons lift 1px and lighten. Press/active: accent deepens to `--accent-active`. Nav items show an accent left-bar + tinted background when active.

**Transparency & blur.** Tints (`--*-tint`, ~12–14% alpha) back badges and selected states. No heavy glassmorphism/backdrop-blur — the aesthetic is solid surfaces, not frosted glass.

**Imagery vibe.** People are shown as **initials avatars** (first kanji for JP names) with a deterministic tint and an optional status ring (green profit / red loss). No stock photography.

---

## ICONOGRAPHY

- **Set:** [Lucide](https://lucide.dev) (MIT) — clean 24×24 stroke icons, `stroke-width: 2`, round caps/joins. Matches the precise, technical tone.
- **Delivery:** the UI kit ships a tiny `<Icon name>` component (`ui_kits/bi-dashboard/Icons.jsx`) embedding the Lucide path data we use (dashboard, flow/git-branch, users, trophy, search, calendar, bell, sliders, building, trending-up/down, arrows, download, etc.). For broader use, load Lucide from CDN or `npm i lucide-react`.
- **Color:** icons inherit `currentColor` — muted (`--text-muted`) in chrome, accent when active, semantic green/red only when representing profit/cost.
- **Status, not icons:** 黒字/赤字 and other states use **color + dot Badge**, not iconography.
- **Emoji / unicode:** not used as icons. The only glyph characters used semantically are ▲ ▼ (deltas) and the minus sign − (negative figures).
- *(Substitution flag: Lucide is a substitute chosen to fit the stroke style — no brand icon set was provided.)*

---

## INDEX

**Root**
- `styles.css` — global entry (consumers link this); `@import` manifest only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `base.css`.
- `SKILL.md` — Agent-Skill wrapper.

**Foundation cards** — `guidelines/*.card.html` (render in the Design System tab)
- Colors: financial semantics, brand accent, surfaces & neutrals, text.
- Type: families, scale, figures & numerals.
- Spacing: scale, radius & elevation.
- Brand: wordmark.

**Components** (`window.Ds0UTL1ERDesignSystem_683794`)
- `components/core/` — **Button**, **Card**, **Badge**, **Avatar**.
- `components/data/` — **StatCard** (KPI tile), **ContributionBar** (signature split bar), **MemberRow** (ranking row).
- Each: `Name.jsx` + `Name.d.ts` + `Name.prompt.md`; one `*.card.html` demo per directory.

**UI kit**
- `ui_kits/bi-dashboard/` — **0UTL1ER Insight** interactive dashboard. Entry `index.html`; see its `README.md`.

## Using the system
Consumers link `styles.css` and read components from the global namespace `window.Ds0UTL1ERDesignSystem_683794`. Foundation values are CSS custom properties on `:root` — prefer semantic aliases (`--profit`, `--surface-1`, `--text-primary`) over base ramp values.
