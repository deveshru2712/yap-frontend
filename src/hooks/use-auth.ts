"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchWithError } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

export const useVerifySession = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: async () => {
      const data = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth/verify`,
        { credentials: "include" }
      );
      return data.user as User;
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

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const error = await res.json();

        const err = new Error(error.message || "Login failed") as Error & {
          status: number;
        };

        err.status = res.status;
        throw err;
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

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      username: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const error = await res.json();

        const err = new Error(error.message || "Signup failed") as Error & {
          status: number;
        };

        err.status = res.status;
        throw err;
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

export const useLogout = () => {
  const logOut = useAuthStore((s) => s.logOut);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth/logout`,
        { method: "POST", credentials: "include" }
      );
      return;
    },
    onSuccess: async () => {
      logOut();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
