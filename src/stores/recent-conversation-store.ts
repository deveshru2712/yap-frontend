import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecentConversationStoreState {
  recentConversation: RecentConversation[];
}

interface RecentConversationStoreAction {
  updateRecentConversation: (conversation: RecentConversation) => void;
  clearRecentConversation: () => void;
}

type RecentConversationStateTypes = RecentConversationStoreState &
  RecentConversationStoreAction;

export const useRecentConversationStore =
  create<RecentConversationStateTypes>()(
    persist(
      (set) => ({
        recentConversation: [],
        updateRecentConversation: (conversation) => {
          set((state) => ({
            recentConversation: [...state.recentConversation, conversation],
          }));
        },
        clearRecentConversation: () => set({ recentConversation: [] }),
      }),
      {
        name: "recent-conversation-storage",
        partialize: (state) => ({
          recentConversation: state.recentConversation,
        }),
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
