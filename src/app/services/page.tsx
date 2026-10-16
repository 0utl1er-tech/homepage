import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { ServiceStack } from "@/components/services/service-stack";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "マネージドクラウド・ソフトウェア・コンサルティング・スペシャリスト。0UTL1ER の4つの事業と、それぞれがお客様に届ける価値。",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <SiteNav active="services" />

      <section className="border-b border-line">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-x-14 gap-y-6 px-6 pt-14 pb-20 md:px-8">
          <div className="max-w-[360px] flex-[1_1_280px]">
            <h1 className="mb-5 text-[40px] font-semibold leading-tight md:text-[48px]">事業内容</h1>
            <p className="text-[15px] leading-[1.9] text-ink-2">
              一番上が、お客様に届く価値。その下に、価値を支える手段が階段のように積み重なっています。写真を押すと、それぞれの事業のページに移ります。
            </p>
          </div>
          <div className="min-w-0 flex-[999_1_720px]">
            <ServiceStack />
          </div>
        </div>
      </section>

      <CtaBand
        title="課題のご相談から、お気軽に。"
        description="どの事業が合うかわからない段階でも構いません。まずは現状をお聞かせください。"
        titleSize="md"
      />

      <SiteFooter />
    </>
  );
}
