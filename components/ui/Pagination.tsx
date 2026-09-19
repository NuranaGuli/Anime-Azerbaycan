"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) {
    pages.push(p);
  }
  if (page < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(page, totalPages);

  return (
    <nav aria-label="Səhifələmə" className="flex items-center justify-center gap-1.5 pt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Əvvəlki səhifə"
        className="rounded-lg border border-border p-2 text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
              p === page ? "bg-primary text-white" : "text-text-secondary hover:bg-surface-hover"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Növbəti səhifə"
        className="rounded-lg border border-border p-2 text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
