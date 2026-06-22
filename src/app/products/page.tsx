import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { ProductCard } from "@/components/product-card";
import { getList } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "サービス & お知らせ",
  description:
    "0UTL1ER が提供するサービスの紹介と、技術・組織に関する最新のお知らせ。",
};

export default async function ProductsPage() {
  const { items, usingSample } = await getList();

  return (
    <>
      <SiteNav active="product" />

      <PageHeader
        eyebrow="// サービス & お知らせ — UPDATES"
        title={
          <>
            サービスと、
            <br />
            最新のお知らせ。
          </>
        }
        lead="提供するサービスの紹介と、技術・組織に関する最新情報をお届けします。"
      />

      {usingSample && (
        <div className="border-b border-line bg-panel">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2.5 px-6 py-3 md:px-12">
            <span className="h-[7px] w-[7px] flex-none rounded-full bg-brand" />
            <span className="font-mono text-xs text-ink-2">
              Strapi 未接続 — サンプルを表示中。
              <span className="text-ink-3">
                {" "}
                NEXT_PUBLIC_STRAPI_URL を設定すると実データに切り替わります。
              </span>
            </span>
          </div>
        </div>
      )}

      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="導入・協業のご相談はこちら。" titleSize="md" panel borderTop />

      <SiteFooter />
    </>
  );
}
