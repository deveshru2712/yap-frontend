import { create } from "zustand";

interface ConversationStoreState {
  conversationContext: conversationContext;
}
interface ConversationStoreActions {
  setconversationContext: (data: Partial<conversationContext>) => void;
  resetconversationContext: () => void;
}

type ConversationStoreType = ConversationStoreState & ConversationStoreActions;

export const useConversationStore = create<ConversationStoreType>((set) => ({
  conversationContext: {
    receiverId: null,
    name: null,
    avatar: null,
    conversationId: null,
  },
  setconversationContext: (data) =>
    set((state) => ({
      conversationContext: {
        ...state.conversationContext,
        ...data,
      },
    })),
  resetconversationContext: () =>
    set({
      conversationContext: {
        receiverId: null,
        name: null,
        avatar: null,
        conversationId: null,
      },
    }),
}));
