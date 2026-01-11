"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useVerifySession } from "@/hooks/use-auth";
import Loader from "@/components/Loader";

const authRoutes = ["/sign-in", "/sign-up"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useVerifySession();

  const { isAuthenticated, hasCheckedAuthStatus } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedAuthStatus) return;

    if (pathname == "/") return;

    if (isAuthenticated && authRoutes.includes(pathname)) {
      router.replace("/message");
      return;
    }

    if (!isAuthenticated && !authRoutes.includes(pathname)) {
      router.replace("/sign-in");
    }
  }, [hasCheckedAuthStatus, isAuthenticated, pathname, router]);

  if (!hasCheckedAuthStatus) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
