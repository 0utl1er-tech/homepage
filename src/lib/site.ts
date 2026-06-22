/* Shared site constants for 0UTL1ER株式会社 */

export const COMPANY = {
  nameJa: "0UTL1ER株式会社",
  nameEn: "0UTL1ER K.K.",
  tagline: "相関の外側へ",
  email: "info@0utl1er.tech",
  zip: "〒346-0005",
  address: "埼玉県久喜市久喜中央3-2-11",
  representative: "黒羽 晟",
  representativeTitle: "代表取締役",
  hours: "平日 10:00 — 19:00 (JST)",
} as const;

export type NavKey = "home" | "services" | "product" | "company" | "contact";

export const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "services", label: "[ 事業内容 ]", href: "/services" },
  { key: "product", label: "[ サービス ]", href: "/products" },
  { key: "company", label: "[ 会社概要 ]", href: "/company" },
];

/** A long faint binary string used as a decorative background element. */
export const BINARY_STRING =
  "0101000101010011010011100100101101010100010011110100111001010011010100100100010101010110010010010100111001000101";
