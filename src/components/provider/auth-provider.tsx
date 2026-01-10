"use client";
import { useVerifySession } from "@/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useVerifySession();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
