import { create } from "zustand";

interface UserStoreState {
  username: string | null;
  userList: User[] | null;
}

interface UserStoreActions {
  setUsername: (username: string) => void;
  setUserList: (userList: User[]) => void;
}

type UserStoreTypes = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStoreTypes>((set) => ({
  username: null,
  userList: null,
  setUsername: (username) => {
    set({ username });
  },
  setUserList: (list) => {
    set({ userList: list });
  },
}));
