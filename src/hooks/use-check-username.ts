import { useQuery } from "@tanstack/react-query";
import { fetchWithError } from "@/lib/api";

export const useCheckUsername = (username: string) => {
  console.log("hook username:", username);
  return useQuery<boolean>({
    queryKey: ["check", username],
    enabled: username.length > 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    queryFn: async () => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/user/check-username?username=${username}`,
        {
          credentials: "include",
        }
      );
      console.log(data);
      return data.available;
    },
  });
};
