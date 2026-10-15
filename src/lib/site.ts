/* Shared site constants for 0UTL1ER株式会社 */

export const COMPANY = {
  nameJa: "0UTL1ER株式会社",
  nameEn: "0UTL1ER K.K.",
  // 英語のまま見せる（日本語訳だと「何を言っているのか」と引っかかるため。2026-10-15）
  tagline: "Beyond the Correlation",
  email: "info@0utl1er.tech",
  // 住所は「3丁目2-11」の公式表記で統一する（日本郵便・Google ビジネス
  // プロフィールの表記と揃え、NAP の一貫性を保つため）。GBP 側もこの表記に合わせること。
  zip: "〒346-0003",
  address: "埼玉県久喜市久喜中央3丁目2-11",
  representative: "黒羽 晟",
  representativeTitle: "代表取締役",
  hours: "平日 10:00 — 19:00 (JST)",
} as const;

export type NavKey =
  | "home"
  | "services"
  | "product"
  | "company"
  | "members"
  | "contact";

export const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "services", label: "[ 事業内容 ]", href: "/services" },
  { key: "product", label: "[ サービス ]", href: "/products" },
  { key: "company", label: "[ 会社概要 ]", href: "/company" },
  { key: "members", label: "[ メンバー ]", href: "/members" },
];

/** A long faint binary string used as a decorative background element. */
export const BINARY_STRING =
  "0101000101010011010011100100101101010100010011110100111001010011010100100100010101010110010010010100111001000101";
