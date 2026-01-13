"use client";
import { useAuthStore } from "@/stores/auth-store";

export function isMine(userId: string): boolean {
  const { user } = useAuthStore();
  if (!user) return false;
  return user.id === userId;
}
