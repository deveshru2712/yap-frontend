"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import { useVerifySession } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores/auth-store";

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
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <Loader />
        <span className="text-muted-foreground text-sm font-medium">
          Loading...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
