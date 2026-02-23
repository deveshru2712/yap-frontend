import { create } from "zustand";

interface MessageStoreState {
  messages: Message[] | [];
}

interface MessageStoreAction {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

type MessageStoreType = MessageStoreState & MessageStoreAction;

export const useMessageStore = create<MessageStoreType>((set) => ({
  messages: [],

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),
}));
