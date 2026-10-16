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
        <ServiceStack lead="一番上が、事業の形。その下に、それを支える手段が階段のように積み重なっています。写真を押すと、それぞれの事業のページに移ります。" />
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
