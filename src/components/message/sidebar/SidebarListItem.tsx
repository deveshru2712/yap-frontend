"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { useMessageStore } from "@/stores/message-store";
import { formatMessageTime } from "@/utils/formatMessageTime";

interface UserListItemProps {
  username: string;
  avatar?: string;
  latestMessage: string;
  time: Date;
  onClick: () => void;
}

export default function SideBarListItem({
  username,
  avatar,
  latestMessage = "hi",
  time = new Date("2026-01-01T00:00:00"),
  onClick,
}: UserListItemProps) {
  const { setMessageContext } = useMessageStore();

  const handleClick = () => {
    setMessageContext({ username, avatar });
    onClick();
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
          <div className="flex flex-col overflow-hidden">
            <h4 className="truncate font-medium">{username}</h4>
            <p className="truncate text-sm text-neutral-600">{latestMessage}</p>
          </div>

          <div className="text-sm font-medium text-neutral-700">
            {formatMessageTime(time)}
          </div>
        </div>
      </div>
    </button>
  );
}
