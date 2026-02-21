"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { useConversationStore } from "@/stores/conversation-store";

export default function ChatHeader() {
  const { conversationContext } = useConversationStore();
  const { name, avatar } = conversationContext;
  return (
    <div className="w-full shrink-0 border-b p-1">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="h-10 aspect-square flex items-center justify-center rounded-full bg-neutral-100">
          {avatar ? (
            <Image
              src={avatar}
              alt="profile picture"
              className="object-cover"
            />
          ) : (
            <User size={20} />
          )}
        </div>

        {/* Username */}
        <h4 className="font-medium text-neutral-900">{name}</h4>
      </div>
    </div>
  );
}
