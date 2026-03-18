"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "./Header";
import SpotPanel from "./SpotPanel";
import FilterBar from "./FilterBar";
import { spots, Spot } from "@/data/spots";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapView() {
  const [activeSpot, setActiveSpot] = useState<Spot | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isPanelClosing, setIsPanelClosing] = useState(false);

  const filteredSpots =
    activeCategory === "all"
      ? spots
      : spots.filter((s) => s.category === activeCategory);

  const handleSpotClick = useCallback((spot: Spot) => {
    if (activeSpot?.id === spot.id) return;
    if (activeSpot) {
      setIsPanelClosing(true);
      setTimeout(() => {
        setIsPanelClosing(false);
        setActiveSpot(spot);
      }, 280);
    } else {
      setActiveSpot(spot);
    }
  }, [activeSpot]);

  const handleClose = useCallback(() => {
    setIsPanelClosing(true);
    setTimeout(() => {
      setActiveSpot(null);
      setIsPanelClosing(false);
    }, 280);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Header />
      <FilterBar active={activeCategory} onChange={setActiveCategory} />
      <div style={{flex: 1, overflow: "hidden" }}>
        <Map
          spots={filteredSpots}
          activeSpot={activeSpot}
          onSpotClick={handleSpotClick}
        />
        {activeSpot && (
          <SpotPanel
            spot={activeSpot}
            onClose={handleClose}
            isClosing={isPanelClosing}
          />
        )}
      </div>
    </div>
  );
}
