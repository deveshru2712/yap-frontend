import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecentConversationStoreState {
  recentConversation: RecentConversation[];
}

interface RecentConversationStoreAction {
  setRecentConversation: (conversations: RecentConversation[]) => void;
  updateRecentConversation: (conversation: SocketMessageData) => void;
  clearRecentConversation: () => void;
}

type RecentConversationStateTypes = RecentConversationStoreState &
  RecentConversationStoreAction;

export const useRecentConversationStore =
  create<RecentConversationStateTypes>()(
    persist(
      (set) => ({
        recentConversation: [],

        /**
         * Initial API load
         */
        setRecentConversation: (conversations) =>
          set({
            recentConversation: conversations.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            ),
          }),

        /**
         * Update when new socket message arrives
         */
        updateRecentConversation: (conversation) => {
          set((state) => {
            const updatedConversation: RecentConversation = {
              userId:
                conversation.type === "group"
                  ? conversation.conversationId
                  : conversation.senderId,
              name: conversation.name,
              avatar: conversation.avatar,
              type: conversation.type,
              conversationId: conversation.conversationId,
              latestMessage: conversation.content,
              createdAt: conversation.createdAt,
            };

            const filtered = state.recentConversation.filter(
              (c) => c.conversationId !== conversation.conversationId
            );

            const updatedList = [updatedConversation, ...filtered].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            return {
              recentConversation: updatedList,
            };
          });
        },

        clearRecentConversation: () =>
          set({
            recentConversation: [],
          }),
      }),
      {
        name: "recent-conversation-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
