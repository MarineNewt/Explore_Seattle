"use client";

import { Spot } from "@/data/spots";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  nature: "var(--category-nature)",
  culture: "var(--category-culture)",
  food: "var(--category-food)",
  landmark: "var(--category-landmark)",
  entertainment: "var(--category-entertainment)",
};

const categoryLabels: Record<string, string> = {
  nature: "Nature",
  culture: "Culture & Arts",
  food: "Food & Drink",
  landmark: "Landmark",
  entertainment: "Entertainment",
};

interface SpotPanelProps {
  spot: Spot;
  onClose: () => void;
  isClosing: boolean;
}

export default function SpotPanel({ spot, onClose, isClosing }: SpotPanelProps) {
  const [imgError, setImgError] = useState(false);
  const accentColor = categoryColors[spot.category] ?? "var(--accent)";

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 399,
          display: "none",
        }}
        className="panel-backdrop"
      />

      <aside
        className={isClosing ? "panel-exit" : "panel-enter"}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "var(--panel-width)",
          maxWidth: "100%",
          background: "var(--surface)",
          boxShadow: "var(--shadow-lg)",
          zIndex: 600,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {/* Photo */}
        <div style={{ position: "relative", height: "240px", flexShrink: 0, overflow: "hidden", background: "var(--surface-2)" }}>
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={spot.photo}
              alt={spot.name}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
              🏙️
            </div>
          )}

          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close panel"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "var(--text-primary)",
              boxShadow: "var(--shadow-sm)",
              backdropFilter: "blur(4px)",
            }}
          >
            ×
          </button>

          {/* Category badge */}
          <span style={{
            position: "absolute",
            bottom: "12px",
            left: "16px",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            background: accentColor,
            color: "white",
          }}>
            {categoryLabels[spot.category]}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: 1.25,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}>
            {spot.name}
          </h2>

          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
            marginBottom: "20px",
            fontStyle: "italic",
          }}>
            {spot.description}
          </p>

          <div style={{ width: "32px", height: "2px", background: accentColor, borderRadius: "1px", marginBottom: "20px" }} />

          <p style={{
            fontSize: "14px",
            color: "var(--text-primary)",
            lineHeight: 1.7,
            marginBottom: "20px",
          }}>
            {spot.details}
          </p>

          {/* Info rows */}
          {spot.hours && (
            <InfoRow icon="🕐" label="Hours" value={spot.hours} />
          )}
          {spot.tips && (
            <InfoRow icon="💡" label="Tip" value={spot.tips} accent={accentColor} />
          )}
        </div>

        {/* Footer CTA */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}>
          <a
            href={spot.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              background: accentColor,
              color: "white",
              textAlign: "center",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Visit Official Website →
          </a>
        </div>
      </aside>
    </>
  );
}

function InfoRow({ icon, label, value, accent }: { icon: string; label: string; value: string; accent?: string }) {
  return (
    <div style={{
      display: "flex",
      gap: "12px",
      marginBottom: "14px",
      padding: "12px",
      background: accent ? `${accent}08` : "var(--surface-2)",
      borderRadius: "var(--radius-sm)",
      border: accent ? `1px solid ${accent}22` : "1px solid var(--border)",
    }}>
      <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
      <div>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "3px" }}>{label}</p>
        <p style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.5 }}>{value}</p>
      </div>
    </div>
  );
}
