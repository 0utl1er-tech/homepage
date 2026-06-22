import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full bg-void text-ink">{children}</body>
    </html>
  );
}
