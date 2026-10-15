/* =============================================================================
 * ブログ用の構造化データ（BlogPosting / BreadcrumbList）
 * 本文は CMS の値なので、</script> で抜けられないよう "<" をエスケープして埋める。
 * ===========================================================================*/
import { COMPANY } from "@/lib/site";
import { isObj, mediaUrl, type Post } from "@/lib/payload";

const SITE_URL = "https://0utl1er.tech";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE_URL}${it.path}`,
        })),
      }}
    />
  );
}

export function BlogPostingJsonLd({
  post,
  authorHasPage,
}: {
  post: Post;
  authorHasPage: boolean;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const author = isObj(post.author) ? post.author : null;
  const category = isObj(post.category) ? post.category : null;
  const image = mediaUrl(post.cover);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description || undefined,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "ja",
        datePublished: post.publishedAt || undefined,
        dateModified: post.contentUpdatedAt || post.publishedAt || undefined,
        image: image ? [image] : undefined,
        articleSection: category?.name,
        keywords: post.tags?.length ? post.tags.join(", ") : undefined,
        author: author
          ? {
              "@type": "Person",
              name: author.nameJa,
              alternateName: author.nameEn || undefined,
              jobTitle: author.title || undefined,
              url: authorHasPage ? `${SITE_URL}/members/${author.slug}` : undefined,
            }
          : { "@type": "Organization", name: COMPANY.nameJa, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: COMPANY.nameJa,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
        },
      }}
    />
  );
}
