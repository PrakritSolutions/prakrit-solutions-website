import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0d12",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#5b56e8",
              display: "flex",
            }}
          />
          <span style={{ color: "#a3a5ae", fontSize: 28, letterSpacing: 2 }}>
            PRAKRIT SOLUTIONS
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.15,
            color: "#fafaf8",
            maxWidth: 980,
          }}
        >
          We build technology that solves real business problems.
        </div>
        <div style={{ display: "flex", color: "#5d5f68", fontSize: 24 }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
