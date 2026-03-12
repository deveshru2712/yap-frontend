"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  const { setconversationContext, conversationContext } =
    useConversationStore();

  const handleClick = () => {
    const data = {
      receiverId: id,
      name,
      avatar,
      type,
      conversationId,
    };

    setconversationContext(data);
    onClick?.();
  };

  const isActive = conversationContext.name === name;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full cursor-pointer rounded-md px-3 py-2 transition-colors duration-200",
        "bg-white hover:bg-blue-50",
        isActive && "bg-blue-600 hover:bg-blue-700 transition-all duration-200"
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
        </div>

        {/* Content */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col overflow-hidden items-start">
            <h4
              className={cn(
                "truncate font-medium lg:text-base text-sm",
                isActive ? "text-white" : "text-neutral-900"
              )}
            >
              {name}
            </h4>

            <p
              className={cn(
                "truncate lg:text-sm text-xs",
                isActive ? "text-blue-200" : "text-neutral-600"
              )}
            >
              {latestMessage ? latestMessage.slice(0, 15) : "Say hi 👋"}
            </p>
          </div>

          <div
            className={cn(
              "text-[10px]",
              isActive ? "text-blue-200" : "text-neutral-500"
            )}
          >
            {formatMessageTime(createdAt)}
          </div>
        </div>
      </div>
    </button>
  );
}
