"use client";

export default function Header() {
  return (
    <header
      style={{
        height: "var(--header-height)",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
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
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            Seattle Adventures
          </h1>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
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
