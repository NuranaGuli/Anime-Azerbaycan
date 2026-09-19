"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService, type LoginPayload, type RegisterPayload } from "@/lib/services/authService";
import { useAuthStore } from "@/store/authStore";
import { ApiRequestError } from "@/lib/apiClient";
import type { User } from "@/types";

export function useAuthInit() {
  const setUser = useAuthStore((s) => s.setUser);
  const setInitializing = useAuthStore((s) => s.setInitializing);

  useEffect(() => {
    let cancelled = false;
    setInitializing(true);
    authService
      .me()
      .then((res) => {
        if (!cancelled) setUser(res.user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);
}

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation<{ user: User }, ApiRequestError, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries();
      toast.success(`Xoş gəldin, ${data.user.username}!`);
    },
    onError: (error) => {
      toast.error(error.message || "Giriş zamanı xəta baş verdi.");
    },
  });
}

export function useRegister() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation<{ user: User }, ApiRequestError, RegisterPayload>({
    mutationFn: (payload) => authService.register(payload),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries();
      toast.success("Qeydiyyat uğurla tamamlandı!");
    },
    onError: (error) => {
      toast.error(error.message || "Qeydiyyat zamanı xəta baş verdi.");
    },
  });
}

export function useLogout() {
  const clear = useAuthStore((s) => s.clear);
  const queryClient = useQueryClient();

  return useMutation<{ ok: true }, ApiRequestError, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clear();
      queryClient.clear();
      toast.success("Uğurla çıxış etdiniz.");
    },
  });
}
