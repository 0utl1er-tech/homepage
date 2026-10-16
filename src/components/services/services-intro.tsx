"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { PlacedLine, ServiceShape } from "@/lib/services";

/* 事業内容の冒頭（見出し・説明文・図）。
 * 見出しと説明文を上に置き、図は中央に。左右の余白が注釈の置き場所。
 * タイルにカーソルを乗せると、タイルの中の点から線が左右どちらかの余白へ伸び、手段の名前と事業の一言が出る。
 * 位置の計算は lib/services.ts の placeLines。形ごとの切り抜きは globals.css の .svc-*。 */

const SHAPE_CLASS: Record<ServiceShape, string> = {
  cloud: "svc-ia",
  software: "svc-sw",
  top: "svc-bp",
  pillar: "svc-ta",
  column: "svc-ta",
};

/** 点を置く位置: 自分の列の中央、タイルの下端からの高さ */
const DOT_FROM_BOTTOM: Record<ServiceShape, number> = {
  cloud: 120,
  software: 200,
  top: 60,
  pillar: 230,
  column: 230,
};

/** 注釈の文字の幅と、線の端から文字までの余白 */
const LABEL_W = 200;
const EDGE = 0;

type Geo = { w: number; h: number; dotX: number; dotY: number; lineY: number; side: "l" | "r" };

export function ServicesIntro({
  placed,
  columns,
  lead,
}: {
  placed: PlacedLine[];
  columns: number;
  lead: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<{ slug: string; geo: Geo } | null>(null);
  const hasTop = placed.some((l) => l.shape === "top");

  const show = useCallback(
    (line: PlacedLine, el: HTMLElement) => {
      const root = wrap.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      const t = el.getBoundingClientRect();
      const colW = t.width / line.span;
      const dotX = t.left - r.left + colW / 2;
      const dotY = t.bottom - r.top - DOT_FROM_BOTTOM[line.shape];
      // 左半分の列は左の余白へ、右半分は右の余白へ
      const side: "l" | "r" = line.valueColumn <= columns / 2 ? "l" : "r";
      setActive({ slug: line.slug, geo: { w: r.width, h: r.height, dotX, dotY, lineY: dotY - 36, side } });
    },
    [columns]
  );
  const hide = useCallback((slug: string) => {
    setActive((a) => (a?.slug === slug ? null : a));
  }, []);

  const current = active ? placed.find((l) => l.slug === active.slug) : null;
  const g = active?.geo;
  const path = g
    ? g.side === "l"
      ? `M${g.dotX} ${g.dotY} L${g.dotX - 40} ${g.lineY} L${EDGE} ${g.lineY}`
      : `M${g.dotX} ${g.dotY} L${g.dotX + 40} ${g.lineY} L${g.w - EDGE} ${g.lineY}`
    : "";

  return (
    <div ref={wrap} className="relative mx-auto max-w-[1440px] px-6 pt-14 pb-20 md:px-8">
      <div className="mb-11 flex flex-wrap items-baseline gap-x-12 gap-y-3">
        <h1 className="text-[40px] font-semibold leading-tight md:text-[48px]">事業内容</h1>
        <p className="max-w-[560px] text-[15px] leading-[1.9] text-ink-2">{lead}</p>
      </div>

      <div className="svc-fig">
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
              onMouseEnter={(e) => show(s, e.currentTarget)}
              onMouseLeave={() => hide(s.slug)}
              onFocus={(e) => show(s, e.currentTarget)}
              onBlur={() => hide(s.slug)}
            >
              <span className="svc-ttl">{s.means}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 注釈: 余白へ伸びる線と説明。カーソルのある間だけ描く */}
      {g && current && (
        <div className="svc-co" aria-hidden="true" style={{ left: 0, top: 0, width: g.w, height: g.h }}>
          <svg width={g.w} height={g.h} viewBox={`0 0 ${g.w} ${g.h}`}>
            <path className="ln-halo" pathLength={1} d={path} />
            <path className="ln" pathLength={1} d={path} />
            <circle className="pt" cx={g.dotX} cy={g.dotY} r={3.5} />
          </svg>
          <span
            className={`lb ${g.side === "r" ? "text-right" : ""}`}
            style={{
              width: LABEL_W,
              bottom: g.h - g.lineY + 14,
              ...(g.side === "l" ? { left: EDGE } : { right: EDGE }),
            }}
          >
            <span className="t">{current.means}</span>
            <span className="d">{current.note}</span>
          </span>
        </div>
      )}
    </div>
  );
}
