import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { DSBadge } from "@/components/ds/ds-badge";
import { DSAvatar } from "@/components/ds/ds-avatar";
import { ProfilePageJsonLd } from "@/components/structured-data";
import { EmptyNote, PostList } from "@/components/blog/post-list";
import { MEMBERS, getMember } from "@/lib/members";
import { COMPANY } from "@/lib/site";
import { getPosts } from "@/lib/payload";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(decodeURIComponent(slug));
  if (!member) return { title: "メンバーが見つかりません" };

  const canonicalPath = `/members/${member.slug}`;
  const title = `${member.nameJa} | ${COMPANY.nameJa}`;
  const description = `${COMPANY.nameJa} ${member.title} ${member.nameJa}（${member.nameEn}）のプロフィール。${member.role}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://0utl1er.tech${canonicalPath}`,
    },
  };
}

export default async function MemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = getMember(decodeURIComponent(slug));
  if (!member) notFound();

  // 「書いた記事」は Payload から（ビルド時は届かないのでリクエストごとに描く。データは 60 秒キャッシュ）
  await connection();
  const posts = await getPosts({ authorSlug: member.slug, limit: 20 });

  return (
    <>
      <ProfilePageJsonLd member={member} />
      <SiteNav active="members" />

      <PageHeader
        eyebrow={
          <Link
            href="/members"
            className="transition-colors hover:text-brand"
          >
            ← メンバー一覧 — MEMBERS
          </Link>
        }
        title={
          <>
            {member.nameJa}
            <span className="ml-4 align-middle font-mono text-sm font-normal tracking-[0.06em] text-ink-3 md:text-base">
              {member.nameEn}
            </span>
          </>
        }
        lead={member.role}
      />

      {/* Profile */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-16 md:grid-cols-[320px_1fr] md:px-12">
          <div>
            <div className="mb-5 font-mono text-[13px] text-ink-3">PROFILE</div>
            <DSCard className="p-[22px]">
              <div className="flex items-center gap-4">
                <DSAvatar name={member.nameJa} size={64} ring="accent" />
                <div>
                  <div className="text-[17px] font-bold">{member.nameJa}</div>
                  <div className="mb-2 font-mono text-xs text-ink-3">
                    {member.nameEn}
                  </div>
                  <DSBadge tone="accent">{member.title}</DSBadge>
                </div>
              </div>
            </DSCard>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">
              経歴・紹介
            </h2>
            <div className="space-y-5">
              {member.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[640px] text-sm leading-loose text-ink-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {member.links.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                {member.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="o-arrow font-mono text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12">
          <div className="mb-7 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">専門領域</h2>
            <span className="font-mono text-[13px] text-ink-3">EXPERTISE</span>
          </div>
          <div className="flex max-w-[720px] flex-wrap gap-2.5">
            {member.knowsAbout.map((topic) => (
              <DSBadge key={topic} tone="neutral" dot className="px-3 py-1.5">
                {topic}
              </DSBadge>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      {posts.ok && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12">
            <div className="mb-7 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">書いた記事</h2>
              <span className="font-mono text-[13px] text-ink-3">ARTICLES</span>
            </div>
            {posts.docs.length > 0 ? (
              <PostList posts={posts.docs} />
            ) : (
              <EmptyNote>公開している記事はまだありません。</EmptyNote>
            )}
          </div>
        </section>
      )}

      {/* Company */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-16 md:grid-cols-[320px_1fr] md:px-12">
          <div>
            <div className="mb-2 font-mono text-[13px] text-ink-3">COMPANY</div>
            <h2 className="text-2xl font-semibold tracking-tight">所属</h2>
          </div>
          <DSCard className="p-6">
            <div className="mb-1.5 text-[17px] font-bold">{COMPANY.nameJa}</div>
            <p className="mb-1 text-sm leading-relaxed text-ink-2">
              {COMPANY.zip} {COMPANY.address}
            </p>
            <p className="mb-5 text-sm leading-relaxed text-ink-2">
              受託開発 / エンジニア育成・派遣 / マネージドプライベートクラウド
            </p>
            <Link href="/company" className="o-arrow">
              会社概要を見る →
            </Link>
          </DSCard>
        </div>
      </section>

      <CtaBand title="最良のサービスを、一緒に。" titleSize="md" panel />

      <SiteFooter />
    </>
  );
}
