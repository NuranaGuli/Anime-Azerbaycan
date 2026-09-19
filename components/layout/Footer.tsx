import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold text-text-primary">
          Anime Azərbaycan
        </Link>
        <p className="text-sm text-text-muted">© {new Date().getFullYear()} Anime Azərbaycan</p>
      </div>
    </footer>
  );
}
