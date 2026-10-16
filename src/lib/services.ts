/* =============================================================================
 * 事業内容（/services）の4つの事業
 *
 * 図の上の段は「お客様に届く形と価値」（IaaS / SaaS / BPaaS / TaaS）、
 * 下の段は「それを支える手段」（マネージドクラウド / ソフトウェア / コンサルティング / スペシャリスト）。
 * 詳細ページ（/services/{slug}）の本文は Payload の「サービス」で編集する。
 * Payload にまだ無いときは、ここの summary を冒頭に出す。
 * ===========================================================================*/

export type ServiceSlug = "iaas" | "saas" | "bpaas" | "taas";

export type ServiceLine = {
  slug: ServiceSlug;
  /** 提供の形（図の上の段の小見出し） */
  kind: string;
  /** お客様に届く価値（図の上の段の見出し） */
  value: string;
  /** 価値の一言説明 */
  valueNote: string;
  /** 手段の名前（図のタイル） */
  means: string;
  /** 詳細ページの冒頭（Payload に無いとき） */
  summary: string;
  image: string;
  imageAlt: string;
};

export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: "iaas",
    kind: "IaaS",
    value: "動く場所ごと任せる",
    valueNote: "サイトやシステムが動く土台を、運用まで引き受ける。",
    means: "マネージドクラウド",
    summary: "サイトやシステムが動く土台を、自社のクラウドで用意し、運用まで引き受けます。",
    image: "/images/services/cloud.jpg",
    imageAlt: "サーバーラック",
  },
  {
    slug: "saas",
    kind: "SaaS",
    value: "道具をそのまま使う",
    valueNote: "必要なソフトを、契約してすぐに使える。",
    means: "ソフトウェア",
    summary: "自社で開発したソフトウェアを、契約してすぐに使える形でご提供します。",
    image: "/images/services/software.jpg",
    imageAlt: "カフェのカウンターに置いたタブレットのレジ",
  },
  {
    slug: "bpaas",
    kind: "BPaaS",
    value: "業務ごと任せる",
    valueNote: "ソフトと担当者がひと組になって、集客の業務を動かす。",
    means: "コンサルティング",
    summary: "ソフトウェアと担当者がひと組になり、集客の業務を丸ごと引き受けます。",
    image: "/images/services/consulting.jpg",
    imageAlt: "二人で同じノートパソコンを見ながら進める様子",
  },
  {
    slug: "taas",
    kind: "TaaS",
    value: "人の手で仕上げる",
    valueNote: "ソフトを介さず、人が入って仕事を完結させる。",
    means: "スペシャリスト",
    summary: "専門の技術者が、お客様の現場に入って仕事を完結させます。",
    image: "/images/services/specialist.jpg",
    imageAlt: "暗い部屋で2台のモニターに向かう技術者",
  },
];

export function getServiceLine(slug: string): ServiceLine | undefined {
  return SERVICE_LINES.find((s) => s.slug === slug);
}
