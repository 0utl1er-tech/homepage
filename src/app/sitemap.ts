import type { MetadataRoute } from "next";
import { getList } from "@/lib/strapi";
import { MEMBERS } from "@/lib/members";

const SITE_URL = "https://0utl1er.tech";

// sitemap.ts は特殊 Route Handler で、既定ではビルド時に固定される
// （CMS で記事を追加してもデプロイまで sitemap に載らない）。
// 5分ごとに再生成して Strapi の記事増減を自動反映する。
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/company`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/members`, changeFrequency: "monthly", priority: 0.6 },
    ...MEMBERS.map((m) => ({
      url: `${SITE_URL}/members/${m.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  // Strapi 記事（未接続時はサンプルのスラッグ）を動的に追加。
  // ビルドが取得失敗で落ちないよう握りつぶす。
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { items } = await getList();
    productRoutes = items.map((item) => ({
      url: `${SITE_URL}/products/${item.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...productRoutes];
}
