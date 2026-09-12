import React from "react";

/**
 * Reusable star rating component.
 * - Interactive mode: clickable stars for submitting ratings
 * - Display mode: read-only stars for showing existing ratings
 */
export default function StarRating({
  rating = 0,
  onRate = null,
  size = 20,
  interactive = false,
}) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          style={{
            cursor: interactive ? "pointer" : "default",
            fontSize: `${size}px`,
            color: star <= rating ? "#f59e0b" : "#d1d5db",
            transition: "color 0.15s ease, transform 0.15s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            if (interactive) e.target.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            if (interactive) e.target.style.transform = "scale(1)";
          }}
          role={interactive ? "button" : "presentation"}
          aria-label={interactive ? `Rate ${star} stars` : `${star} stars`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
