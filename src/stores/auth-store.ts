import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  hasCheckedAuthStatus: boolean;
}

interface AuthStoreActions {
  setUser: (user: User | null) => void;
  logOut: () => void;
}

type AuthStoreTypes = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStoreTypes>()(
  persist(
    (set, _get) => ({
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
    }
  )
);
