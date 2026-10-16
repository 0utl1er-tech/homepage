import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { DraftBanner } from "@/components/blog/draft-banner";
import { BreadcrumbJsonLd } from "@/components/blog/json-ld";
import { BusinessGrid } from "@/components/services/business-grid";
import { LpSections, hasLpSections } from "@/components/services/lp-sections";
import { getBusinesses, getServiceBySlug } from "@/lib/payload";
import { getServiceLine, getServiceLines, type ServiceLine } from "@/lib/services";

/* 提供の形のページ（/services/iaas・saas・bpaas・taas）。
 * 冒頭は Payload の「サービス」（URL名が同じもの）から出し、続けてこの形で提供している「事業」を並べる。
 * サービス側に LP の段が残っていればそのあとに出す。
 * Payload に無い・届かないときは lib/services.ts の一言だけ出す。 */

type Params = Promise<{ slug: string }>;

async function load(params: Params) {
  await connection();
  const { slug } = await params;
  const line = await getServiceLine(slug);
  if (!line) return { line: null, service: null, draft: false };
  const { isEnabled: draft } = await draftMode();
  const service = await getServiceBySlug(slug, draft);
  return { line, service, draft };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { line, service, draft } = await load(params);
  if (!line) return { title: "ページが見つかりません", robots: { index: false } };
  const path = `/services/${line.slug}`;
  const description = service?.summary || line.summary;
  return {
    title: `${line.means}（${line.kind}）`,
    description,
    alternates: { canonical: path },
    robots: draft ? { index: false, follow: false, nocache: true } : undefined,
    openGraph: {
      title: `${line.means}（${line.kind}）`,
      description,
      type: "website",
      url: `https://0utl1er.tech${path}`,
      images: [{ url: line.image, alt: line.imageAlt }],
    },
  };
}

async function Businesses({ frameSlug }: { frameSlug: string }) {
  const { docs } = await getBusinesses({ frameSlug });
  const items = docs.filter((b) => b.showOnFrame !== false);
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[22px] font-semibold md:text-2xl">この形で提供している事業</h2>
      <BusinessGrid frameSlug={frameSlug} items={items} />
    </section>
  );
}

async function OtherLines({ current }: { current: ServiceLine }) {
  const others = (await getServiceLines()).filter((s) => s.slug !== current.slug);
  if (others.length === 0) return null;
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[15px] font-medium text-ink-2">ほかの提供の形</h2>
      <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-3">
        {others.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="svc-blk min-h-[150px]"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%), url("${s.image}")` }}
          >
            <span className="text-[12px] tracking-[.08em] text-white/60">{s.kind}</span>
            <span className="svc-ttl !text-[20px]">{s.means}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { line, service, draft } = await load(params);
  if (!line) notFound();

  const summary = service?.summary || line.summary;
  const preparing = !service || service.state === "preparing";
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "事業内容", path: "/services" },
    { name: line.means, path: `/services/${line.slug}` },
  ];

  return (
    <>
      {!draft && <BreadcrumbJsonLd items={crumbs} />}
      <SiteNav active="services" />
      {draft && <DraftBanner path={`/services/${line.slug}`} />}

      <article>
        <header
          className="relative flex min-h-[420px] items-end bg-cover bg-center text-white md:min-h-[480px]"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.62) 100%), url("${line.image}")` }}
          role="img"
          aria-label={line.imageAlt}
        >
          <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 md:px-12">
            <nav aria-label="パンくず" className="mb-6 text-[12px] text-white/60">
              <Link href="/services" className="hover:text-white">事業内容</Link>
              <span className="mx-2">/</span>
              <span>{line.kind}</span>
            </nav>
            <div className="mb-2 text-[13px] tracking-[.08em] text-white/60">{line.kind}</div>
            <h1 className="text-[36px] font-medium leading-tight text-white/90 md:text-[52px]">{line.means}</h1>
            <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/75">{line.description}</p>
          </div>
        </header>

        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <div className="py-12">
            {service?.target && <div className="mb-3 text-[13px] text-ink-3">{service.target}</div>}
            <p className="whitespace-pre-line text-[18px] leading-[1.9] md:text-[19px]">{summary}</p>
            {service?.headlineMetric && (
              <p className="mt-6 text-[15px] text-ink-2">{service.headlineMetric}</p>
            )}
            {preparing && (
              <p className="mt-8 border-t border-line pt-6 text-[14px] text-ink-3">
                くわしい内容は準備中です。先にご相談いただくこともできます。
              </p>
            )}
          </div>

          <Businesses frameSlug={line.slug} />
          {hasLpSections(service) && <LpSections data={service} />}
          <OtherLines current={line} />
        </div>
      </article>

      <CtaBand
        title={`${line.means}について相談する`}
        description="どこから任せられるか、現状をうかがってからご提案します。"
        titleSize="md"
        borderTop
      />
      <SiteFooter />
    </>
  );
}
