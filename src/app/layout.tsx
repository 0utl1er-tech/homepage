import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts, GtmNoScript } from "@/components/analytics";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://0utl1er.tech"),
  title: {
    default: "0UTL1ER株式会社 — 相関の外側へ",
    template: "%s — 0UTL1ER株式会社",
  },
  description:
    "相関の外側へ。最先端の技術で価格を抑えながら、品質を保証する実装パートナー。マネージドプライベートクラウド / クリーンなOSS基盤 / 精鋭エンジニア × 最新AI。",
  keywords: [
    "0UTL1ER",
    "受託開発",
    "プライベートクラウド",
    "OSS",
    "Kubernetes",
    "エンジニア派遣",
    "埼玉",
    "久喜市",
  ],
  openGraph: {
    title: "0UTL1ER株式会社 — 相関の外側へ",
    description:
      "最先端の技術で価格を抑えながら、品質を保証する実装パートナー。",
    type: "website",
    locale: "ja_JP",
    url: "https://0utl1er.tech",
    siteName: "0UTL1ER株式会社",
  },
  twitter: {
    card: "summary_large_image",
    title: "0UTL1ER株式会社 — 相関の外側へ",
    description:
      "最先端の技術で価格を抑えながら、品質を保証する実装パートナー。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // 各サービスの認証コード。Forgejo Actions variables で設定すると出力される。
    google: process.env.NEXT_PUBLIC_SITE_VERIFICATION_GOOGLE,
    other: {
      // Ahrefs Webmaster Tools のサイト所有権確認（meta タグ方式）
      ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_AHREFS
        ? {
            "ahrefs-site-verification":
              process.env.NEXT_PUBLIC_SITE_VERIFICATION_AHREFS,
          }
        : {}),
      // Bing Webmaster Tools
      ...(process.env.NEXT_PUBLIC_SITE_VERIFICATION_BING
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_SITE_VERIFICATION_BING }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <AnalyticsScripts />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full bg-void text-ink">
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
