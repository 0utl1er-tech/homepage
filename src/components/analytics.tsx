/* =============================================================================
 * 0UTL1ER — 計測タグ（環境変数駆動 / 無料ツールのみ）
 *
 * すべて NEXT_PUBLIC_* が未設定なら「何も出力しない」= 安全な no-op。
 * ID を Forgejo Actions variables に設定して再ビルドすると有効化される。
 *
 *   NEXT_PUBLIC_GTM_ID     Google タグマネージャー  例: GTM-XXXXXXX
 *   NEXT_PUBLIC_GA_ID      GA4 測定 ID              例: G-XXXXXXXXXX
 *   NEXT_PUBLIC_AHREFS_KEY Ahrefs Web Analytics     例: 8f3c...（data-key の UUID）
 *
 * GA4 は GTM 経由で入れるのが定石だが、GTM を触らずすぐ計測したい場合に備えて
 * GA_ID を単体でも張れるようにしてある（両方設定すると二重計測になるので注意）。
 * ===========================================================================*/
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const AHREFS_KEY = process.env.NEXT_PUBLIC_AHREFS_KEY;

/** <head> に置くスクリプト群（GTM / GA4 / Ahrefs Analytics）。 */
export function AnalyticsScripts() {
  return (
    <>
      {GTM_ID ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}

      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {AHREFS_KEY ? (
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="afterInteractive"
          async
        />
      ) : null}
    </>
  );
}

/** GTM の noscript フォールバック。<body> 直後に置く。 */
export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
