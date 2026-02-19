import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStoreState {
  query: string | null;
  searchResult: SearchConversationResult | null;
}

interface UserStoreActions {
  setQuery: (data: string) => void;
  clearSearchUserName: () => void;
  setSearchResult: (recentConvoList: SearchConversationResult) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>()(
  persist(
    (set) => ({
      query: null,
      searchResult: null,
      setQuery: (username) => {
        set({ query: username });
      },
      clearSearchUserName: () => {
        set({ query: null, searchResult: null });
      },
      setSearchResult: (list) => {
        set({ searchResult: list });
      },
    }),
    {
      name: "search-query-storage",
      partialize: (state) => ({
        query: state.query,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
