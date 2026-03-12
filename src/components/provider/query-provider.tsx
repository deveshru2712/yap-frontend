"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

function is401(error: unknown) {
  return error instanceof Error && (error as any).status === 401;
}

function redirectToLogin() {
  const authRoutes = ["/sign-in", "/sign-up"];

  if (!authRoutes.includes(window.location.pathname)) {
    window.location.href = "/sign-in";
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (is401(error)) {
              useAuthStore.getState().logOut(); // ✅ safe
              redirectToLogin();
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (is401(error)) {
              useAuthStore.getState().logOut(); // ✅ safe
              redirectToLogin();
            }
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (is401(error)) return false;
              return failureCount < 1;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
