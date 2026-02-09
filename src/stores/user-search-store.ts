import { create } from "zustand";

interface UserStoreState {
  searchUserName: string | null;
  recentConvoList: recentConversation[];
}

interface UserStoreActions {
  setSearchUserName: (username: string) => void;
  setRecentConvoList: (recentConvoList: recentConversation[]) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>((set) => ({
  searchUserName: null,
  recentConvoList: [],
  setSearchUserName: (username) => {
    set({ searchUserName: username });
  },
  setRecentConvoList: (list) => {
    set({ recentConvoList: list });
  },
}));
