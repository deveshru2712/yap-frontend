import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  hasCheckedAuthStatus: boolean;
  setUser: (user: User | null) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasCheckedAuthStatus: false,
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user, hasCheckedAuthStatus: true });
      },
      logOut: () => {
        set({ user: null, isAuthenticated: false, hasCheckedAuthStatus: true });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
