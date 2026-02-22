import { useQuery } from "@tanstack/react-query";

export const useFetchMessage = (conversationId?: string | null) => {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    enabled: !!conversationId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/message?conversationId=${conversationId}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      return data.data;
    },
  });
};
