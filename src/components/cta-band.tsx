import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GhostZeroOne } from "@/components/ds/decor";
import { COMPANY } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  description,
  titleSize = "lg",
  panel = false,
  borderTop = false,
  secondary,
}: {
  title: string;
  description?: string;
  titleSize?: "lg" | "md";
  panel?: boolean;
  borderTop?: boolean;
  /** Optional secondary action shown next to the email / primary CTA. */
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        panel && "bg-panel",
        borderTop && "border-t border-line"
      )}
    >
      <GhostZeroOne />
      <div className="relative mx-auto max-w-[1200px] px-6 py-20 md:px-12 md:py-[88px]">
        <h2
          className={cn(
            "font-extrabold tracking-tight",
            titleSize === "lg" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
            description ? "mb-3.5" : "mb-6"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mb-7 max-w-[480px] text-[15px] leading-relaxed text-ink-2">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <Button render={<Link href="/contact" />} size="lg">
            お問い合わせ →
          </Button>
          {secondary ? (
            <Link href={secondary.href} className="o-arrow">
              {secondary.label}
            </Link>
          ) : (
            <span className="font-mono text-sm text-ink-2">{COMPANY.email}</span>
          )}
        </div>
      </div>
    </section>
  );
}
