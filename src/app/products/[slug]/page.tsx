import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/cta-band";
import { getDetail } from "@/lib/strapi";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getDetail(decodeURIComponent(slug));
  if (!item) return { title: "記事が見つかりません" };
  const canonicalPath = `/products/${slug}`;
  return {
    title: item.title,
    description: item.excerpt || undefined,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: item.title,
      description: item.excerpt || undefined,
      type: "article",
      url: `https://0utl1er.tech${canonicalPath}`,
      ...(item.hasCover && item.cover ? { images: [item.cover] } : {}),
    },
  };
}

function NotFoundView() {
  return (
    <div className="mx-auto max-w-[820px] px-6 py-28 text-center md:px-12">
      <div
        className="mb-5 font-mono text-[64px] font-bold tracking-[-0.04em]"
        style={{ color: "transparent", WebkitTextStroke: "1.5px var(--accent)" }}
      >
        404
      </div>
      <h1 className="mb-3.5 text-[26px] font-extrabold">
        記事が見つかりませんでした
      </h1>
      <p className="mb-7 text-[15px] text-ink-2">
        URLが正しいか、記事が公開されているかをご確認ください。
      </p>
      <Link href="/products" className="o-arrow justify-center">
        ← 一覧へ戻る
      </Link>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const item = await getDetail(decodeURIComponent(slug));

  return (
    <>
      <SiteNav active="product" />

      {!item ? (
        <NotFoundView />
      ) : (
        <article>
          <header className="border-b border-line">
            <div className="mx-auto max-w-[820px] px-6 pt-12 pb-10 md:px-12">
              <Link href="/products" className="o-arrow mb-7">
                ← サービス一覧
              </Link>
              <div className="my-[18px] mt-[22px] flex items-center gap-3.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  {item.category}
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-ink-3" />
                <span className="font-mono text-xs text-ink-3">
                  {item.dateLabel}
                </span>
              </div>
              <h1 className="text-3xl font-black leading-snug tracking-[-0.03em] md:text-[38px]">
                {item.title}
              </h1>
            </div>
          </header>

          {item.hasCover && item.cover && (
            <div className="mx-auto max-w-[980px] px-6 pt-9 md:px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.cover}
                alt=""
                className="block aspect-video w-full rounded-[14px] border border-line object-cover"
              />
            </div>
          )}

          <div className="mx-auto max-w-[820px] px-6 pt-12 pb-2 md:px-12">
            <div
              className="o-prose"
              dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
            />
          </div>

          <div className="mx-auto max-w-[820px] px-6 pt-6 md:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
              <Link href="/products" className="o-arrow">
                ← 他の記事を見る
              </Link>
              <Button render={<Link href="/contact" />} variant="secondary">
                この件について相談する
              </Button>
            </div>
          </div>
        </article>
      )}

      <div className="mt-[72px]">
        <CtaBand title="最良のサービスを、一緒に。" titleSize="md" panel borderTop />
      </div>

      <SiteFooter />
    </>
  );
}
