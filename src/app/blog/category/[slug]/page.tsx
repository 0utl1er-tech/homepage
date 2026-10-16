import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { GenreTabs } from "@/components/blog/genre-tabs";
import { EmptyNote, FeaturedPosts, PostList } from "@/components/blog/post-list";
import { BreadcrumbJsonLd } from "@/components/blog/json-ld";
import { BLOG_OG_IMAGE, genreCta, genreDefault, mergeGenres } from "@/lib/blog";
import {
  getCategories,
  getCategoryBySlug,
  getPosts,
  isObj,
  populatedPosts,
} from "@/lib/payload";
import { COMPANY } from "@/lib/site";

type Params = Promise<{ slug: string }>;

async function load(slug: string) {
  const [cats, one, posts] = await Promise.all([
    getCategories(),
    getCategoryBySlug(slug),
    getPosts({ categorySlug: slug, limit: 50 }),
  ]);
  const genres = mergeGenres(cats.docs);
  const genre = genres.find((g) => g.slug === slug);
  return { genres, genre, category: one.category, posts, ok: cats.ok && one.ok && posts.ok };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const { genre, posts } = await load(decodeURIComponent(slug));
  if (!genre) return { title: "ジャンルが見つかりません", robots: { index: false } };

  const path = `/blog/category/${genre.slug}`;
  const title = `${genre.name}の記事`;
  const description = genre.description;
  return {
    title,
    description,
    alternates: { canonical: path },
    // 記事が1本もないジャンルは検索に出さない（中身の薄い一覧ページを避ける）
    robots: posts.docs.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | ${COMPANY.nameJa}`,
      description,
      type: "website",
      url: `https://0utl1er.tech${path}`,
      siteName: COMPANY.nameJa,
      locale: "ja_JP",
      images: [BLOG_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.nameJa}`,
      description,
      images: [BLOG_OG_IMAGE],
    },
  };
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  await connection();
  const { slug } = await params;
  const { genres, genre, category, posts, ok } = await load(decodeURIComponent(slug));
  if (!genre) notFound();

  const featured = populatedPosts(category?.featuredPosts).slice(0, 3);
  const fallback = genreDefault(genre.slug);
  const service = isObj(category?.service) ? category.service : null;
  const cta = genreCta(genre.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "ホーム", path: "/" },
          { name: "ブログ", path: "/blog" },
          { name: genre.name, path: `/blog/category/${genre.slug}` },
        ]}
      />
      <SiteNav active="blog" />

      <PageHeader
        eyebrow={
          <Link href="/blog" className="transition-colors hover:text-brand">
            ← ブログ — BLOG
          </Link>
        }
        title={genre.name}
        lead={<span className="whitespace-pre-line">{genre.description}</span>}
      />

      <section>
        <div className="mx-auto max-w-[1200px] px-6 pt-14 md:px-12">
          <GenreTabs genres={genres} active={genre.slug} />
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="mx-auto max-w-[1200px] px-6 pt-12 md:px-12">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">まず読む3本</h2>
              <span className="font-mono text-[13px] text-ink-3">START HERE</span>
            </div>
            <FeaturedPosts posts={featured} />
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-16 md:px-12">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              {featured.length > 0 ? "記事の一覧" : "新着の記事"}
            </h2>
            <span className="font-mono text-[13px] text-ink-3">
              {posts.docs.length > 0 ? `${posts.docs.length} 本` : "ARTICLES"}
            </span>
          </div>
          {posts.docs.length > 0 ? (
            <PostList posts={posts.docs} showGenre={false} />
          ) : ok ? (
            <EmptyNote>
              このジャンルで公開している記事はまだありません。
              <br />
              ほかのジャンルの記事は
              <Link href="/blog" className="mx-1 text-brand hover:text-brand-hover">
                ブログのトップ
              </Link>
              からご覧いただけます。
            </EmptyNote>
          ) : (
            <EmptyNote>
              記事の一覧を読み込めませんでした。
              <br />
              少し時間をおいて、もう一度ページを開いてください。
            </EmptyNote>
          )}
        </div>
      </section>

      {/* 対応するサービスへの案内 */}
      {(service || fallback) && (
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 px-6 py-14 md:grid-cols-[320px_1fr] md:px-12">
            <div>
              <div className="mb-2 font-mono text-[13px] text-ink-3">SERVICE</div>
              <h2 className="text-2xl font-semibold tracking-tight">関係するサービス</h2>
            </div>
            <DSCard className="p-6">
              <div className="mb-1.5 text-[17px] font-bold">
                {service?.name ?? fallback?.service.label}
              </div>
              {service?.summary && (
                <p className="mb-4 text-sm leading-relaxed text-ink-2">{service.summary}</p>
              )}
              <Link
                href={service ? "/services" : (fallback?.service.href ?? "/services")}
                className="o-arrow mt-2"
              >
                詳しく見る →
              </Link>
            </DSCard>
          </div>
        </section>
      )}

      <CtaBand title={cta.title} titleSize="md" panel borderTop />

      <SiteFooter />
    </>
  );
}
