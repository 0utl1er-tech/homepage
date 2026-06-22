# 0UTL1ER株式会社 — コーポレートサイト

「相関の外側へ」。0UTL1ER株式会社のコーポレートサイトです。Claude Design で作成したラフを基に、
**Next.js + Tailwind CSS + shadcn/ui** で実装しています。ダークモード前提のデザインシステムを移植しています。

## 技術スタック

| | |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| UI | shadcn/ui (base-nova) + 自前のDSコンポーネント |
| フォント | Noto Sans JP / JetBrains Mono (`next/font`) |
| CMS（任意） | Strapi（未接続時はサンプル表示） |

## ページ構成

| ルート | 内容 | 元ファイル |
|---|---|---|
| `/` | トップ（相関の外側へ・アニメーション散布図） | `トップ.dc.html` |
| `/services` | 事業内容（3つの要素・OSSスタック・提供形態） | `事業内容.dc.html` |
| `/products` | サービス & お知らせ一覧（Strapi連携） | `プロダクト.dc.html` |
| `/products/[slug]` | サービス / 記事詳細（Markdown本文） | `プロダクト詳細.dc.html` |
| `/company` | 会社概要 | `会社概要.dc.html` |
| `/contact` | お問い合わせフォーム | `お問い合わせ.dc.html` |
| （`loading.tsx`） | ロード画面 | `ロード画面.dc.html` |

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
npm run lint     # ESLint
```

## デザインシステム

トークンは `src/app/globals.css` に集約しています（`design-ref/_ds/.../tokens/` を移植）。
深いネイビーを基調に、ブランド=青、利益=緑、コスト=赤、売上=シアン。図版・数値は等幅（JetBrains Mono）。

- 主要トークン: `--accent` `--profit` `--cost` `--surface-1..3` `--text-primary/secondary/muted` ほか
- Tailwindユーティリティ: `text-brand` `bg-surface` `border-line` `text-ink-2` `font-mono` など
- DSコンポーネント: `src/components/ds/`（Card / Badge / Avatar / ImageSlot / 装飾）

## Strapi 連携

`src/lib/strapi.ts` がサービス/お知らせを取得します。**環境変数が未設定ならサンプルを表示**します。

`.env.local` を作成して設定してください（`.env.example` 参照）:

```bash
NEXT_PUBLIC_STRAPI_URL=https://cms.0utl1er.tech   # 末尾の /api は不要
STRAPI_TOKEN=                                       # Public 公開なら空でOK
```

Strapi 側の Collection Type `Product`（API ID: `products`）に
`title` / `slug` (UID) / `excerpt` / `body` (Rich text) / `coverImage` (Media) / `category` を用意し、
Public ロールで `find` / `findOne` を公開してください。

## 参考素材

元になった Claude Design のラフ（HTML / デザインシステム / スクリーンショット）は `design-ref/` に保管しています。
実装の参照用で、ビルド・Lint対象からは除外しています。
