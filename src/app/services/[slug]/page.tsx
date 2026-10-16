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
import { getServiceBySlug, type Service } from "@/lib/payload";
import { getServiceLine, getServiceLines, type ServiceLine } from "@/lib/services";

/* 事業の詳細ページ（/services/iaas・saas・bpaas・taas）。
 * 本文は Payload の「サービス」（URL名が同じもの）から出す。入っている段だけ表示する。
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[22px] font-semibold md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Body({ service }: { service: Service }) {
  const problems = service.problems ?? [];
  const tasks = service.tasks ?? [];
  const metrics = service.metrics ?? [];
  const reasons = service.reasons ?? [];
  const plans = service.plans ?? [];
  const steps = service.steps ?? [];
  const faqs = service.faqs ?? [];
  const hasPricing =
    plans.length > 0 || service.minimumTerm || service.cancellation || service.excluded;

  return (
    <>
      {problems.length > 0 && (
        <Section title="こんなお悩みに">
          <ul className="space-y-3 text-[15px] leading-relaxed">
            {problems.map((p, i) => (
              <li key={p.id ?? i} className="border-b border-line pb-3">
                「{p.text}」
              </li>
            ))}
          </ul>
        </Section>
      )}

      {tasks.length > 0 && (
        <Section title="やること">
          <dl className="divide-y divide-line border-y border-line">
            {tasks.map((t, i) => (
              <div key={t.id ?? i} className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[1fr_200px]">
                <dt className="text-[15px]">
                  {t.task}
                  {t.note && <span className="mt-1 block text-[13px] text-ink-3">{t.note}</span>}
                </dt>
                {t.frequency && <dd className="text-[14px] text-ink-2 md:text-right">{t.frequency}</dd>}
              </div>
            ))}
          </dl>
        </Section>
      )}

      {metrics.length > 0 && (
        <Section title="実績">
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m, i) => (
              <div key={m.id ?? i} className="bg-void p-5">
                <div className="text-[13px] text-ink-2">{m.label}</div>
                <div className="my-1 text-[32px] font-semibold">{m.value}</div>
                <div className="text-[12px] text-ink-3">{m.measurement}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {reasons.length > 0 && (
        <Section title="選ばれる理由">
          <ol className="space-y-6">
            {reasons.map((r, i) => (
              <li key={r.id ?? i}>
                <h3 className="mb-1.5 text-[17px] font-semibold">{r.title}</h3>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-2">{r.evidence}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {hasPricing && (
        <Section title="料金">
          {plans.length > 0 && (
            <div className="mb-6 grid grid-cols-1 gap-px bg-line md:grid-cols-2">
              {plans.map((p, i) => (
                <div key={p.id ?? i} className="bg-void p-5">
                  <div className="mb-2 text-[17px] font-semibold">{p.name}</div>
                  {p.monthly && <div className="text-[15px]">月額 {p.monthly}</div>}
                  {p.initial && <div className="text-[14px] text-ink-2">初期費用 {p.initial}</div>}
                  {p.includes && (
                    <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink-2">{p.includes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-[14px] md:grid-cols-[auto_1fr]">
            {service.minimumTerm && (
              <>
                <dt className="text-ink-2">最低契約期間</dt>
                <dd>{service.minimumTerm}</dd>
              </>
            )}
            {service.cancellation && (
              <>
                <dt className="text-ink-2">解約</dt>
                <dd>{service.cancellation}</dd>
              </>
            )}
            {service.excluded && (
              <>
                <dt className="text-ink-2">含まれない作業</dt>
                <dd className="whitespace-pre-line">{service.excluded}</dd>
              </>
            )}
          </dl>
          {service.priceNote && <p className="mt-4 text-[12px] text-ink-3">{service.priceNote}</p>}
        </Section>
      )}

      {steps.length > 0 && (
        <Section title="進め方">
          <ol className="divide-y divide-line border-y border-line">
            {steps.map((s, i) => (
              <li key={s.id ?? i} className="grid grid-cols-[40px_1fr] gap-x-4 py-4">
                <span className="font-mono text-[13px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-[15px] font-medium">
                    {s.name}
                    {s.duration && <span className="ml-3 text-[13px] font-normal text-ink-3">{s.duration}</span>}
                  </div>
                  {s.detail && (
                    <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-ink-2">{s.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section title="よくある質問">
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <details key={f.id ?? i} className="group py-4">
                <summary className="cursor-pointer list-none text-[15px] font-medium">
                  <span className="mr-2 text-ink-3 group-open:hidden">＋</span>
                  <span className="mr-2 hidden text-ink-3 group-open:inline">－</span>
                  {f.q}
                </summary>
                <p className="mt-3 whitespace-pre-line pl-6 text-[14px] leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

async function OtherLines({ current }: { current: ServiceLine }) {
  const others = (await getServiceLines()).filter((s) => s.slug !== current.slug);
  if (others.length === 0) return null;
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[15px] font-medium text-ink-2">ほかの事業</h2>
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

          {service && <Body service={service} />}
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
