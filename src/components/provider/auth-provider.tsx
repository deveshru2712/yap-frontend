"use client";
import { useVerifySession } from "@/hooks/use-auth";
import Loader from "@/components/Loader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useVerifySession();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
