import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id: string;
  email: string;
  userName: string;
}

// Verify session
export const useVerifySession = () => {
  return useQuery({
    queryKey: ["auth", "verify"],
    queryFn: async () => {
      const { setUser } = useAuthStore();

      try {
        const res = await fetch(`${API_URL}/v1/api/auth/verify`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setUser(data.user);
        return data.user as User;
      } catch (error) {
        setUser(null);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Sign in
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(`${API_URL}/v1/api/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: async () => {
      // Refetch verify query which will update the user in store
      await queryClient.invalidateQueries({
        queryKey: ["auth", "verify"],
      });
    },
  });
};

// Sign up
export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      userName: string;
    }) => {
      const res = await fetch(`${API_URL}/v1/api/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
      }

      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth", "verify"],
      });
    },
  });
};

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/v1/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      return res.json();
    },
    onSuccess: () => {
      const { logOut } = useAuthStore();
      logOut();
      queryClient.clear();
    },
  });
};
