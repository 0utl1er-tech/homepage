import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { GenreTabs } from "@/components/blog/genre-tabs";
import { EmptyNote, PostList } from "@/components/blog/post-list";
import { ENTRANCES, mergeGenres } from "@/lib/blog";
import { getCategories, getPosts } from "@/lib/payload";
import { COMPANY } from "@/lib/site";

const TITLE = "ブログ";
const DESCRIPTION =
  "お店の集客（Googleマップ・口コミ・ホームページ）と、システム開発・サーバー運用について、0UTL1ER のメンバーが仕事で確かめたことを書いています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${TITLE} | ${COMPANY.nameJa}`,
    description: DESCRIPTION,
    type: "website",
    url: "https://0utl1er.tech/blog",
    siteName: COMPANY.nameJa,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${COMPANY.nameJa}`,
    description: DESCRIPTION,
  },
};

export default async function BlogPage() {
  // ビルド時には Payload に届かないので、リクエストごとに描く（データは 60 秒キャッシュ）
  await connection();
  const [cats, posts] = await Promise.all([getCategories(), getPosts({ limit: 30 })]);
  const genres = mergeGenres(cats.docs);

  return (
    <>
      <SiteNav active="blog" />

      <PageHeader
        eyebrow="// ブログ — BLOG"
        title="ブログ"
        lead="仕事の中で実際にあったこと、調べて確かめたことを書いています。読みたい話の入口を選んでください。"
      />

      {/* 入口2つ */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 py-14 md:grid-cols-2 md:px-12">
          {ENTRANCES.map((ent) => {
            const list = genres.filter((g) => g.audience === ent.audience);
            const first = list[0];
            return (
              <DSCard key={ent.audience} className="group/card flex flex-col">
                {/* 写真で入口を示す（Stripe 型）。写真は対象の客がひと目で分かるもの */}
                <Link
                  href={first ? `/blog/category/${first.slug}` : "/blog"}
                  className="relative block aspect-[16/9] overflow-hidden bg-surface-2"
                  tabIndex={-1}
                  aria-hidden
                >
                  <Image
                    src={ent.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
                    priority
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <div className="mb-2 text-[13px] font-medium text-ink-3">{ent.eyebrow}</div>
                  <h2 className="mb-3 text-2xl font-extrabold tracking-tight">
                    {first ? (
                      <Link href={`/blog/category/${first.slug}`} className="transition-colors hover:text-brand">
                        {ent.label}
                      </Link>
                    ) : (
                      ent.label
                    )}
                  </h2>
                  <p className="mb-5 max-w-[440px] text-sm leading-relaxed text-ink-2">{ent.lead}</p>
                  {list.length > 0 && (
                    <ul className="mb-6 flex flex-wrap gap-2">
                      {list.map((g) => (
                        <li key={g.slug}>
                          <Link
                            href={`/blog/category/${g.slug}`}
                            className="inline-flex min-h-9 items-center rounded-full border border-line-strong bg-surface-2 px-3.5 text-[13px] text-ink transition-colors hover:border-brand hover:text-brand"
                          >
                            {g.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {first && (
                    <Link href={`/blog/category/${first.slug}`} className="o-arrow mt-auto">
                      記事を読む →
                    </Link>
                  )}
                </div>
              </DSCard>
            );
          })}
        </div>
      </section>

      {/* ジャンルのタブ → 新着 */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-20 md:px-12">
          <GenreTabs genres={genres} />

          <div className="mt-10 mb-2 flex items-baseline justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight">新着の記事</h2>
            <span className="font-mono text-[13px] text-ink-3">LATEST</span>
          </div>

          <div className="mt-6">
            {posts.docs.length > 0 ? (
              <PostList posts={posts.docs} />
            ) : posts.ok ? (
              <EmptyNote>
                公開している記事はまだありません。
                <br />
                最初の記事を準備しています。
              </EmptyNote>
            ) : (
              <EmptyNote>
                記事の一覧を読み込めませんでした。
                <br />
                少し時間をおいて、もう一度ページを開いてください。
              </EmptyNote>
            )}
          </div>
        </div>
      </section>

      <CtaBand title="記事の内容について相談したいときは" titleSize="md" panel borderTop />

      <SiteFooter />
    </>
  );
}
