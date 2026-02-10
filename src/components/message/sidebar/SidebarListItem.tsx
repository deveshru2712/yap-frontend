"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { useMessageStore } from "@/stores/message-store";
import { formatMessageTime } from "@/utils/formatMessageTime";

interface UserListItemProps {
  username: string;
  profilepic?: string;
  latestMessage: string;
  time: Date;
  onClick: () => void;
}

export default function SideBarListItem({
  username,
  profilepic,
  latestMessage = "hi",
  time = new Date("2026-01-01T00:00:00"),
  onClick,
}: UserListItemProps) {
  const { setMessageContext } = useMessageStore();

  const handleClick = () => {
    setMessageContext({ username, profilepic });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer rounded-sm bg-neutral-200/60 px-2 py-1 transition-colors hover:bg-neutral-300/60"
    >
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full bg-neutral-100">
          {profilepic ? (
            <Image
              src={profilepic}
              alt="profile picture"
              height={40}
              width={40}
              className="size-10 rounded-full object-cover"
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
