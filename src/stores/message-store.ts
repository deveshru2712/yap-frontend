import { create } from "zustand";

interface MessageStoreState {
  messages: Message[] | [];
}

interface MessageStoreAction {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: optimisticMessage) => void;
  removeMessage: (messageId: string) => void;
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
  updateMessage: (updatedMessage) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === updatedMessage.clientMessageId ? updatedMessage : msg
      ),
    }));
  },
  removeMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },
  clearMessages: () => set({ messages: [] }),
}));
