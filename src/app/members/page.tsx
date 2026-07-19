import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { DSCard } from "@/components/ds/ds-card";
import { DSBadge } from "@/components/ds/ds-badge";
import { DSAvatar } from "@/components/ds/ds-avatar";
import { MembersListJsonLd } from "@/components/structured-data";
import { MEMBERS } from "@/lib/members";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "メンバー",
  description: `${COMPANY.nameJa}のメンバー紹介。代表をはじめ、事業を支えるメンバーのプロフィールをご覧いただけます。`,
  alternates: { canonical: "/members" },
};

export default function MembersPage() {
  return (
    <>
      <MembersListJsonLd members={MEMBERS} />
      <SiteNav active="members" />

      <PageHeader
        eyebrow="// メンバー — MEMBERS"
        title="メンバー紹介"
        lead="事業を支えるメンバーを紹介します。各プロフィールから経歴・専門領域をご覧いただけます。"
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {MEMBERS.map((member) => (
              <Link
                key={member.slug}
                href={`/members/${member.slug}`}
                className="group block"
              >
                <DSCard className="h-full p-[22px] transition-colors group-hover:border-line-strong">
                  <div className="mb-4 flex items-center gap-4">
                    <DSAvatar name={member.nameJa} size={56} ring="accent" />
                    <div>
                      <div className="text-[17px] font-bold">
                        {member.nameJa}
                      </div>
                      <div className="mb-1.5 font-mono text-xs text-ink-3">
                        {member.nameEn}
                      </div>
                      <DSBadge tone="accent">{member.title}</DSBadge>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-ink-2">
                    {member.role}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {member.knowsAbout.slice(0, 4).map((topic) => (
                      <DSBadge key={topic} tone="neutral" dot>
                        {topic}
                      </DSBadge>
                    ))}
                  </div>
                  <div className="font-mono text-xs text-ink-3 transition-colors group-hover:text-brand">
                    プロフィール →
                  </div>
                </DSCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="最良のサービスを、一緒に。" titleSize="md" panel />

      <SiteFooter />
    </>
  );
}
