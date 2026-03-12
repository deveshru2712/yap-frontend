import { create } from "zustand";
import { useAuthStore } from "./auth-store";

interface StatusStoreState {
  onlineUsers: Set<string>;
  typingUsers: Set<string>;
}

interface StatusStoreActions {
  updateOnlineUserList: (userIdList: string[]) => void;
  setTypingUser: (userId: string) => void;
  removeTypingUser: (userId: string) => void;
}

type StatusStoreType = StatusStoreState & StatusStoreActions;

export const useStatusStore = create<StatusStoreType>((set) => ({
  onlineUsers: new Set(),
  typingUsers: new Set(),

  updateOnlineUserList: (userIdList) => {
    const currentUserId = useAuthStore.getState().user?.id;

    const filteredList = userIdList.filter((id) => id !== currentUserId);

    set({
      onlineUsers: new Set(filteredList),
    });
  },

  setTypingUser: (userId) =>
    set((state) => {
      const next = new Set(state.typingUsers);
      next.add(userId);
      return { typingUsers: next };
    }),

  removeTypingUser: (userId) =>
    set((state) => {
      const next = new Set(state.typingUsers);
      next.delete(userId);
      return { typingUsers: next };
    }),
}));
