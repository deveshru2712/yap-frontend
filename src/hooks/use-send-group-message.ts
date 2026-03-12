import { useMutation } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";
import { useMessageStore } from "@/stores/message-store";

export const useSendGroupMessage = () => {
  const { updateMessage, removeMessage } = useMessageStore();
  return useMutation({
    mutationFn: async ({
      content,
      clientMessageId,
      conversationId,
    }: GroupMessagePayload) => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/message/group/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, clientMessageId, conversationId }),
        }
      );
      return data.result;
    },
    onSuccess: (result: OptimisticMessage) => {
      updateMessage(result);
    },
    onError: (_, data) => {
      removeMessage(data.clientMessageId);
    },
  });
};
