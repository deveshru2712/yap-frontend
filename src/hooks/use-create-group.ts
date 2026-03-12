import { useMutation } from "@tanstack/react-query";
import { toastManager } from "@/components/ui/toast";
import { fetchWithError } from "@/lib/api";

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: async ({ name, userId }: createGroup) => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/conversation/group/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, userId }),
        }
      );
      if (data.success) {
        toastManager.add({
          title: "Group created successfully",
        });
      } else {
        toastManager.add({
          title: "Failed",
        });
      }
      return data.conversation;
    },
  });
};
