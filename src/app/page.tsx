import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ScatterPlot } from "@/components/scatter-plot";
import { BinaryDecor } from "@/components/ds/decor";
import { DSAvatar } from "@/components/ds/ds-avatar";
import { CtaBand } from "@/components/cta-band";
import { COMPANY } from "@/lib/site";

const ELEMENTS = [
  {
    n: "01",
    key: "CLOUD",
    title: "マネージドプライベートクラウド",
    desc: "保守から運用まで完全自社完結。豊富な計算資源を安価にご提供します。",
  },
  {
    n: "02",
    key: "OSS",
    title: "依存しないクリーンなソフトウェア",
    desc: "CNCFベースの透明なOSS基盤。特定ベンダーに縛られない設計です。",
  },
  {
    n: "03",
    key: "TEAM × AI",
    title: "精鋭エンジニア × 最新AI",
    desc: "代表が選ぶ現場の精鋭に、Claude Opus 等の最新AIを組み合わせます。",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteNav active="home" />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line">
        <BinaryDecor />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-24">
          <div>
            <div className="mb-6 font-mono text-[13px] tracking-[0.1em] text-brand">
              {"// BEYOND THE CORRELATION"}
            </div>
            <h1 className="mb-6 whitespace-nowrap text-5xl font-black leading-[1.08] tracking-[-0.04em] md:text-6xl">
              <span className="text-brand">相関</span>の
              <span className="text-cost">外側</span>へ
            </h1>
            <p className="mb-9 max-w-[460px] text-base leading-loose text-ink-2">
              一般的に、品質と価格はトレードオフにあると言われています。我々はそういった標準の外側に位置するため、最先端の技術や工夫を重ねています。
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button render={<Link href="/contact" />} size="lg">
                ご相談はこちら
              </Button>
              <Button render={<Link href="/products" />} variant="ghost" size="lg">
                サービス →
              </Button>
            </div>
          </div>
          <ScatterPlot />
        </div>
      </header>

      {/* 3 elements */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
          <div className="mb-2 flex items-baseline justify-between border-b border-line pb-6">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-[26px]">
              私たちを構成する3つの要素
            </h2>
            <span className="font-mono text-[13px] text-ink-3">WHAT WE ARE</span>
          </div>

          {ELEMENTS.map((el) => (
            <div
              key={el.n}
              className="grid grid-cols-[auto_1fr] items-center gap-x-9 gap-y-2 border-b border-line py-9 md:grid-cols-[0.8fr_2fr_auto]"
            >
              <div
                className="font-mono text-[80px] font-bold leading-[0.9] tracking-[-0.04em]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--accent)",
                }}
              >
                {el.n}
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="mb-2 text-xl font-bold">{el.title}</h3>
                <p className="max-w-[520px] text-[15px] leading-relaxed text-ink-2">
                  {el.desc}
                </p>
              </div>
              <span className="hidden font-mono text-[13px] text-ink-3 md:inline">
                {el.key}
              </span>
            </div>
          ))}

          <div className="mt-7">
            <Link href="/services" className="o-arrow">
              事業内容の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Company teaser */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-20 md:grid-cols-[300px_1fr] md:px-12">
          <div>
            <div className="mb-3.5 font-mono text-[13px] tracking-[0.1em] text-brand">
              {"// COMPANY"}
            </div>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight">
              会社概要
            </h2>
            <Link href="/company" className="o-arrow">
              会社情報を見る →
            </Link>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-[22px]">
            <DSAvatar name={COMPANY.representative} size={52} ring="accent" />
            <div>
              <div className="text-base font-bold">{COMPANY.representative}</div>
              <div className="text-sm text-ink-3">
                {COMPANY.representativeTitle}
              </div>
              <div className="mt-2 font-mono text-xs text-ink-2">
                0UTL1ER株式会社 — 埼玉 / 久喜市
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="最良のサービスを、一緒に。" panel />

      <SiteFooter />
    </>
  );
}
