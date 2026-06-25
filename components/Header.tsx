"use client";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
})
// Color scheme: 
// Dominant BG & text
// --Mist / Cloud White (#F7F9F9)
// --Deep Charcoal / Cedar Bark (#242B27)
// Primary & Secondary Colors
// --Moss / Evergreen (#2E5A44)
// --Puget Sound Blue (#1C4A6F)
// Action & Accent Colors
// --Sunset Gold / Sunray (#E8A838)
// --Rustic Burnt Orange (#C85A17)

export default function Header() {
  return (
    <header
      style={{
        height: "var(--header-height)",
        background: "var(--surface)",
        backgroundColor: "#2E5A44",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 500,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "22px" }}>🏔️</span>
        <div>
          <h1
            className={roboto.className}
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#242B27",
            }}
          >
            Seattle Adventures
          </h1>
          <p
            style={{
              fontSize: "11px",
              color: "#F7F9F9",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: "1px",
            }}
          >
            Explore the Emerald City
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "var(--accent-light)",
          border: "1px solid #c8e6d4",
          borderRadius: "20px",
          padding: "5px 12px",
          fontSize: "12px",
          color: "var(--accent)",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        Seattle, WA
      </div>
    </header>
  );
}
