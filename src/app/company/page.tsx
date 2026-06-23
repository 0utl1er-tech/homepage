import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { DSAvatar } from "@/components/ds/ds-avatar";
import { ImageSlot } from "@/components/ds/image-slot";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "0UTL1ER株式会社の会社概要。代表取締役 黒羽 晟。受託開発 / エンジニア育成・派遣 / マネージドプライベートクラウド。埼玉県久喜市。",
};

const INFO: { label: string; value: string; accent?: boolean }[] = [
  { label: "company", value: COMPANY.nameJa },
  { label: "address", value: `${COMPANY.zip} ${COMPANY.address}` },
  { label: "representative", value: `${COMPANY.representative} — ${COMPANY.representativeTitle}` },
  {
    label: "business",
    value: "受託開発 / エンジニア育成・派遣 / マネージドプライベートクラウド",
  },
  { label: "contact", value: COMPANY.email, accent: true },
];

const PHILOSOPHY = [
  {
    title: "安価に、高度に。",
    desc: "先端の技術を、誰もが手の届くサービスへ。価格と品質のトレードオフを壊します。",
  },
  {
    title: "透明であること。",
    desc: "OSSベースのクリーンな基盤と、可視化されたデータ。ブラックボックスを作りません。",
  },
  {
    title: "少数精鋭。",
    desc: "代表が選ぶ現場の精鋭に、最新AIを掛け合わせる。規模ではなく密度で勝負します。",
  },
];

export default function CompanyPage() {
  return (
    <>
      <SiteNav active="company" />

      <PageHeader eyebrow="// 会社概要 — COMPANY" title="0UTL1ER株式会社" />

      {/* Representative + info table */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-16 md:grid-cols-[320px_1fr] md:px-12">
          <div>
            <div className="mb-5 font-mono text-[13px] text-ink-3">
              REPRESENTATIVE
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-[22px]">
              <DSAvatar name={COMPANY.representative} size={56} ring="accent" />
              <div>
                <div className="text-[17px] font-bold">
                  {COMPANY.representative}
                </div>
                <div className="text-sm text-ink-3">
                  {COMPANY.representativeTitle}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-line font-mono text-sm">
            {INFO.map((row, i) => (
              <div
                key={row.label}
                className={
                  "grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] " +
                  (i < INFO.length - 1 ? "border-b border-line" : "")
                }
              >
                <div className="bg-surface px-4 py-[18px] text-ink-3 md:px-6">
                  {row.label}
                </div>
                <div
                  className={
                    "px-4 py-[18px] md:px-6 " + (row.accent ? "text-brand" : "")
                  }
                >
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-12">
          <div className="mb-7 flex items-baseline justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-[26px]">
              私たちの姿勢
            </h2>
            <span className="font-mono text-[13px] text-ink-3">PHILOSOPHY</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PHILOSOPHY.map((p) => (
              <DSCard key={p.title} className="p-6">
                <h3 className="mb-2.5 text-[17px] font-bold">{p.title}</h3>
                <p className="text-sm leading-loose text-ink-2">{p.desc}</p>
              </DSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-16 md:grid-cols-[320px_1fr] md:px-12">
          <div>
            <div className="mb-2 font-mono text-[13px] text-ink-3">ACCESS</div>
            <h2 className="mb-3.5 text-2xl font-extrabold tracking-tight">
              アクセス
            </h2>
            <p className="text-sm leading-loose text-ink-2">
              {COMPANY.zip}
              <br />
              {COMPANY.address}
            </p>
          </div>
          <ImageSlot
            src="/images/office.jpg"
            alt="0UTL1ER のオフィス"
            className="h-[300px] w-full"
            placeholder="地図 / オフィス外観"
          />
        </div>
      </section>

      <CtaBand title="最良のサービスを、一緒に。" panel />

      <SiteFooter />
    </>
  );
}
