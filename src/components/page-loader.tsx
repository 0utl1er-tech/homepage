"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/wordmark";

const STAGES = ["CLOUD", "OSS", "ENGINEERING"];
const STAGE_AT = [8, 42, 76];

function statusFor(p: number) {
  if (p < 25) return "接続を確立しています";
  if (p < 55) return "コンテンツを読み込んでいます";
  if (p < 85) return "もうすぐ完了します";
  return "準備が完了しました";
}

/** Full-screen branded loading screen with an easing progress bar. */
export function PageLoader({ durationMs = 3200 }: { durationMs?: number }) {
  const [p, setP] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const toRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const dur = Math.max(800, durationMs);
    let start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / dur;
      if (t >= 1) {
        setP(100);
        toRef.current = setTimeout(() => {
          start = performance.now();
          rafRef.current = requestAnimationFrame(tick);
        }, 900);
        return;
      }
      const e = 1 - Math.pow(1 - t, 2);
      setP(Math.min(100, e * 100));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (toRef.current) clearTimeout(toRef.current);
    };
  }, [durationMs]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-void text-ink">
      <div className="w-[min(520px,86vw)] px-6">
        <div className="mb-[26px] flex items-center gap-2.5">
          <span className="loader-dot h-[7px] w-[7px] rounded-full bg-brand" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-ink-3">
            0UTL1ER K.K.
          </span>
        </div>

        <Wordmark className="text-[52px] leading-none" />
        <div className="mt-[18px] text-[19px] font-bold tracking-tight">
          <span className="text-brand">相関</span>の
          <span className="text-cost">外側</span>へ
        </div>

        <div className="mt-10 h-1.5 overflow-hidden rounded-full border border-line bg-surface-2">
          <div
            className="relative h-full overflow-hidden rounded-full bg-brand transition-[width] duration-100 ease-linear"
            style={{ width: `${p.toFixed(1)}%` }}
          >
            <span className="loader-shimmer absolute left-0 top-0 h-full w-[38%]" />
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between font-mono text-xs">
          <span className="text-ink-3">
            {statusFor(p)}
            <span className="loader-blink ml-0.5 inline-block">_</span>
          </span>
          <span className="num font-semibold text-ink-2">{Math.round(p)}%</span>
        </div>

        <div className="mt-9 flex gap-2.5">
          {STAGES.map((label, i) => {
            const on = p >= STAGE_AT[i];
            return (
              <div
                key={label}
                className="flex flex-1 items-center gap-2.5 rounded-md border border-line bg-surface px-4 py-[13px]"
              >
                <span
                  className="h-1.5 w-1.5 flex-none rounded-full transition-colors duration-300"
                  style={{ background: on ? "var(--accent)" : "var(--surface-3)" }}
                />
                <span
                  className="font-mono text-[11px] tracking-[0.08em] transition-colors duration-300"
                  style={{ color: on ? "var(--text-primary)" : "var(--text-muted)" }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
