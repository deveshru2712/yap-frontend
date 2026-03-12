"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStatusStore } from "@/stores/status-store";

interface FloatingMenuListItemProps {
  id: string;
  name: string;
  avatar: string | null;
  type: "direct" | "group";
  conversationId: string | null;
  onclick: () => void;
}

export default function FloatingMenuListItem({
  id,
  name,
  avatar,
  type,
  onclick,
}: FloatingMenuListItemProps) {
  const { onlineUsers } = useStatusStore();

  const isOnline = id ? onlineUsers.has(id) : false;

  return (
    <button
      onClick={onclick}
      className={cn(
        "w-full cursor-pointer border-none rounded-md px-3 py-2 transition-all duration-200",
        "bg-white hover:bg-blue-50"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt="profile picture"
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="size-5 text-neutral-600" />
            </div>
          )}

          {/* Online indicator */}
          {type === "direct" && isOnline && (
            <span className="absolute bottom-1.5 right-2 animate-pulse h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>

        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col overflow-hidden items-start">
            <h4 className={cn("truncate font-medium lg:text-base text-sm")}>
              {name}
            </h4>
          </div>
        </div>
      </div>
    </button>
  );
}
