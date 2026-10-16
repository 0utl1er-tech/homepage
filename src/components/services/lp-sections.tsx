/* 事業・提供の形の LP 本文（こんなお悩みに／やること／実績／選ばれる理由／料金／進め方／よくある質問／資料）。
 * /services/{frame} と /services/{frame}/{business} の両方で使う。入っている段だけ表示する。
 * 1段も無ければ何も出さない（hasLpSections で先に判定もできる）。 */
import { Downloads } from "@/components/downloads";
import { isObj, type LpSections as LpSectionsData } from "@/lib/payload";

/** 本文に出す段が1つでもあるか（冒頭の target・headlineMetric は本文ではないので数えない） */
export function hasLpSections(data: LpSectionsData | null | undefined): boolean {
  if (!data) return false;
  const n = (a: unknown[] | null | undefined) => (a ?? []).length;
  return (
    n(data.problems) > 0 ||
    n(data.tasks) > 0 ||
    n(data.metrics) > 0 ||
    n(data.reasons) > 0 ||
    n(data.plans) > 0 ||
    !!data.minimumTerm ||
    !!data.cancellation ||
    !!data.excluded ||
    n(data.steps) > 0 ||
    n(data.faqs) > 0 ||
    (data.downloads ?? []).some((d) => isObj(d.file))
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 text-[22px] font-semibold md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function LpSections({ data }: { data: LpSectionsData | null | undefined }) {
  if (!data) return null;
  const problems = data.problems ?? [];
  const tasks = data.tasks ?? [];
  const metrics = data.metrics ?? [];
  const reasons = data.reasons ?? [];
  const plans = data.plans ?? [];
  const steps = data.steps ?? [];
  const faqs = data.faqs ?? [];
  const downloads = (data.downloads ?? []).filter((d) => isObj(d.file));
  const hasPricing = plans.length > 0 || data.minimumTerm || data.cancellation || data.excluded;

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
            {data.minimumTerm && (
              <>
                <dt className="text-ink-2">最低契約期間</dt>
                <dd>{data.minimumTerm}</dd>
              </>
            )}
            {data.cancellation && (
              <>
                <dt className="text-ink-2">解約</dt>
                <dd>{data.cancellation}</dd>
              </>
            )}
            {data.excluded && (
              <>
                <dt className="text-ink-2">含まれない作業</dt>
                <dd className="whitespace-pre-line">{data.excluded}</dd>
              </>
            )}
          </dl>
          {data.priceNote && <p className="mt-4 text-[12px] text-ink-3">{data.priceNote}</p>}
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

      {downloads.length > 0 && (
        <Section title="資料">
          <Downloads items={downloads} heading={null} />
        </Section>
      )}
    </>
  );
}
