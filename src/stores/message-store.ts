import { create } from "zustand";

interface MessageStoreState {
  messagesByConversation: Record<string, Message[]>;
}

interface MessageStoreAction {
  addMessage: (message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  clearMessages: (conversationId: string) => void;
}

type MessageStoreType = MessageStoreState & MessageStoreAction;

export const useMessageStore = create<MessageStoreType>((set) => ({
  messagesByConversation: {},

  addMessage: (message) =>
    set((state) => {
      const existing =
        state.messagesByConversation[message.conversationId] || [];

      return {
        messagesByConversation: {
          ...state.messagesByConversation,
          [message.conversationId]: [...existing, message],
        },
      };
    }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: messages,
      },
    })),

  clearMessages: (conversationId) =>
    set((state) => {
      const updated = { ...state.messagesByConversation };
      delete updated[conversationId];
      return { messagesByConversation: updated };
    }),
}));
