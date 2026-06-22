import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { COMPANY } from "@/lib/site";

const SITEMAP = [
  { label: "トップ", href: "/" },
  { label: "事業内容", href: "/services" },
  { label: "サービス", href: "/products" },
  { label: "会社概要", href: "/company" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pt-14 pb-7 md:grid-cols-[1.4fr_1fr_1fr] md:px-12">
        <div>
          <div className="mb-4">
            <Wordmark className="text-xl" kk />
          </div>
          <p className="mb-[18px] max-w-[320px] text-sm leading-relaxed text-ink-2">
            相関の外側へ。最先端の技術で価格を抑えながら、品質を保証する実装パートナー。
          </p>
          <div className="font-mono text-xs leading-relaxed text-ink-3">
            {COMPANY.zip} {COMPANY.address.slice(0, 5)}
            <br />
            {COMPANY.address.slice(5)}
          </div>
        </div>

        <div>
          <div className="mb-4 font-mono text-[11px] tracking-[0.12em] text-ink-3">
            SITEMAP
          </div>
          <div className="flex flex-col gap-3">
            {SITEMAP.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-2 transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 font-mono text-[11px] tracking-[0.12em] text-ink-3">
            CONTACT
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="text-sm text-ink-2 transition-colors hover:text-brand"
            >
              お問い合わせフォーム
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-mono text-sm text-brand transition-colors hover:text-brand-hover"
            >
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between border-t border-line px-6 py-[18px] md:px-12">
        <span className="font-mono text-xs text-ink-3">
          © 2026 0UTL1ER K.K. All rights reserved.
        </span>
        <span className="font-mono text-xs text-ink-3 opacity-50">01000101</span>
      </div>
    </footer>
  );
}
