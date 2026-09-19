"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Ana səhifə" },
  { href: "/anime", label: "Kataloq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isInitializing } = useAuthStore();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold text-text-primary"
        >
          Anime <span className="text-primary">Azərbaycan</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "link-underline rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-hover",
                pathname === link.href ? "text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          {isInitializing ? null : isAuthenticated ? (
            <>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  {user?.username}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout.mutate()} isLoading={logout.isPending}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Giriş
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Qeydiyyat</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-border bg-bg px-4 py-3 sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            {isAuthenticated ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4" />
                    {user?.username}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    logout.mutate();
                    setMobileOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Çıxış
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Giriş
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Qeydiyyat</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
