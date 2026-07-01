/* =============================================================================
 * 0UTL1ER — 構造化データ（JSON-LD / schema.org Organization）
 * 検索結果のリッチ表示・ナレッジパネルの手がかりになる。無料・SEO 上有効。
 * ===========================================================================*/
import { COMPANY } from "@/lib/site";

const SITE_URL = "https://0utl1er.tech";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.nameJa,
    alternateName: COMPANY.nameEn,
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    email: COMPANY.email,
    slogan: COMPANY.tagline,
    address: {
      "@type": "PostalAddress",
      postalCode: COMPANY.zip.replace(/[^0-9-]/g, ""),
      addressRegion: "埼玉県",
      addressLocality: "久喜市",
      streetAddress: COMPANY.address.replace(/^埼玉県久喜市/, ""),
      addressCountry: "JP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY.email,
      contactType: "customer support",
      areaServed: "JP",
      availableLanguage: ["ja"],
    },
  };
  return (
    <script
      type="application/ld+json"
      // JSON-LD は静的に生成した信頼できる値のみ埋め込む
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.nameJa,
    url: SITE_URL,
    inLanguage: "ja",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
