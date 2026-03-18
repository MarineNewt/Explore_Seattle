"use client";
import { categories } from "@/data/spots";

const categoryColors: Record<string, string> = {
  all: "var(--text-primary)",
  nature: "var(--category-nature)",
  culture: "var(--category-culture)",
  food: "var(--category-food)",
  landmark: "var(--category-landmark)",
  entertainment: "var(--category-entertainment)",
};

interface FilterBarProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        display: "flex",
        gap: "6px",
        overflowX: "auto",
        flexShrink: 0,
        scrollbarWidth: "none",
        zIndex: 500,
      }}
    >
      {categories.map((cat) => {
        const isActive = active === cat.id;
        const color = categoryColors[cat.id];
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            style={{
              padding: "8px 14px",
              fontSize: "12.5px",
              fontFamily: "inherit",
              fontWeight: isActive ? 500 : 400,
              color: isActive ? color : "var(--text-secondary)",
              background: "transparent",
              border: "none",
              borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
              marginBottom: "-1px",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
