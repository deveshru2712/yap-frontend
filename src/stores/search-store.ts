import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStoreState {
  query: string | null;
  searchResult: recentConversation[];
}

interface UserStoreActions {
  setQuery: (data: string) => void;
  clearSearchUserName: () => void;
  setSearchResult: (recentConvoList: recentConversation[]) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>()(
  persist(
    (set) => ({
      query: null,
      searchResult: [],
      setQuery: (username) => {
        set({ query: username });
      },
      clearSearchUserName: () => {
        set({ query: null, searchResult: [] });
      },
      setSearchResult: (list) => {
        set({ searchResult: list });
      },
    }),
    {
      name: "search-user-storage",
      partialize: (state) => ({
        searchUserName: state.query,
        recentConvoList: state.searchResult,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
