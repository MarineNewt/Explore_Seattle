"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { spots, Spot } from "@/data/spots";
import Header from "./Header";
import SpotList from "./SpotList";
import SpotPanel from "./SpotPanel";

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="map-loading-inner">
        <div className="spinner" />
        <span>Loading map…</span>
      </div>
      <style jsx>{`
        .map-loading {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0ede8;
        }
        .map-loading-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          color: var(--color-text-secondary);
          font-size: 13px;
          font-weight: 300;
        }
        .spinner {
          width: 28px;
          height: 28px;
          border: 2px solid var(--color-border);
          border-top-color: var(--color-accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  ),
});

export default function MapPage() {
  const [activeSpot, setActiveSpot] = useState<Spot | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSpots = useMemo(() => {
    if (!activeCategory) return spots;
    return spots.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleSpotSelect = (spot: Spot) => {
    setActiveSpot(spot);
  };

  const handleClose = () => {
    setActiveSpot(null);
  };

  return (
    <>
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        spotCount={spots.length}
      />

      <div className="layout">
        <SpotList
          spots={filteredSpots}
          activeSpot={activeSpot}
          onSpotSelect={handleSpotSelect}
        />

        <main className="map-area">
          <Map
            spots={filteredSpots}
            activeSpot={activeSpot}
            onSpotSelect={handleSpotSelect}
          />
        </main>
      </div>

      <SpotPanel spot={activeSpot} onClose={handleClose} />

      <style jsx>{`
        .layout {
          display: flex;
          height: 100vh;
          padding-top: 64px;
        }

        .map-area {
          flex: 1;
          margin-left: 300px;
          height: 100%;
          position: relative;
        }

        @media (max-width: 900px) {
          .map-area {
            margin-left: 0;
          }
        }

        @media (max-width: 768px) {
          .layout {
            padding-top: 56px;
          }
        }
      `}</style>
    </>
  );
}
