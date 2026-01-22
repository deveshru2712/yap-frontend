"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id: string;
  email: string;
  username: string;
}

// Verify session
export const useVerifySession = () => {
  const { setUser } = useAuthStore();

  const query = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/api/auth/verify`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const { user } = await res.json();
      return user as User;
    },
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.status === "success") {
      setUser(query.data);
    }

    if (query.status === "error") {
      setUser(null);
    }
  }, [query.status, query.data, setUser]);

  return query;
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
      await queryClient.refetchQueries({
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
      username: string;
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
      await queryClient.refetchQueries({
        queryKey: ["auth", "verify"],
      });
    },
  });
};

// Logout
export const useLogout = () => {
  const { logOut } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/v1/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      logOut();
    },
  });
};
