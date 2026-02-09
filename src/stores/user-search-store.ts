import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStoreState {
  searchUserName: string | null;
  recentConvoList: recentConversation[];
}

interface UserStoreActions {
  setSearchUserName: (username: string) => void;
  clearSearchUserName: () => void;
  setRecentConvoList: (recentConvoList: recentConversation[]) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>()(
  persist(
    (set) => ({
      searchUserName: null,
      recentConvoList: [],
      setSearchUserName: (username) => {
        set({ searchUserName: username });
      },
      clearSearchUserName: () => {
        set({ searchUserName: null, recentConvoList: [] });
      },
      setRecentConvoList: (list) => {
        set({ recentConvoList: list });
      },
    }),
    {
      name: "search-user-storage",
      partialize: (state) => ({
        searchUserName: state.searchUserName,
        recentConvoList: state.recentConvoList,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
