"use client";

import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/stores/conversation-store";
import { useStatusStore } from "@/stores/status-store";

export default function ChatHeader() {
  const { conversationContext, resetconversationContext } =
    useConversationStore();

  const onlineUsers = useStatusStore((s) => s.onlineUsers);
  const typingUsers = useStatusStore((s) => s.typingUsers);

  const { name, avatar, receiverId, type } = conversationContext;

  const isMobile = useIsMobile();

  const handleBack = () => {
    resetconversationContext();
  };

  const isOnline = receiverId ? onlineUsers.has(receiverId) : false;
  const isTyping = receiverId ? typingUsers.has(receiverId) : false;

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex items-center px-2 h-14">
        {isMobile && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center rounded-full hover:bg-neutral-100 transition mr-2 p-2"
          >
            <ArrowLeft className="size-4 text-neutral-700" />
          </button>
        )}

        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-100">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${name} avatar`}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User size={18} className="text-neutral-500" />
              </div>
            )}

            {type === "direct" && isOnline && (
              <span className="absolute bottom-1.5 right-2 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
            )}
          </div>

          {/* Name + typing */}
          <div className="flex flex-col leading-tight">
            <h3 className="text-sm font-semibold text-neutral-900 truncate">
              {name}
            </h3>

            {/* reserved line prevents layout shift */}
            <span
              className={cn(
                "text-xs text-neutral-500 transition-opacity",
                isTyping ? "opacity-100" : "opacity-0"
              )}
            >
              typing...
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
