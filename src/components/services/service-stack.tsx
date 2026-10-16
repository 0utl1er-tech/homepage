import Link from "next/link";
import { SERVICE_LINES, type ServiceSlug } from "@/lib/services";

/* 事業内容の図。上の段が価値、下に手段が階段状に積み重なる（globals.css の .svc-*）。
 *   列: IaaS | SaaS | BPaaS | TaaS
 *   マネージドクラウド … 左端を縦にのび、下段で SaaS・BPaaS の下まで広がる階段
 *   ソフトウェア       … SaaS の列で一番上まで届き、BPaaS ではコンサルティングの下に入る階段
 *   コンサルティング   … BPaaS の一番上
 *   スペシャリスト     … 土台に乗らない縦長の柱 */

const TILE_CLASS: Record<ServiceSlug, string> = {
  iaas: "svc-ia",
  saas: "svc-sw",
  bpaas: "svc-bp",
  taas: "svc-ta",
};

export function ServiceStack() {
  return (
    <div>
      <div className="svc-stack">
        {SERVICE_LINES.map((s, i) => (
          <div key={`v-${s.slug}`} className={`svc-val svc-v${i + 1}`}>
            <span className="svc-kind">{s.kind}</span>
            <span className="svc-value">{s.value}</span>
            <span className="svc-note">{s.valueNote}</span>
          </div>
        ))}
        {SERVICE_LINES.map((s) => (
          <Link
            key={`t-${s.slug}`}
            href={`/services/${s.slug}`}
            className={`svc-blk ${TILE_CLASS[s.slug]}`}
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url("${s.image}")` }}
            aria-label={`${s.kind}（${s.means}）のページへ`}
          >
            <span className="svc-ttl">{s.means}</span>
          </Link>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-ink-2">
        <span>IaaS ＝ いま動いているものを引き取り、運用費を下げる</span>
        <span>SaaS ＝ 作らずに、できあがった仕組みを使う</span>
        <span>BPaaS ＝ ソフトと人で業務ごと引き受ける</span>
        <span>TaaS ＝ 0UTL1ER の技術者がお客様のチームに入る</span>
      </div>
    </div>
  );
}
