import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSearchStoreState {
  query: string | null;
  searchResult: SearchConversationResult | null;
}

interface UserSearchStoreActions {
  setQuery: (data: string) => void;
  clearSearchUserName: () => void;
  setSearchResult: (recentConvoList: SearchConversationResult) => void;
}

type UserStoreTypes = UserSearchStoreState & UserSearchStoreActions;

export const useUserSearchStore = create<UserStoreTypes>()(
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
