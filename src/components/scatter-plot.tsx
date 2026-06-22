"use client";

import { useEffect, useRef, useState } from "react";

/** Cluster dot coordinates (the "correlation" crowd). */
const DOTS: [number, number][] = [
  [111, 326], [142, 304], [166, 282], [189, 289], [205, 267], [213, 237],
  [236, 223], [260, 215], [284, 179], [291, 201], [307, 171], [331, 149],
  [338, 164], [354, 127], [385, 98], [409, 75],
];

type Vals = {
  p: number[];
  lineOff: number;
  outO: number;
  outS: number;
  ringO: number;
  ringS: number;
};

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 2);
const easeBack = (p: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

function compute(t: number): Vals {
  const p = DOTS.map((_, i) => easeOut(clamp((t - (150 + i * 70)) / 450)));

  const lf = clamp((t - 1300) / 800);
  const lineOff = 440 * (1 - lf);

  const of = clamp((t - 1750) / 520);
  const outO = clamp(of * 4);
  const outS = of > 0 ? easeBack(of) : 0;

  let ringO = 0;
  let ringS = 0;
  if (t > 2050) {
    const ph = ((t - 2050) % 1700) / 1700;
    ringO = 0.6 * (1 - ph);
    ringS = 0.7 + ph * 2.4;
  }

  return { p, lineOff, outO, outS, ringO, ringS };
}

/**
 * Animated "beyond the correlation" scatter plot: a cluster of muted dots
 * pops in left→right, a trend line draws through them, then a lone outlier
 * dot (the cost-red point, top-left) appears with an overshoot and pulses.
 */
export function ScatterPlot() {
  const [v, setV] = useState<Vals>(() => compute(0));
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Settle to the final frame without animating.
      rafRef.current = requestAnimationFrame(() => setV(compute(99999)));
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    const start = performance.now();
    const frame = (now: number) => {
      setV(compute(now - start));
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="h-[440px] w-full">
      <svg viewBox="0 0 480 440" className="block h-full w-full">
        {/* axes */}
        <line x1="64" y1="392" x2="448" y2="392" stroke="var(--text-muted)" opacity="0.35" strokeWidth="1" />
        <line x1="64" y1="392" x2="64" y2="32" stroke="var(--text-muted)" opacity="0.35" strokeWidth="1" />
        <polyline points="442,387 449,392 442,397" fill="none" stroke="var(--text-muted)" opacity="0.35" strokeWidth="1" />
        <polyline points="59,39 64,32 69,39" fill="none" stroke="var(--text-muted)" opacity="0.35" strokeWidth="1" />
        <text x="448" y="412" textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-muted)">
          PRICE
        </text>

        {/* correlation trend line */}
        <line
          x1="95"
          y1="348"
          x2="425"
          y2="61"
          stroke="var(--accent)"
          opacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="440"
          strokeDashoffset={v.lineOff}
        />

        {/* cluster dots */}
        {DOTS.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--text-muted)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              opacity: v.p[i],
              transform: `scale(${v.p[i]})`,
            }}
          />
        ))}

        {/* outlier pulse ring */}
        <circle
          cx="127"
          cy="68"
          r="9"
          fill="none"
          stroke="var(--cost)"
          strokeWidth="2"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            opacity: v.ringO,
            transform: `scale(${v.ringS})`,
          }}
        />
        {/* outlier dot */}
        <circle
          cx="127"
          cy="68"
          r="9"
          fill="var(--cost)"
          stroke="var(--cost)"
          strokeWidth="2.5"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            opacity: v.outO,
            transform: `scale(${v.outS})`,
          }}
        />

        <text
          x="22"
          y="212"
          textAnchor="middle"
          transform="rotate(-90 22 212)"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--text-muted)"
        >
          PERFORMANCE
        </text>
      </svg>
    </div>
  );
}
