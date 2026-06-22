import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { MobileMenu } from "@/components/mobile-menu";
import { NAV_ITEMS, type NavKey } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav({ active }: { active?: NavKey }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[18px] md:px-12">
        <Link href="/" aria-label="0UTL1ER トップ">
          <Wordmark className="text-[22px]" kk />
        </Link>

        <div className="flex items-center gap-4 md:gap-[30px]">
          <div className="hidden items-center gap-[30px] md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "font-mono text-sm transition-colors hover:text-ink",
                  active === item.key ? "text-brand" : "text-ink-2"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button
            render={<Link href="/contact" />}
            variant="secondary"
            size="sm"
          >
            お問い合わせ
          </Button>
          <MobileMenu active={active} />
        </div>
      </div>
    </nav>
  );
}
