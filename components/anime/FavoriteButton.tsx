"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  isLoading?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({ isFavorite, onToggle, isLoading, size = "md", className }: FavoriteButtonProps) {
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (!popping) return;
    const timeout = setTimeout(() => setPopping(false), 450);
    return () => clearTimeout(timeout);
  }, [popping]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setPopping(true);
        onToggle();
      }}
      disabled={isLoading}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Favorilərdən çıxar" : "Favorilərə əlavə et"}
      className={cn(
        "inline-flex items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        isFavorite
          ? "border-accent/40 bg-accent/15 text-accent hover:bg-accent/25"
          : "border-border bg-surface/80 text-text-secondary hover:border-accent/40 hover:text-accent",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        className
      )}
    >
      <Heart
        className={cn(
          size === "sm" ? "h-4 w-4" : "h-5 w-5",
          isFavorite && "fill-accent",
          popping && "animate-heart-pop"
        )}
      />
    </button>
  );
}
