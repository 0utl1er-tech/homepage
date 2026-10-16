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
    value: "いまの運用費を下げる",
    valueNote: "動いているホームページや業務システムを、中身はそのまま引き取って自社の基盤で運用。維持にかかる費用だけを下げる。",
    means: "マネージドクラウド",
    summary: "いま動いているホームページや業務システムを、中身はそのまま引き取り、自社のクラウドで運用します。お客様の手間は増やさずに、維持にかかる費用を下げます。",
    image: "/images/services/cloud.jpg",
    imageAlt: "サーバーラック",
  },
  {
    slug: "saas",
    kind: "SaaS",
    value: "作らずに、仕組みが手に入る",
    valueNote: "顧客管理や集客の分析など、本来なら開発が必要な仕組みを、月額ですぐに使える。",
    means: "ソフトウェア",
    summary: "顧客管理や集客の分析など、本来なら開発が必要な仕組みを、作らずに月額ですぐ使える形でご提供します。",
    image: "/images/services/software.jpg",
    imageAlt: "カフェのカウンターに置いたタブレットのレジ",
  },
  {
    slug: "bpaas",
    kind: "BPaaS",
    value: "業務ごと任せる",
    valueNote: "ソフトと担当者がひと組になって、集客の業務を丸ごと動かす。社内に担当がいなくても回る。",
    means: "コンサルティング",
    summary: "ソフトウェアと担当者がひと組になり、集客の業務を丸ごと引き受けます。",
    image: "/images/services/consulting.jpg",
    imageAlt: "二人で同じノートパソコンを見ながら進める様子",
  },
  {
    slug: "taas",
    kind: "TaaS",
    value: "腕の立つ人を、チームに迎える",
    valueNote: "事業を預かるのではなく、0UTL1ER の技術者がお客様のチームの一員として働く。",
    means: "スペシャリスト",
    summary: "事業をお預かりするのではなく、0UTL1ER の技術者がお客様のチームの一員として働きます。",
    image: "/images/services/specialist.jpg",
    imageAlt: "暗い部屋で2台のモニターに向かう技術者",
  },
];

export function getServiceLine(slug: string): ServiceLine | undefined {
  return SERVICE_LINES.find((s) => s.slug === slug);
}
