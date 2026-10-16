import type { MetadataRoute } from "next";
import { getList } from "@/lib/strapi";
import { MEMBERS } from "@/lib/members";
import { getPosts } from "@/lib/payload";
import { SERVICE_LINES } from "@/lib/services";

const SITE_URL = "https://0utl1er.tech";

// sitemap.ts は特殊 Route Handler で、既定ではビルド時に固定される
// （CMS で記事を追加してもデプロイまで sitemap に載らない）。
// 5分ごとに再生成して Strapi の記事増減を自動反映する。
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    ...SERVICE_LINES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/company`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/members`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
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

  // ブログ（Payload の公開記事だけ）。記事が1本以上あるジャンルのページも載せる
  // （0本のジャンルページは noindex にしているので載せない）。取れなければ載せない。
  const blogRoutes: MetadataRoute.Sitemap = [];
  const posts = await getPosts({ limit: 1000 });
  const genres = new Map<string, string | undefined>();
  for (const p of posts.docs) {
    const modified = p.contentUpdatedAt || p.publishedAt || undefined;
    blogRoutes.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    if (typeof p.category === "object" && p.category) {
      const prev = genres.get(p.category.slug);
      if (!prev || (modified && modified > prev)) genres.set(p.category.slug, modified);
    }
  }
  for (const [slug, lastModified] of genres) {
    blogRoutes.push({
      url: `${SITE_URL}/blog/category/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
