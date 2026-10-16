/* =============================================================================
 * 0UTL1ER — ブログのジャンル（docs/content/02-blog.md §3 の5つ）
 *
 * ジャンルの名前・説明・並び順は Payload の categories を正とする。
 * Payload にまだ登録されていないジャンルは、ここの既定値で表示する
 * （ブログの入口やタブが歯抜けにならないように）。
 * 記事末尾の案内（CTA）はジャンルごとにここで決める。
 * ===========================================================================*/
import type { Audience, Category } from "@/lib/payload";

/** カバー画像のないページの OGP 画像（src/app/blog/opengraph-image.tsx） */
export const BLOG_OG_IMAGE = "/blog/opengraph-image";

export type Genre = {
  slug: string;
  name: string;
  description: string;
  audience: Audience;
  order: number;
  /** Payload に登録済みか */
  inCms: boolean;
  /** Payload の元データ（登録済みのときだけ） */
  cms?: Category;
};

type GenreDefault = Omit<Genre, "inCms" | "cms"> & {
  /** 記事末尾とジャンルページ末尾の案内 */
  cta: { title: string; description: string };
  /** つなぐサービス（Payload で未設定のとき） */
  service: { label: string; href: string };
};

const DEFAULTS: GenreDefault[] = [
  {
    slug: "local-marketing",
    name: "集客・MEO",
    description:
      "Googleマップ、LINE、口コミなど、お店にお客さんを呼ぶための話です。設定の手順や、仕様が変わったときに確認しておくことをまとめています。",
    audience: "local",
    order: 10,
    cta: {
      title: "Googleマップや口コミのことで迷ったら",
      description:
        "いまの表示や口コミの状態を一緒に見て、どこから手をつけるとよいかをお伝えします。",
    },
    service: { label: "集客支援（MEO）", href: "/services" },
  },
  {
    slug: "seo",
    name: "Web・SEO",
    description:
      "お店や会社のホームページを、検索で見つけてもらうための話です。作り直す前に確かめたいこと、日々の更新で気をつけることを書いています。",
    audience: "local",
    order: 20,
    cta: {
      title: "ホームページの見直しを考えているなら",
      description:
        "検索での見え方と、いまのページの中身を確認したうえで、直すところの順番をご提案します。",
    },
    service: { label: "SEO・Webサイト改善", href: "/services" },
  },
  {
    slug: "development",
    name: "開発",
    description:
      "業務システムやWebアプリを作るときの考え方と、実際の作業で分かったことの記録です。",
    audience: "business",
    order: 30,
    cta: {
      title: "システムを作る・直す相談",
      description:
        "作りたいものがまだはっきりしていなくても構いません。いまの業務の流れと困っていることを聞かせてください。",
    },
    service: { label: "受託開発", href: "/services" },
  },
  {
    slug: "infrastructure",
    name: "インフラ・クラウド",
    description:
      "自社で運用している Kubernetes 基盤で起きた障害と、その原因・直し方の記録です。構成やバージョンも書いています。",
    audience: "business",
    order: 40,
    cta: {
      title: "サーバー・クラウドの運用の相談",
      description:
        "いまの構成と月々の費用、困っていることを伺い、移すべきかどうかも含めてお答えします。",
    },
    service: { label: "マネージドプライベートクラウド", href: "/services" },
  },
  {
    slug: "company",
    name: "会社・考え方",
    description: "0UTL1ER がどう考えて仕事をしているか、代表とメンバーが書いています。",
    audience: "both",
    order: 50,
    cta: {
      title: "0UTL1ER に相談する",
      description: "どのサービスが合うか分からない段階でも、まずは内容をお聞かせください。",
    },
    service: { label: "会社概要", href: "/company" },
  },
];

const FALLBACK_CTA = DEFAULTS[DEFAULTS.length - 1].cta;

/** Payload のジャンルと既定値を合わせた一覧（並び順つき） */
export function mergeGenres(cms: Category[]): Genre[] {
  const bySlug = new Map(cms.map((c) => [c.slug, c]));
  const out: Genre[] = DEFAULTS.map((d) => {
    const c = bySlug.get(d.slug);
    return {
      slug: d.slug,
      name: c?.name || d.name,
      description: c?.description || d.description,
      audience: c?.audience || d.audience,
      order: c?.order ?? d.order,
      inCms: !!c,
      cms: c,
    };
  });
  for (const c of cms) {
    if (DEFAULTS.some((d) => d.slug === c.slug)) continue;
    out.push({
      slug: c.slug,
      name: c.name,
      description: c.description || "",
      audience: c.audience || "both",
      order: c.order ?? 100,
      inCms: true,
      cms: c,
    });
  }
  return out.sort((a, b) => a.order - b.order);
}

export function genreDefault(slug: string): GenreDefault | undefined {
  return DEFAULTS.find((d) => d.slug === slug);
}

export function genreCta(slug: string | undefined) {
  return (slug && genreDefault(slug)?.cta) || FALLBACK_CTA;
}

/** /blog の入口2つ */
export const ENTRANCES: {
  audience: Exclude<Audience, "both">;
  label: string;
  eyebrow: string;
  lead: string;
  /** 入口カードの写真（public/images/blog/CREDITS.md） */
  image: { src: string; alt: string };
}[] = [
  {
    audience: "local",
    label: "お店の集客の話",
    eyebrow: "お店・地域の事業者さま向け",
    lead: "Googleマップやホームページで、お客さんに見つけてもらうための話。",
    image: { src: "/images/blog/entrance-local.jpg", alt: "自転車が並ぶ通りに面した、小さなコーヒー店の店先" },
  },
  {
    audience: "business",
    label: "開発・インフラの話",
    eyebrow: "企業のIT担当者さま・エンジニア向け",
    lead: "システム開発とサーバー運用の、実際の記録。",
    image: { src: "/images/blog/entrance-tech.jpg", alt: "ケーブルがつながったサーバーラック" },
  },
];
