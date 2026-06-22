import Link from "next/link";
import type { Card } from "@/lib/strapi";
import { BINARY_STRING } from "@/lib/site";

function NoCover() {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-surface-2">
      <span
        aria-hidden
        className="absolute inset-0 break-all p-3.5 font-mono text-sm leading-relaxed text-brand opacity-[0.06] select-none"
      >
        {BINARY_STRING + BINARY_STRING.slice(0, 12)}
      </span>
      <span className="relative text-[22px] font-black tracking-[-0.04em] opacity-50">
        <span className="text-brand">0</span>UTL<span className="text-cost">1</span>ER
      </span>
    </div>
  );
}

export function ProductCard({ item }: { item: Card }) {
  return (
    <Link
      href={`/products/${encodeURIComponent(item.slug)}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface text-inherit shadow-[var(--shadow-sm)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:border-line-strong hover:shadow-[var(--shadow-md)]"
    >
      {item.hasCover && item.cover ? (
        <div className="aspect-video overflow-hidden bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.cover}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <NoCover />
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
            {item.category}
          </span>
          <span className="font-mono text-xs text-ink-3">{item.dateLabel}</span>
        </div>
        <h2 className="text-xl font-bold leading-snug tracking-tight">
          {item.title}
        </h2>
        <p className="mb-1.5 text-sm leading-relaxed text-ink-2">
          {item.excerpt}
        </p>
        <span className="o-arrow mt-auto !text-[13px] transition-[gap] group-hover:gap-3">
          続きを読む →
        </span>
      </div>
    </Link>
  );
}
