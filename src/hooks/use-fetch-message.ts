import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";

export const useFetchMessage = (conversationId?: string | null) => {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    enabled: !!conversationId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    queryFn: async () => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/message?conversationId=${conversationId}`,
        { credentials: "include" }
      );
      return data.result;
    },
  });
};
