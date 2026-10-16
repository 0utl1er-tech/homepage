import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "profit" | "cost" | "accent" | "revenue" | "warning";

const palette: Record<Tone, { fg: string; bg: string; strong: string }> = {
  neutral: { fg: "var(--neutral-strong)", bg: "var(--neutral-tint)", strong: "var(--text-muted)" },
  profit: { fg: "var(--profit-strong)", bg: "var(--profit-tint)", strong: "var(--profit)" },
  cost: { fg: "var(--cost-strong)", bg: "var(--cost-tint)", strong: "var(--cost)" },
  accent: { fg: "var(--accent-strong)", bg: "var(--accent-tint)", strong: "var(--accent)" },
  revenue: { fg: "var(--revenue)", bg: "var(--revenue-tint)", strong: "var(--revenue)" },
  warning: { fg: "var(--warning-strong)", bg: "var(--warning-tint)", strong: "var(--warning)" },
};

/** Status label with optional leading dot. Mirrors the DS Badge. */
export function DSBadge({
  tone = "neutral",
  dot = false,
  size = "md",
  className,
  children,
  ...rest
}: React.ComponentProps<"span"> & {
  tone?: Tone;
  dot?: boolean;
  size?: "sm" | "md";
}) {
  const c = palette[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        size === "sm"
          ? "gap-1 px-[7px] py-[2px] text-[11px]"
          : "gap-1.5 px-[9px] py-[3px] text-xs",
        className
      )}
      style={{ color: c.fg, background: c.bg }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden
          className="rounded-full"
          style={{
            width: size === "sm" ? 5 : 6,
            height: size === "sm" ? 5 : 6,
            background: c.strong,
          }}
        />
      )}
      {children}
    </span>
  );
}
