import { useQuery } from "@tanstack/react-query";

export const useSearch = (queryData: string) => {
  return useQuery<SearchConversationResult>({
    enabled: !!queryData,
    queryKey: ["search", queryData],
    // for caching the result
    staleTime: 1000 * 30, // 30 seconds
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/user?query=${queryData}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to search user");
      }

      const { result } = await res.json();
      return result;
    },
  });
};
