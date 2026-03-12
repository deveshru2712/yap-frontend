"use client";

import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useConversationStore } from "@/stores/conversation-store";

export default function ChatHeader() {
  const { conversationContext, resetconversationContext } =
    useConversationStore();

  const { name, avatar } = conversationContext;
  const isMobile = useIsMobile();

  const handleBack = () => {
    resetconversationContext();
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="flex items-center px-0.5 h-14">
        {/* Back Button */}
        {isMobile && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center rounded-full hover:bg-neutral-100 transition mr-2"
          >
            <ArrowLeft className="size-4 text-neutral-700" />
          </button>
        )}

        {/* Avatar + Name Group */}
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
          </div>

          {/* User Info */}
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold text-neutral-900 truncate">
              {name}
            </p>
            <span className="text-xs text-neutral-500">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
