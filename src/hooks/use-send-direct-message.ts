import { useMutation } from "@tanstack/react-query";
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
      const response = await fetch(
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

      const { result, message, success } = await response.json();

      if (!response.ok || !success) {
        throw new Error(message || "Failed to send message");
      }

      return result;
    },
    onSuccess: (result) => {
      // update the message list
      updateMessage(result);

      // set the conversationId if it is not set
      const { conversationContext, setconversationContext } =
        useConversationStore.getState();

      if (conversationContext.conversationId == null) {
        setconversationContext({
          conversationId: result.conversationId,
        });
      }
    },
    onError: (_, data) => {
      // remove the message from the list
      removeMessage(data.clientMessageId);
    },
  });
};
