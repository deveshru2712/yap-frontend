import { create } from "zustand";

interface MessageStoreState {
  receiverId: string | null;
  content: string | null;
}

interface MessageStoreAction {
  setReceiverId: (userId: string) => void;
  setContent: (content: string) => void;
  clearContent: () => void;
}

type MessageStoreType = MessageStoreState & MessageStoreAction;

export const useMessageStore = create<MessageStoreType>((set) => ({
  receiverId: null,
  content: null,
  setReceiverId: (userId) => {
    set({ receiverId: userId });
  },
  setContent: (content) => {
    set({ content });
  },
  clearContent: () => {
    set({ content: null });
  },
}));
