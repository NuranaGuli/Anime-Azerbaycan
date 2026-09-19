import { apiClient } from "@/lib/apiClient";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  login: (payload: LoginPayload) => apiClient.post<{ user: User }>("/api/auth/login", payload),
  register: (payload: RegisterPayload) => apiClient.post<{ user: User }>("/api/auth/register", payload),
  logout: () => apiClient.post<{ ok: true }>("/api/auth/logout"),
  me: () => apiClient.get<{ user: User | null }>("/api/auth/me"),
};
