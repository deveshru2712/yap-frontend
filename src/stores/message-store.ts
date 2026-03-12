import { create } from "zustand";

interface MessageStoreState {
  messages: Message[];
}

interface MessageStoreAction {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (message: OptimisticMessage) => void;
  removeMessage: (messageId: string) => void;
  clearMessages: () => void;
}

type MessageStoreType = MessageStoreState & MessageStoreAction;

export const useMessageStore = create<MessageStoreType>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => {
      const isDuplicate = state.messages.some(
        (msg) =>
          msg.id === message.id ||
          (message as OptimisticMessage).clientMessageId === msg.id
      );
      if (isDuplicate) return state;
      return { messages: [...state.messages, message] };
    }),
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
