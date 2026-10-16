import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeMenu } from "@/components/theme-toggle";
import { NAV_ITEMS, type NavKey } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav({ active }: { active?: NavKey }) {
  return (
    <nav className="o-chrome sticky top-0 z-50 border-b border-[var(--header-border)] bg-[var(--header-bg)]/90 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[18px] md:px-12">
        <Link href="/" aria-label="0UTL1ER トップ">
          <Wordmark className="text-[22px]" kk />
        </Link>

        <div className="flex items-center gap-4 md:gap-[30px]">
          <div className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const current = active === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    // 下線がマウスを乗せると左から伸びる。今いるページは下線を出したまま
                    "relative py-2 text-[14px] font-medium tracking-[0.02em] transition-colors duration-200 hover:text-ink",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-brand",
                    "after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
                    "motion-reduce:after:transition-none",
                    current ? "text-ink after:scale-x-100" : "text-ink-2 after:scale-x-0"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <ThemeMenu className="hidden md:block" />
            <Button
              render={<Link href="/contact" />}
              variant="secondary"
              size="sm"
            >
              お問い合わせ
            </Button>
          </div>
          <MobileMenu active={active} />
        </div>
      </div>
    </nav>
  );
}
