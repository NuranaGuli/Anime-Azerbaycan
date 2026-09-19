"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isInitializing, isAuthenticated, router]);

  if (isInitializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Yüklənir" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
