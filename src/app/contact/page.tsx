import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { DSCard } from "@/components/ds/ds-card";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "受託開発・エンジニア派遣・クラウド構築のご相談。0UTL1ER株式会社へのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav active="contact" />

      <PageHeader
        eyebrow="// お問い合わせ — CONTACT"
        title={
          <>
            課題のご相談から、
            <br />
            お気軽にどうぞ。
          </>
        }
        lead="受託開発・エンジニア派遣・クラウド構築のいずれも、まずは現状をお聞かせください。担当より折り返しご連絡します。"
      />

      <section>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-16 md:grid-cols-[1.5fr_1fr] md:px-12">
          <ContactForm />

          <div className="flex flex-col gap-4">
            <DSCard className="p-6">
              <div className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-3">
                EMAIL
              </div>
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-mono text-base text-brand transition-colors hover:text-brand-hover"
              >
                {COMPANY.email}
              </a>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-2">
                フォームのほか、メールでも直接ご連絡いただけます。
              </p>
            </DSCard>
            <DSCard className="p-6">
              <div className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-3">
                OFFICE
              </div>
              <p className="text-sm leading-loose text-ink">
                {COMPANY.zip}
                <br />
                {COMPANY.address}
              </p>
            </DSCard>
            <DSCard className="p-6">
              <div className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-3">
                HOURS
              </div>
              <p className="font-mono text-sm text-ink">{COMPANY.hours}</p>
            </DSCard>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
