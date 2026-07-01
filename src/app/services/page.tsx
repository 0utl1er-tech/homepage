import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { ImageSlot } from "@/components/ds/image-slot";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "マネージドプライベートクラウド / 依存しないクリーンなソフトウェア / 精鋭エンジニア × 最新AI。0UTL1ER を構成する3つの要素と、ご提供の形態。",
  alternates: { canonical: "/services" },
};

const STACK = [
  { name: "Kubernetes", icon: "kubernetes", color: "326CE5" },
  { name: "Argo CD", icon: "argo", color: "EF7B4D" },
  { name: "Cilium", icon: "cilium", color: "F8C517" },
  { name: "Keycloak", icon: "keycloak", color: "4D9FE0" },
  { name: "Grafana", icon: "grafana", color: "F46800" },
  { name: "CloudNativePG", icon: "postgresql", color: "4169E1" },
];

const FORMATS = [
  {
    tag: "A.",
    title: "受託開発",
    desc: "要件定義から設計・実装・運用まで。プロダクト開発を一気通貫でお引き受けします。",
  },
  {
    tag: "B.",
    title: "エンジニア育成・派遣",
    desc: "育成した精鋭エンジニアを、御社のチームへ。技術力をそのまま現場に届けます。",
  },
  {
    tag: "C.",
    title: "プライベートクラウド",
    desc: "自社基盤を活かした、安価で高性能な計算資源の提供。運用保守まで完結します。",
  },
];

function ElementNumber({ children }: { children: string }) {
  return (
    <div
      className="mb-4 font-mono text-[96px] font-bold leading-[0.9] tracking-[-0.04em]"
      style={{ color: "transparent", WebkitTextStroke: "1.5px var(--accent)" }}
    >
      {children}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <SiteNav active="services" />

      <PageHeader
        eyebrow="// 事業内容 — WHAT WE DO"
        title={
          <>
            技術で課題を解く、
            <br />
            実装パートナー。
          </>
        }
        lead="先端IT企業が磨いてきた高度な技術を、安価に・高度に提供します。私たちを構成するのは、次の3つの要素です。"
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 pt-2 md:px-12">
          {/* 01 — Cloud */}
          <div className="grid grid-cols-1 items-start gap-10 border-b border-line py-14 md:grid-cols-[0.7fr_1.6fr]">
            <div>
              <ElementNumber>01</ElementNumber>
              <span className="font-mono text-[13px] text-ink-3">CLOUD</span>
            </div>
            <div>
              <h2 className="mb-3.5 text-2xl font-extrabold tracking-tight md:text-[26px]">
                マネージドプライベートクラウド
              </h2>
              <p className="mb-6 max-w-[620px] text-[15px] leading-loose text-ink-2">
                保守から運用まで完全自社完結。豊富な計算資源を安価にご提供します。クラウドの構築・運用・監視をワンストップで担い、御社は本来の事業に集中できます。
              </p>
              <ImageSlot
                src="/images/datacenter.jpg"
                alt="0UTL1ER のデータセンター / インフラ"
                className="h-60 w-full"
                placeholder="インフラ / データセンターのイメージ"
              />
            </div>
          </div>

          {/* 02 — OSS */}
          <div className="grid grid-cols-1 items-start gap-10 border-b border-line py-14 md:grid-cols-[0.7fr_1.6fr]">
            <div>
              <ElementNumber>02</ElementNumber>
              <span className="font-mono text-[13px] text-ink-3">OSS</span>
            </div>
            <div>
              <h2 className="mb-3.5 text-2xl font-extrabold tracking-tight md:text-[26px]">
                依存しないクリーンなソフトウェア
              </h2>
              <p className="mb-[22px] max-w-[620px] text-[15px] leading-loose text-ink-2">
                CNCFベースの透明なOSS基盤を採用。特定ベンダーに縛られない設計で、長期にわたり保守可能な資産を残します。ブラックボックスのない、検証できるソフトウェアを。
              </p>
              <div className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-3">
                CORE STACK
              </div>
              <div className="mb-6 flex flex-wrap gap-2.5">
                {STACK.map((s) => (
                  <div
                    key={s.name}
                    className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-[11px] pr-3.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://cdn.simpleicons.org/${s.icon}/${s.color}`}
                      alt={s.name}
                      width={20}
                      height={20}
                      className="block flex-none"
                    />
                    <span className="whitespace-nowrap font-mono text-xs text-ink-2">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
              <ImageSlot
                src="/images/code.jpg"
                alt="アーキテクチャとコード — 依存しないクリーンなソフトウェア"
                className="h-60 w-full"
                placeholder="アーキテクチャ図 / コードのイメージ"
              />
            </div>
          </div>

          {/* 03 — Team × AI */}
          <div className="grid grid-cols-1 items-start gap-10 py-14 md:grid-cols-[0.7fr_1.6fr]">
            <div>
              <ElementNumber>03</ElementNumber>
              <span className="font-mono text-[13px] text-ink-3">TEAM × AI</span>
            </div>
            <div>
              <h2 className="mb-3.5 text-2xl font-extrabold tracking-tight md:text-[26px]">
                精鋭エンジニア × 最新AI
              </h2>
              <p className="mb-6 max-w-[620px] text-[15px] leading-loose text-ink-2">
                代表が選ぶ現場の精鋭に、Claude Opus 等の最新AIを組み合わせます。少数精鋭だからこそ、品質とスピードを両立。AIを単なる道具ではなく開発工程の一部として組み込みます。
              </p>
              <ImageSlot
                src="/images/team.jpg"
                alt="精鋭エンジニアによる開発風景"
                className="h-60 w-full"
                placeholder="チーム / 開発風景のイメージ"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-[26px]">
              ご提供の形態
            </h2>
            <span className="font-mono text-[13px] text-ink-3">HOW WE WORK</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {FORMATS.map((f) => (
              <DSCard key={f.tag} className="p-6">
                <div className="mb-3 font-mono text-xs text-brand">{f.tag}</div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{f.desc}</p>
              </DSCard>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="課題のご相談から、お気軽に。"
        description="どの形態が最適かわからない段階でも構いません。まずは現状をお聞かせください。"
        titleSize="md"
        secondary={{ label: "自社サービスを見る →", href: "/products" }}
      />

      <SiteFooter />
    </>
  );
}
