import Link from "next/link";
import { getServiceLines, placeLines, type ServiceShape } from "@/lib/services";

/* 事業内容の図。上の段が提供の形と一文、下に手段が階段状に積み重なる（globals.css の .svc-*）。
 * 位置は lib/services.ts の placeLines が決める。形ごとの切り抜きは CSS クラスで。 */

const SHAPE_CLASS: Record<ServiceShape, string> = {
  cloud: "svc-ia",
  software: "svc-sw",
  top: "svc-bp",
  pillar: "svc-ta",
  column: "svc-ta",
};

export async function ServiceStack() {
  const lines = await getServiceLines();
  const { placed, columns } = placeLines(lines);
  const hasTop = placed.some((l) => l.shape === "top");

  return (
    <div className="svc-stack" style={{ "--svc-cols": columns } as React.CSSProperties}>
      {placed.map((s) => (
        <div
          key={`v-${s.slug}`}
          className="svc-val"
          style={{ gridColumn: s.valueColumn, gridRow: 1, order: s.valueColumn * 2 - 1 }}
        >
          <span className="svc-kind">{s.kind}</span>
          <span className="svc-note">{s.description}</span>
        </div>
      ))}
      {placed.map((s) => (
        <Link
          key={`t-${s.slug}`}
          href={`/services/${s.slug}`}
          className={`svc-blk ${SHAPE_CLASS[s.shape]} ${(s.shape === "software" && !hasTop) || (s.shape === "cloud" && s.span === 1) ? "svc-solo" : ""}`}
          style={{
            gridColumn: s.column,
            gridRow: s.row,
            order: s.valueColumn * 2,
            ["--svc-span" as string]: s.span,
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url("${s.image}")`,
          }}
          aria-label={`${s.kind}（${s.means}）のページへ`}
        >
          <span className="svc-ttl">{s.means}</span>
        </Link>
      ))}
    </div>
  );
}
