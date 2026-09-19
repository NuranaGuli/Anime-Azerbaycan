"use client";

import { useState, useRef, useEffect } from "react";
import { Bookmark, Check, ChevronDown } from "lucide-react";
import { cn, WATCHLIST_STATUS_LABELS } from "@/lib/utils";
import type { WatchlistStatus } from "@/types";

interface WatchlistButtonProps {
  status: WatchlistStatus | null;
  onChange: (status: WatchlistStatus | null) => void;
  isLoading?: boolean;
}

const OPTIONS: WatchlistStatus[] = ["watching", "completed", "plan_to_watch"];

export function WatchlistButton({ status, onChange, isLoading }: WatchlistButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-60",
          status
            ? "border-primary/40 bg-primary/15 text-primary hover:bg-primary/25"
            : "border-border bg-surface text-text-secondary hover:bg-surface-hover"
        )}
      >
        <Bookmark className={cn("h-4 w-4", status && "fill-primary")} />
        {status ? WATCHLIST_STATUS_LABELS[status] : "Watchlist-ə əlavə et"}
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-surface shadow-xl animate-fade-in"
        >
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={status === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-text-primary hover:bg-surface-hover"
              >
                {WATCHLIST_STATUS_LABELS[opt]}
                {status === opt && <Check className="h-4 w-4 text-primary" />}
              </button>
            </li>
          ))}
          {status && (
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="flex w-full items-center px-4 py-2.5 text-left text-sm text-error hover:bg-error/10"
              >
                Watchlist-dən sil
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
