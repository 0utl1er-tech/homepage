import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { DSAvatar } from "@/components/ds/ds-avatar";
import { DraftBanner } from "@/components/blog/draft-banner";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/blog/json-ld";
import { LexicalContent, buildToc, contentLength, type TocItem } from "@/components/blog/lexical";
import { Downloads } from "@/components/downloads";
import { PostList } from "@/components/blog/post-list";
import { BLOG_OG_IMAGE, genreCta, genreDefault } from "@/lib/blog";
import { getMember } from "@/lib/members";
import {
  POST_TYPE_LABEL,
  formatDateJa,
  getPostBySlug,
  getPosts,
  isObj,
  mediaUrl,
  type Post,
} from "@/lib/payload";
import { COMPANY } from "@/lib/site";

type Params = Promise<{ slug: string }>;

async function load(params: Params) {
  await connection();
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPostBySlug(decodeURIComponent(slug), draft);
  return { post, draft, slug: decodeURIComponent(slug) };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { post, draft } = await load(params);
  if (!post) return { title: "記事が見つかりません", robots: { index: false } };

  const path = `/blog/${post.slug}`;
  const description = post.description || undefined;
  const cover = mediaUrl(post.cover);
  const author = isObj(post.author) ? post.author : null;
  return {
    title: post.title,
    description,
    alternates: { canonical: path },
    // 下書きプレビューは検索に出さない
    robots: draft ? { index: false, follow: false, nocache: true } : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `https://0utl1er.tech${path}`,
      siteName: COMPANY.nameJa,
      locale: "ja_JP",
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.contentUpdatedAt || undefined,
      authors: author ? [author.nameJa] : undefined,
      tags: post.tags || undefined,
      images: cover
        ? [{ url: cover, alt: isObj(post.cover) ? post.cover.alt ?? "" : "" }]
        : [BLOG_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [cover ?? BLOG_OG_IMAGE],
    },
  };
}

