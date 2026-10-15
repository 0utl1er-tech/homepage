/* =============================================================================
 * 0UTL1ER — デフォルト OGP 画像（1200x630）
 * SNS / チャットでシェアされた時のカード画像。next/og で動的生成（無料・画像不要）。
 * ===========================================================================*/
import { ImageResponse } from "next/og";

export const alt = "0UTL1ER株式会社 — Beyond the Correlation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            color: "#3b82f6",
            marginBottom: 28,
          }}
        >
          {"// 0UTL1ER K.K."}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          <span>Beyond the</span>
          <span>Correlation</span>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#94a3b8",
            marginTop: 24,
          }}
        >
          0UTL1ER株式会社
        </div>
      </div>
    ),
    { ...size },
  );
}
