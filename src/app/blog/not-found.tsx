import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function BlogPostNotFound() {
  return (
    <>
      <SiteNav active="blog" />
      <div className="mx-auto max-w-[820px] px-6 py-28 text-center md:px-12">
        <div
          className="mb-5 font-mono text-[64px] font-bold tracking-[-0.04em]"
          style={{ color: "transparent", WebkitTextStroke: "1.5px var(--accent)" }}
        >
          404
        </div>
        <h1 className="mb-3.5 text-[26px] font-semibold">ページが見つかりませんでした</h1>
        <p className="mb-7 text-[15px] text-ink-2">
          URLが変わったか、記事の公開を取りやめた可能性があります。
        </p>
        <Link href="/blog" className="o-arrow justify-center">
          ← ブログのトップへ
        </Link>
      </div>
      <SiteFooter />
    </>
  );
}
