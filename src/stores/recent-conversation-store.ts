import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecentConversationStoreState {
  conversations: Record<string, RecentConversation>;
  orderedIds: string[];
  recentConversation: RecentConversation[];
}

interface RecentConversationStoreAction {
  setRecentConversation: (conversations: RecentConversation[]) => void;
  updateRecentConversation: (conversation: SocketMessageData) => void;
  clearRecentConversation: () => void;
}

type RecentConversationStore = RecentConversationStoreState &
  RecentConversationStoreAction;

export const useRecentConversationStore = create<RecentConversationStore>()(
  persist(
    (set) => ({
      conversations: {},
      orderedIds: [],
      recentConversation: [],

      /**
       * Initial API load
       */
      setRecentConversation: (conversations) => {
        const map: Record<string, RecentConversation> = {};
        const ids: string[] = [];

        conversations.forEach((c) => {
          const id = c.conversationId!;
          map[id] = c;
          ids.push(id);
        });

        ids.sort(
          (a, b) =>
            new Date(map[b].createdAt).getTime() -
            new Date(map[a].createdAt).getTime()
        );

        const ordered = ids.map((id) => map[id]);

        set({
          conversations: map,
          orderedIds: ids,
          recentConversation: ordered,
        });
      },

      /**
       * Socket update
       */
      updateRecentConversation: (conversation) => {
        set((state) => {
          const id = conversation.conversationId;

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

          const updatedMap = {
            ...state.conversations,
            [id]: updatedConversation,
          };

          const newOrderedIds = state.orderedIds.filter((i) => i !== id);

          newOrderedIds.unshift(id);

          const ordered = newOrderedIds.map((i) => updatedMap[i]);

          return {
            conversations: updatedMap,
            orderedIds: newOrderedIds,
            recentConversation: ordered,
          };
        });
      },

      clearRecentConversation: () =>
        set({
          conversations: {},
          orderedIds: [],
          recentConversation: [],
        }),
    }),
    {
      name: "recent-conversation-storage",
      partialize: (state) => ({
        conversations: state.conversations,
        orderedIds: state.orderedIds,
        recentConversation: state.recentConversation,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
