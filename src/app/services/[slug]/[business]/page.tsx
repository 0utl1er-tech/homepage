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
import { LpSections } from "@/components/services/lp-sections";
import {
  businessFrameSlug,
  getBusinessBySlug,
  getBusinesses,
  isObj,
  mediaUrl,
  type Business,
} from "@/lib/payload";
import { getServiceLine, type ServiceLine } from "@/lib/services";

/* 事業のページ（/services/{提供の形}/{事業}。例 /services/saas/phox）。
 * 本文は Payload の「事業」から出す。URL の提供の形と事業の frame が食い違うときは 404。
 * 写真は事業のもの、無ければ提供の形のものを使う。 */

type Params = Promise<{ slug: string; business: string }>;

type Loaded =
  | { line: ServiceLine; business: Business; draft: boolean }
  | { line: null; business: null; draft: false };

const NOT_FOUND: Loaded = { line: null, business: null, draft: false };

async function load(params: Params): Promise<Loaded> {
  await connection();
  const { slug, business: bslug } = await params;
  const line = await getServiceLine(slug);
  if (!line) return NOT_FOUND;
  const { isEnabled: draft } = await draftMode();
  const business = await getBusinessBySlug(bslug, draft);
  if (!business) return NOT_FOUND;
  // frame が id のまま（depth 不足・非公開）のときも、URL と一致しているとは言えないので 404
  if (businessFrameSlug(business) !== line.slug) return NOT_FOUND;
  return { line, business, draft };
}

function heroImage(business: Business, line: ServiceLine): { url: string; alt: string } {
  const url = mediaUrl(business.image);
  if (url) {
    const alt = isObj(business.image) ? business.image.alt || business.name : business.name;
    return { url, alt };
  }
  return { url: line.image, alt: line.imageAlt };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { line, business, draft } = await load(params);
  if (!line) return { title: "ページが見つかりません", robots: { index: false } };
  const path = `/services/${line.slug}/${business.slug}`;
  const title = `${business.name} — ${line.means}`;
  const description = business.tagline || business.summary;
  const img = heroImage(business, line);
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: draft ? { index: false, follow: false, nocache: true } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://0utl1er.tech${path}`,
      images: [{ url: img.url, alt: img.alt }],
    },
  };
}

function Products({ items }: { items: NonNullable<Business["products"]> }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[22px] font-semibold md:text-2xl">製品・サービス</h2>
      <table className="w-full border-y border-line text-[15px]">
        <tbody className="divide-y divide-line">
          {items.map((p, i) => (
            <tr key={p.id ?? i}>
              <th scope="row" className="py-3 pr-4 text-left align-top font-medium">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="o-arrow">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </th>
              <td className="py-3 align-top text-[14px] leading-relaxed text-ink-2">{p.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

async function Siblings({ line, current, draft }: { line: ServiceLine; current: Business; draft: boolean }) {
  const { docs } = await getBusinesses({ frameSlug: line.slug, draft });
  const others = docs.filter((b) => b.id !== current.id);
  if (others.length === 0) return null;
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[15px] font-medium text-ink-2">同じ形のほかの事業</h2>
      <BusinessGrid frameSlug={line.slug} items={others} />
    </section>
  );
}

export default async function BusinessPage({ params }: { params: Params }) {
  const { line, business, draft } = await load(params);
  if (!line) notFound();

  const path = `/services/${line.slug}/${business.slug}`;
  const img = heroImage(business, line);
  const products = business.products ?? [];
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "事業内容", path: "/services" },
    { name: line.means, path: `/services/${line.slug}` },
    { name: business.name, path },
  ];

  return (
    <>
      {!draft && <BreadcrumbJsonLd items={crumbs} />}
      <SiteNav active="services" />
      {draft && <DraftBanner path={path} />}

      <article>
        <header
          className="relative flex min-h-[420px] items-end bg-cover bg-center text-white md:min-h-[480px]"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.62) 100%), url("${img.url}")` }}
          role="img"
          aria-label={img.alt}
        >
          <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 md:px-12">
            <nav aria-label="パンくず" className="mb-6 text-[12px] text-white/60">
              <Link href="/services" className="hover:text-white">事業内容</Link>
              <span className="mx-2">/</span>
              <Link href={`/services/${line.slug}`} className="hover:text-white">
                {line.kind} {line.means}
              </Link>
              <span className="mx-2">/</span>
              <span>{business.name}</span>
            </nav>
            <h1 className="text-[36px] font-medium leading-tight text-white/90 md:text-[52px]">{business.name}</h1>
            {business.tagline && (
              <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/75">{business.tagline}</p>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <div className="py-12">
            {business.target && <div className="mb-3 text-[13px] text-ink-3">{business.target}</div>}
            <p className="whitespace-pre-line text-[18px] leading-[1.9] md:text-[19px]">{business.summary}</p>
            {business.headlineMetric && (
              <p className="mt-6 text-[15px] text-ink-2">{business.headlineMetric}</p>
            )}
            {business.state === "preparing" && (
              <p className="mt-8 border-t border-line pt-6 text-[14px] text-ink-3">
                この事業は準備中です。先にご相談いただくこともできます。
              </p>
            )}
          </div>

          <Products items={products} />
          <LpSections data={business} />
          <Siblings line={line} current={business} draft={draft} />
        </div>
      </article>

      <CtaBand
        title={business.ctaLabel || `${business.name}について相談する`}
        description="どこから任せられるか、現状をうかがってからご提案します。"
        titleSize="md"
        borderTop
      />
      <SiteFooter />
    </>
  );
}
