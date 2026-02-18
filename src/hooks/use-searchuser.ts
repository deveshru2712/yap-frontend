import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSearch = (queryData: string) => {
  return useQuery<SearchConversationResult>({
    enabled: !!queryData,
    queryKey: ["search", queryData],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/api/user?query=${queryData}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to search user");
      }

      const { data } = await res.json();
      return data;
    },
  });
};
