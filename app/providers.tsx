"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useAuthInit } from "@/hooks/useAuth";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  useAuthInit();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap>{children}</AuthBootstrap>
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#0B2136",
            color: "#F2F6F3",
            border: "1px solid #1E3A4C",
          },
        }}
      />
    </QueryClientProvider>
  );
}
