/* =============================================================================
 * ブログ用の既定 OGP 画像（1200x630）。カバー画像のない記事・ジャンルページで使う。
 * トップの画像にはスローガンが入っているので、ブログではこちらに差し替える。
 * ===========================================================================*/
import { ImageResponse } from "next/og";

export const alt = "0UTL1ER Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0e1a",
          color: "#e8edf7",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#3b82f6", marginBottom: 28 }}>
          {"// 0UTL1ER K.K."}
        </div>
        <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>
          Blog
        </div>
        <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 28 }}>0utl1er.tech/blog</div>
      </div>
    ),
    { ...size },
  );
}
