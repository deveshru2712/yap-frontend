"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { useConversationStore } from "@/stores/conversation-store";
import { formatMessageTime } from "@/utils/formatMessageTime";

interface SideBarListItemProps {
  id?: string;
  name: string;
  avatar: string | null;
  latestMessage: string | null;
  conversationId: string | null;
  createdAt: string;
  type: "direct" | "group";
  onClick?: () => void;
}

export default function SideBarListItem({
  id,
  name,
  avatar,
  latestMessage,
  createdAt,
  onClick,
  type,
  conversationId,
}: SideBarListItemProps) {
  const { setconversationContext } = useConversationStore();

  const handleClick = () => {
    const data = {
      receiverId: id,
      name,
      avatar,
      type,
      conversationId,
    };
    // setting message context
    setconversationContext(data);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer rounded-sm bg-neutral-200/60 px-2 py-1 transition-colors hover:bg-neutral-300/60"
    >
      <div className="flex items-center gap-2">
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

        {/* Content */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col overflow-hidden items-start">
            <h4 className="truncate font-medium">{name}</h4>
            <p className="truncate text-sm text-neutral-600">{latestMessage}</p>
          </div>

          <div className="text-sm text-neutral-500">
            {formatMessageTime(createdAt)}
          </div>
        </div>
      </div>
    </button>
  );
}
