import Link from "next/link";
import type { Genre } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** ジャンルのタブ。active が無ければ「すべて」を選択中にする */
export function GenreTabs({ genres, active }: { genres: Genre[]; active?: string }) {
  const tabs = [{ slug: "", name: "すべて", href: "/blog" }].concat(
    genres.map((g) => ({ slug: g.slug, name: g.name, href: `/blog/category/${g.slug}` }))
  );
  return (
    <nav aria-label="ジャンル" className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <ul className="flex min-w-max gap-1 border-b border-line">
        {tabs.map((t) => {
          const on = (active ?? "") === t.slug;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "relative block px-4 pt-2 pb-3.5 text-sm transition-colors",
                  on ? "font-bold text-ink" : "text-ink-2 hover:text-ink"
                )}
              >
                {t.name}
                {on && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-brand"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
