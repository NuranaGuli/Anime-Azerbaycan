import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  setInitializing: (value: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isInitializing: false }),
  setInitializing: (value) => set({ isInitializing: value }),
  clear: () => set({ user: null, isAuthenticated: false, isInitializing: false }),
}));
