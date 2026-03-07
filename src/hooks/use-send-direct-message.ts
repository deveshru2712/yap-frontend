import { useMutation } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";

export const useSendDirectMessage = () => {
  const { updateMessage, removeMessage } = useMessageStore();
  return useMutation({
    mutationFn: async ({
      content,
      receiverId,
      clientMessageId,
    }: directMessagePayload) => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/message/direct/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, receiverId, clientMessageId }),
        }
      );

      return data.result;
    },
    onSuccess: (result) => {
      updateMessage(result);

      const { conversationContext, setconversationContext } =
        useConversationStore.getState();

      if (conversationContext.conversationId == null) {
        setconversationContext({
          conversationId: result.conversationId,
        });
      }
    },
    onError: (_, data) => {
      removeMessage(data.clientMessageId);
    },
  });
};
