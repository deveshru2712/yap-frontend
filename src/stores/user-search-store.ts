import { create } from "zustand";

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

export const useUserStore = create<UserStoreTypes>((set) => ({
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
}));
