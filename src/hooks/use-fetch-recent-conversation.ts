import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";

export const useFetchRecentConversation = () => {
  return useQuery<RecentConversation>({
    queryKey: ["recentConversation"],
    staleTime: 1000 * 30,
    queryFn: async () => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/conversation/recent-conversation`,
        { credentials: "include" }
      );
      return data.result;
    },
  });
};
