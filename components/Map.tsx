"use client";

import { useEffect, useRef } from "react";
import { Spot } from "@/data/spots";

const SEATTLE_CENTER: [number, number] = [47.6062, -122.3321];
const DEFAULT_ZOOM = 13;

const categoryColors: Record<string, string> = {
  nature: "#2d6a4f",
  culture: "#5c4b8a",
  food: "#c26b2f",
  landmark: "#2b5ca8",
  entertainment: "#b5404a",
};

const categoryIcons: Record<string, string> = {
  nature: "🌿",
  culture: "🎨",
  food: "🍽️",
  landmark: "🏛️",
  entertainment: "🎭",
};

interface MapProps {
  spots: Spot[];
  activeSpot: Spot | null;
  onSpotClick: (spot: Spot) => void;
}

export default function Map(props: MapProps) {
  const spots = props?.spots ?? [];
  const activeSpot = props?.activeSpot ?? null;
  const onSpotClick = props?.onSpotClick ?? (() => {});
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<globalThis.Map<string, any>>(new globalThis.Map());
  const onSpotClickRef = useRef(onSpotClick);

  // Keep callback ref fresh without re-running effects
  useEffect(() => {
    onSpotClickRef.current = onSpotClick;
  });

  // Init Leaflet map once on mount
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      // Fix default icon paths broken by webpack
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: SEATTLE_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, []);

  // Sync markers whenever spots list changes
  useEffect(() => {
    if (!mapRef.current) {
      // Map not ready yet — retry shortly
      const t = setTimeout(() => {
        syncMarkers();
      }, 100);
      return () => clearTimeout(t);
    }
    syncMarkers();

    function syncMarkers() {
      const map = mapRef.current;
      if (!map) return;

      import("leaflet").then((L) => {
        // Remove stale markers
        markersRef.current.forEach((marker, id) => {
          if (!spots.find((s) => s.id === id)) {
            marker.remove();
            markersRef.current.delete(id);
          }
        });

        // Add new markers
        spots.forEach((spot) => {
          if (markersRef.current.has(spot.id)) return;

          const color = categoryColors[spot.category] ?? "#2d6a4f";
          const icon = categoryIcons[spot.category] ?? "📍";

          const marker = L.marker([spot.lat, spot.lng], {
            icon: L.divIcon({
              className: "",
              html: `
                <div style="
                  width:36px;height:36px;
                  background:${color};
                  border-radius:50% 50% 50% 4px;
                  transform:rotate(-45deg);
                  display:flex;align-items:center;justify-content:center;
                  box-shadow:0 2px 8px rgba(0,0,0,0.22);
                  border:2px solid rgba(255,255,255,0.85);
                  cursor:pointer;
                ">
                  <span style="transform:rotate(45deg);font-size:14px;line-height:1;">${icon}</span>
                </div>`,
              iconSize: [36, 36],
              iconAnchor: [18, 36],
            }),
          }).addTo(map);

          marker.on("click", () => onSpotClickRef.current(spot));
          markersRef.current.set(spot.id, marker);
        });
      });
    }
  }, [spots]);

  // Highlight active marker
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      markersRef.current.forEach((marker, id) => {
        const spot = spots.find((s) => s.id === id);
        if (!spot) return;
        const isActive = activeSpot?.id === id;
        const color = categoryColors[spot.category] ?? "#2d6a4f";
        const icon = categoryIcons[spot.category] ?? "📍";
        const size = isActive ? 44 : 36;

        marker.setIcon(
          L.divIcon({
            className: "",
            html: `
              <div style="
                width:${size}px;height:${size}px;
                background:${color};
                border-radius:50% 50% 50% 4px;
                transform:rotate(-45deg);
                display:flex;align-items:center;justify-content:center;
                box-shadow:${isActive ? "0 4px 14px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.22)"};
                border:${isActive ? "3px solid white" : "2px solid rgba(255,255,255,0.85)"};
                cursor:pointer;
              ">
                <span style="transform:rotate(45deg);font-size:${isActive ? 17 : 14}px;line-height:1;">${icon}</span>
              </div>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
          })
        );
        marker.setZIndexOffset(isActive ? 1000 : 0);
      });
    });
  }, [activeSpot, spots]);

  // Fly to active spot
  useEffect(() => {
    if (!mapRef.current || !activeSpot) return;
    const zoom = Math.max(mapRef.current.getZoom(), 15);
    mapRef.current.flyTo([activeSpot.lat, activeSpot.lng], zoom, { duration: 0.8 });
  }, [activeSpot]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      />
    </>
  );
}
