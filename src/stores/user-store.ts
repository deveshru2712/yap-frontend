import { create } from "zustand";

interface UserStoreState {
  username: string | null;
  recentConvoList: recentConversation[];
}

interface UserStoreActions {
  setUsername: (username: string) => void;
  setRecentConvoList: (recentConvoList: recentConversation[]) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>((set) => ({
  username: null,
  recentConvoList: [],
  setUsername: (username) => {
    set({ username });
  },
  setRecentConvoList: (list) => {
    set({ recentConvoList: list });
  },
}));
