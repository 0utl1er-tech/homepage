/* =============================================================================
 * 0UTL1ER — メンバー情報
 * プロフィールページ（/members/[slug]）と JSON-LD の単一データソース。
 * 事実の修正・リンク追加はこのファイルだけを編集すればよい。
 * ===========================================================================*/

export type MemberLink = { label: string; url: string };

export type Member = {
  slug: string;
  nameJa: string;
  /** ローマ字表記 */
  nameEn: string;
  /** 肩書 */
  title: string;
  /** 一行の役割説明（meta description などに使用） */
  role: string;
  /** 経歴・紹介文（段落ごと） */
  bio: string[];
  /** 専門領域（schema.org knowsAbout にも使用） */
  knowsAbout: string[];
  /** 外部リンク（表示用） */
  links: MemberLink[];
  /** schema.org sameAs — 本人の公的プロフィール URL を列挙 */
  sameAs: string[];
};

export const MEMBERS: Member[] = [
  {
    slug: "kuroha-jo",
    nameJa: "黒羽 晟",
    // TODO: 表記ゆれ確認（Kuroha/Kuroba, Jo/Sei など）— 下記ローマ字は暫定の推定表記
    nameEn: "Jo Kuroha",
    title: "代表取締役",
    role: "受託開発・エンジニア育成/派遣・マネージドプライベートクラウドを手がける 0UTL1ER株式会社の代表取締役。",
    bio: [
      "0UTL1ER株式会社 代表取締役。埼玉県久喜市を拠点に、受託開発、エンジニアの育成・派遣、マネージドプライベートクラウドの各事業を手がける。",
      "Kubernetes ベースの自社プライベートクラウド基盤（kuki-dc）を自ら設計・構築・運用し、その上でマネージドサービスを提供している。基盤は CNCF 系の OSS を中心に構成し、ブラックボックスを作らない透明な運用を方針とする。",
      "あわせて、MEO / SEO を中心とした集客支援も提供。「Beyond the Correlation」を掲げ、先端技術を手の届く価格のサービスとして届けることに取り組んでいる。",
    ],
    knowsAbout: [
      "Kubernetes",
      "CNCF / OSS インフラ",
      "プライベートクラウド設計・運用",
      "クラウドインフラ運用",
      "Next.js / TypeScript",
      "SEO / MEO",
    ],
    links: [{ label: "0UTL1ER株式会社", url: "https://0utl1er.tech" }],
    // TODO: Google Scholar プロフィール URL をここに追加予定（追加はこの配列のみでよい）
    sameAs: [],
  },
];

export function getMember(slug: string): Member | undefined {
  return MEMBERS.find((m) => m.slug === slug);
}
