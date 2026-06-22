import { cn } from "@/lib/utils";

/** The 0UTL1ER leet-styled logotype — 0 and 1 stand in for O and I. */
export function Wordmark({
  className,
  kk = false,
}: {
  className?: string;
  kk?: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-2.5">
      <span
        className={cn(
          "font-black tracking-[-0.04em] leading-none",
          className
        )}
      >
        <span className="text-brand">0</span>
        <span className="text-ink">UTL</span>
        <span className="text-cost">1</span>
        <span className="text-ink">ER</span>
      </span>
      {kk && (
        <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3">
          K.K.
        </span>
      )}
    </span>
  );
}
