"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsDisplayProps {
  value: number;
  size?: "sm" | "md";
  showValue?: boolean;
}

export function RatingBadge({ value, size = "sm", showValue = true }: RatingStarsDisplayProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-warning/30 bg-warning/10 font-semibold text-warning",
        size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
      )}
    >
      <Star className={cn("fill-warning", size === "sm" ? "h-3 w-3" : "h-4 w-4")} aria-hidden="true" />
      {showValue ? value.toFixed(1) : null}
    </span>
  );
}

interface InteractiveRatingProps {
  currentRating: number | null;
  onSubmit: (value: number) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function InteractiveRating({ currentRating, onSubmit, isSubmitting, disabled }: InteractiveRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? currentRating ?? 0;

  return (
    <div
      role="radiogroup"
      aria-label="Anime-yə reytinq verin, 1-dən 10-a qədər"
      className="flex flex-wrap items-center gap-1"
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          type="button"
          role="radio"
          aria-checked={currentRating === num}
          aria-label={`${num} bal ver`}
          disabled={disabled || isSubmitting}
          onMouseEnter={() => setHovered(num)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSubmit(num)}
          className="rounded p-0.5 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              num <= displayValue ? "fill-warning text-warning" : "fill-transparent text-text-muted"
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-text-secondary">
        {currentRating ? `Sizin reytinginiz: ${currentRating}/10` : "Reytinq vermək üçün ulduza klikləyin"}
      </span>
    </div>
  );
}
