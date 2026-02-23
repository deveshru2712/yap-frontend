import { useMutation } from "@tanstack/react-query";
import { useMessageStore } from "@/stores/message-store";

export const useSendDirectMessage = () => {
  const { addMessage } = useMessageStore();
  return useMutation({
    mutationFn: async ({ content, receiverId }: directMessagePayload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/message/direct/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, receiverId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
    onSuccess: (data) => {
      addMessage(data.message);
    },
  });
};
