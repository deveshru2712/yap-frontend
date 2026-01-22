import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSearchUsername = (username: string) => {
  return useQuery({
    enabled: !!username,
    queryKey: ["search", "user", username],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/api/user?username=${username}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to search user");
      }

      const { data } = await res.json();
      return data as recentConversation[];
    },
  });
};
