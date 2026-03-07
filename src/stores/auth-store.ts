import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useConversationStore } from "./conversation-store";
import { useUserSearchStore } from "./search-store";

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
        const { resetconversationContext } = useConversationStore();
        const { clearSearchUserName } = useUserSearchStore();
        set({ user: null, isAuthenticated: false, hasCheckedAuthStatus: true });
        resetconversationContext();
        clearSearchUserName();
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
