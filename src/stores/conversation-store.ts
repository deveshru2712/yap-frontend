import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ConversationStoreState {
  conversationContext: conversationContext;
}
interface ConversationStoreActions {
  setconversationContext: (data: Partial<conversationContext>) => void;
  resetconversationContext: () => void;
}

type ConversationStoreType = ConversationStoreState & ConversationStoreActions;

export const useConversationStore = create<ConversationStoreType>()(
  persist(
    (set, _get) => ({
      conversationContext: {
        receiverId: null,
        name: null,
        avatar: null,
        conversationId: null,
        type: "direct",
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
            type: "direct",
          },
        }),
    }),
    {
      name: "conversation-storage",
      partialize: (state) => ({
        conversationContext: state.conversationContext,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
