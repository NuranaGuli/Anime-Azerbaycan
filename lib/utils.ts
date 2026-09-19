import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("az-AZ", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "indicə";
  if (diffMin < 60) return `${diffMin} dəqiqə əvvəl`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} saat əvvəl`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay} gün əvvəl`;
  return formatDate(iso);
}

export const WATCHLIST_STATUS_LABELS: Record<string, string> = {
  watching: "İzləyirəm",
  completed: "Tamamladım",
  plan_to_watch: "İzləmək planlaşdırıram",
};

export const ANIME_STATUS_LABELS: Record<string, string> = {
  ongoing: "Davam edir",
  completed: "Tamamlanıb",
  announced: "Elan olunub",
};

export const AVAILABLE_GENRES = [
  "Döyüş",
  "Macəra",
  "Fəntəzi",
  "Dram",
  "Sirr",
  "Psixoloji",
  "Komediya",
  "Şonen",
  "Məktəb",
  "Fövqəladə güclər",
];
