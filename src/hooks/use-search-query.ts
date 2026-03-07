import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";

export const useSearch = (queryData: string) => {
  return useQuery<SearchConversationResult>({
    enabled: !!queryData,
    queryKey: ["search", queryData],
    staleTime: 1000 * 30,
    queryFn: async () => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/user?query=${queryData}`,
        { credentials: "include" }
      );
      return data.result;
    },
  });
};
