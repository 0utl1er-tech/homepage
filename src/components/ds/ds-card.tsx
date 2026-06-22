import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "profit" | "cost" | "accent";

const toneColor: Record<Tone, string | null> = {
  default: null,
  profit: "var(--profit)",
  cost: "var(--cost)",
  accent: "var(--accent)",
};

/**
 * Surface-1 card with hairline border, soft shadow + inner top highlight,
 * optional left tone stripe, and an optional hover-lift when interactive.
 * Mirrors the Claude Design system Card component.
 */
export function DSCard({
  tone = "default",
  interactive = false,
  className,
  style,
  children,
  ...rest
}: React.ComponentProps<"div"> & { tone?: Tone; interactive?: boolean }) {
  const stripe = toneColor[tone];
  return (
    <div
      data-slot="ds-card"
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-surface",
        "shadow-[var(--shadow-sm),var(--edge-highlight)] transition-all duration-200 ease-out",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md),var(--edge-highlight)]",
        className
      )}
      style={style}
      {...rest}
    >
      {stripe && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{ background: stripe }}
        />
      )}
      {children}
    </div>
  );
}