function Toc({ toc }: { toc: TocItem[] }) {
  return (
    <ol className="space-y-1">
      {toc.map((t) => (
        <li key={t.id} className={t.level === 3 ? "pl-4" : undefined}>
          <a
            href={`#${t.id}`}
            className={
              t.level === 2
                ? "block py-1 text-[13px] leading-snug text-ink-2 transition-colors hover:text-brand"
                : "block py-1 text-xs leading-snug text-ink-3 transition-colors hover:text-brand"
            }
          >
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function ComparisonNotice({ post }: { post: Post }) {
  const c = post.comparison;
  if (post.type !== "comparison" || !c) return null;
  return (
    <aside
      aria-label="この記事について"
      className="mb-10 border border-[var(--warning-border)] bg-[var(--warning-tint)] p-5 md:p-6"
    >
      <div className="mb-2.5 text-sm font-bold text-[var(--warning-strong)]">この記事について</div>
      {c.disclosure && (
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink">{c.disclosure}</p>
      )}
      {(c.checkedAt || c.method) && (
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-[var(--warning-border)]/60 pt-4 text-sm md:grid-cols-[auto_1fr]">
          {c.checkedAt && (
            <>
              <dt className="font-bold text-ink-2">他社情報の確認日</dt>
              <dd className="text-ink">{formatDateJa(c.checkedAt)}</dd>
            </>
          )}
          {c.method && (
            <>
              <dt className="font-bold text-ink-2">調べ方</dt>
              <dd className="whitespace-pre-line leading-relaxed text-ink">{c.method}</dd>
            </>
          )}
        </dl>
      )}
    </aside>
  );
}

/** プレビュー中に記事が取れなかったとき（API キー未設定・slug 違いなど）の画面 */
function DraftMissing({ slug }: { slug: string }) {
  return (
    <>
      <SiteNav active="blog" />
      <DraftBanner path={`/blog/${slug}`} />
      <div className="mx-auto max-w-[820px] px-6 py-24 md:px-12">
        <h1 className="mb-4 text-2xl font-semibold">下書きを読み込めませんでした</h1>
        <p className="text-[15px] leading-relaxed text-ink-2">
          URL名「{slug}」の記事が見つからないか、ホームページから CMS の下書きを読む設定（API キー）が済んでいません。
          CMS の記事画面でURL名を確かめてから、もう一度「プレビュー」を押してください。
        </p>
      </div>
      <SiteFooter />
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { post, draft, slug } = await load(params);

  if (!post) {
    if (draft) return <DraftMissing slug={slug} />;
    notFound();
  }

  const category = isObj(post.category) ? post.category : null;
  // 技術マップ上の場所（例: テック › 開発 › アプリケーション › フロントエンド › Next.js）
  const topicPath = isObj(post.primaryTopic)
    ? (post.primaryTopic.breadcrumbs ?? []).map((b) => b.label ?? "").filter(Boolean)
    : [];
  const author = isObj(post.author) ? post.author : null;
  const authorHasPage = !!(author && getMember(author.slug));
  const photo = author ? mediaUrl(author.photo, "thumb") ?? mediaUrl(author.photo) : null;
  const cover = mediaUrl(post.cover);
  const { toc, ids } = buildToc(post.content);
  const minutes = Math.max(1, Math.round(contentLength(post) / 500));
  const cta = genreCta(category?.slug);
  const service = isObj(post.relatedService) ? post.relatedService : null;
  const fallbackService = category ? genreDefault(category.slug)?.service : undefined;

  const related = category
    ? (await getPosts({ categorySlug: category.slug, limit: 4 })).docs
        .filter((p) => p.id !== post.id)
        .slice(0, 3)
    : [];

  const changelog = (post.changelog ?? [])
    .filter((c) => c.date && c.note)
    .sort((a, b) => b.date.localeCompare(a.date));
  const external = [
    post.zenn?.url ? { label: "Zenn", url: post.zenn.url } : null,
    post.note?.url ? { label: "note", url: post.note.url } : null,
  ].filter((x): x is { label: string; url: string } => !!x);

  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "ブログ", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      {!draft && <BlogPostingJsonLd post={post} authorHasPage={authorHasPage} />}
      {!draft && <BreadcrumbJsonLd items={crumbs} />}
      <SiteNav active="blog" />
      {draft && <DraftBanner path={`/blog/${slug}`} />}

      <article>
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 md:px-12 md:pt-12">
            <nav aria-label="パンくず" className="mb-8 font-mono text-[12px] text-ink-3">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {crumbs.slice(0, -1).map((c, i) => (
                  <li key={c.path} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    <Link href={c.path} className="transition-colors hover:text-brand">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-[820px]">
              <div className="mb-4 flex flex-wrap items-center gap-x-3.5 gap-y-1">
                {category && (
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="font-mono text-[12px] font-semibold tracking-[0.08em] text-brand hover:text-brand-hover"
                  >
                    {category.name}
                  </Link>
                )}
                {post.type && (
                  <>
                    <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-ink-3" />
                    <span className="text-xs text-ink-3">{POST_TYPE_LABEL[post.type]}</span>
                  </>
                )}
              </div>
              <h1 className="text-[28px] font-semibold leading-[1.35] tracking-[-0.03em] md:text-[38px]">
                {post.title}
              </h1>
              {post.description && (
                <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{post.description}</p>
              )}
              {topicPath.length > 0 && (
                <p className="mt-5 text-[13px] text-ink-3">
                  <span className="mr-2">この記事の場所</span>
                  <span className="text-ink-2">{topicPath.join(" › ")}</span>
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              {author && (
                <div className="flex items-center gap-3.5">
                  <DSAvatar name={author.nameJa} src={photo} size={44} ring="accent" />
                  <div>
                    <div className="text-[13px] text-ink-3">書いた人</div>
                    <div className="text-sm">
                      {authorHasPage ? (
                        <Link
                          href={`/members/${author.slug}`}
                          className="font-bold transition-colors hover:text-brand"
                        >
                          {author.nameJa}
                        </Link>
                      ) : (
                        <span className="font-bold">{author.nameJa}</span>
                      )}
                      {author.title && <span className="ml-2 text-ink-2">{author.title}</span>}
                    </div>
                  </div>
                </div>
              )}
              <dl className="grid grid-cols-[auto_auto] gap-x-3 gap-y-1 text-[13px]">
                <dt className="text-ink-3">公開日</dt>
                <dd className="font-mono text-ink-2">
                  {post.publishedAt ? (
                    <time dateTime={post.publishedAt}>{formatDateJa(post.publishedAt)}</time>
                  ) : (
                    "未公開"
                  )}
                </dd>
                {post.contentUpdatedAt && (
                  <>
                    <dt className="text-ink-3">更新日</dt>
                    <dd className="font-mono text-ink-2">
                      <time dateTime={post.contentUpdatedAt}>
                        {formatDateJa(post.contentUpdatedAt)}
                      </time>
                    </dd>
                  </>
                )}
              </dl>
              <span className="text-[13px] text-ink-3">約{minutes}分で読めます</span>
            </div>
          </div>
        </header>

        {cover && (
          <div className="mx-auto max-w-[1200px] px-6 pt-10 md:px-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={isObj(post.cover) ? post.cover.alt ?? "" : ""}
              className="block aspect-video w-full max-w-[960px] border border-line object-cover"
            />
          </div>
        )}

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 pt-12 pb-16 md:px-12 lg:grid-cols-[minmax(0,760px)_240px] lg:justify-between">
          <div className="min-w-0">
            {toc.length > 1 && (
              <details className="mb-10 border border-line bg-surface p-5 lg:hidden" open>
                <summary className="cursor-pointer text-sm font-bold">この記事の目次</summary>
                <div className="mt-3">
                  <Toc toc={toc} />
                </div>
              </details>
            )}

            <ComparisonNotice post={post} />

            <LexicalContent content={post.content} ids={ids} />

            {(post.downloads ?? []).some((d) => isObj(d.file)) && (
              <div className="mt-12 border-t border-line pt-8">
                <Downloads items={post.downloads} heading="資料" />
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="bg-surface-2 px-3 py-1 font-mono text-xs text-ink-2"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            )}

            {external.length > 0 && (
              <p className="mt-8 text-sm leading-relaxed text-ink-2">
                この記事は、読み手に合わせて書き直した版を
                {external.map((e, i) => (
                  <span key={e.url}>
                    {i > 0 && "・"}
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener"
                      className="mx-0.5 text-brand hover:text-brand-hover"
                    >
                      {e.label}
                    </a>
                  </span>
                ))}
                でも公開しています。
              </p>
            )}

            {changelog.length > 0 && (
              <section className="mt-12 border-t border-line pt-8">
                <h2 className="mb-4 text-lg font-semibold tracking-tight">変更履歴</h2>
                <ul className="space-y-2.5">
                  {changelog.map((c, i) => (
                    <li key={c.id ?? i} className="grid grid-cols-[130px_1fr] gap-4 text-sm">
                      <time dateTime={c.date} className="font-mono text-ink-3">
                        {formatDateJa(c.date)}
                      </time>
                      <span className="leading-relaxed text-ink-2">{c.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {toc.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="mb-3 font-mono text-[12px] tracking-[0.1em] text-ink-3">
                  CONTENTS
                </div>
                <nav aria-label="目次" className="border-l border-line pl-4">
                  <Toc toc={toc} />
                </nav>
              </div>
            </aside>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-12">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">同じジャンルの記事</h2>
              {category && (
                <Link href={`/blog/category/${category.slug}`} className="o-arrow">
                  {category.name}の記事をすべて見る →
                </Link>
              )}
            </div>
            <PostList posts={related} showGenre={false} />
          </div>
        </section>
      )}

      <CtaBand
        title={cta.title}
        description={cta.description}
        titleSize="md"
        panel
        borderTop
        secondary={
          service
            ? { label: `${service.name}について見る →`, href: "/services" }
            : fallbackService
              ? { label: `${fallbackService.label}について見る →`, href: fallbackService.href }
              : undefined
        }
      />

      <SiteFooter />
    </>
  );
}
