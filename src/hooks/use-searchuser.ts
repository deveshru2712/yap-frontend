"use client";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/search-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSearch = (queryData: string) => {
  const { setSearchResult } = useUserStore();
  return useQuery({
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
      data as SearchConversationResult[];
      setSearchResult(data);
    },
  });
};
