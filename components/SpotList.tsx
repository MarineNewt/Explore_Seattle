"use client";

import Image from "next/image";
import { Spot, CATEGORIES } from "@/data/spots";

interface SpotListProps {
  spots: Spot[];
  activeSpot: Spot | null;
  onSpotSelect: (spot: Spot) => void;
}

export default function SpotList({ spots, activeSpot, onSpotSelect }: SpotListProps) {
  return (
    <aside className="spot-list">
      <div className="list-header">
        <span className="list-count">{spots.length} spots</span>
      </div>

      <div className="list-scroll">
        {spots.map((spot) => {
          const cat = CATEGORIES[spot.category];
          const isActive = activeSpot?.id === spot.id;
          return (
            <button
              key={spot.id}
              className={`spot-card ${isActive ? "active" : ""}`}
              onClick={() => onSpotSelect(spot)}
            >
              <div className="card-image-wrap">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="card-image"
                  sizes="80px"
                />
              </div>
              <div className="card-info">
                <span className="card-category" style={{ color: cat.color }}>
                  {cat.label}
                </span>
                <h3 className="card-name">{spot.name}</h3>
                <p className="card-desc">{spot.shortDescription}</p>
              </div>
            </button>
          );
        })}

        {spots.length === 0 && (
          <div className="empty">
            <span>No spots in this category</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .spot-list {
          position: fixed;
          top: 64px;
          left: 0;
          bottom: 0;
          width: 300px;
          background: white;
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          z-index: 500;
        }

        .list-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }

        .list-count {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .list-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        .spot-card {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 12px 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          border-left: 3px solid transparent;
          transition: all 0.15s ease;
        }

        .spot-card:hover {
          background: var(--color-bg);
        }

        .spot-card.active {
          background: var(--color-accent-light);
          border-left-color: var(--color-accent);
        }

        .card-image-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          background: var(--color-bg);
        }

        .card-image {
          object-fit: cover;
        }

        .card-info {
          flex: 1;
          min-width: 0;
        }

        .card-category {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          display: block;
          margin-bottom: 2px;
        }

        .card-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-primary);
          line-height: 1.25;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-desc {
          font-size: 11.5px;
          color: var(--color-text-secondary);
          line-height: 1.5;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .empty {
          padding: 40px 20px;
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .spot-list {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
