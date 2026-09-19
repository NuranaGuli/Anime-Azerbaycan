"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { AVAILABLE_GENRES, ANIME_STATUS_LABELS } from "@/lib/utils";
import type { AnimeStatus } from "@/types";

interface GenreFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
  status: AnimeStatus | "";
  onStatusChange: (value: AnimeStatus | "") => void;
}

export function GenreFilter({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  status,
  onStatusChange,
}: GenreFilterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasActiveFilters = genre || status;

  const filterFields = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Select
        label="Janr"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        aria-label="Janr üzrə filtrlə"
      >
        <option value="">Bütün janrlar</option>
        {AVAILABLE_GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>
      <Select
        label="Status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as AnimeStatus | "")}
        aria-label="Status üzrə filtrlə"
      >
        <option value="">Bütün statuslar</option>
        {Object.entries(ANIME_STATUS_LABELS).map(([value, labelText]) => (
          <option key={value} value={value}>
            {labelText}
          </option>
        ))}
      </Select>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Anime adı üzrə axtar..."
            aria-label="Anime adı üzrə axtar"
            className="pl-10"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="md"
          className="sm:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-label="Filtrləri aç"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
        </Button>
      </div>

      <div className="hidden sm:block">{filterFields}</div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="relative z-10 w-full rounded-t-2xl border-t border-border bg-surface p-5 animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">Filtrlər</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Bağla"
                className="rounded-md p-1 text-text-muted hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterFields}
            <Button className="mt-4 w-full" onClick={() => setDrawerOpen(false)}>
              Tətbiq et
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
