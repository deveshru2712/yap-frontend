"use client";
import { useMessageStore } from "@/stores/message-store";
import { formatMessageTime } from "@/utils/formatMessageTime";
import { User } from "lucide-react";
import Image from "next/image";

interface UserListItemProps {
  username: string;
  profilepic?: string;
  latestMessage: string;
  time: Date;
}

export default function SideBarListItem({
  username,
  profilepic,
  latestMessage = "hi",
  time = new Date("2026-01-01T00:00:00"),
}: UserListItemProps) {
  const { setMessageContext } = useMessageStore();

  return (
    <button
      onClick={() => setMessageContext({ username, profilepic })}
      className="w-full cursor-pointer rounded-sm bg-neutral-200/60 px-2 py-1"
    >
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full bg-neutral-100">
          {profilepic ? (
            <Image
              src={profilepic}
              alt="profile picture"
              height={24}
              width={24}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <User size={20} />
          )}
        </div>

        {/* Content */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col overflow-hidden">
            <h4 className="truncate font-medium">{username}</h4>
            <p className="truncate text-sm">{latestMessage}</p>
          </div>

          <div className="text-sm font-medium text-neutral-700">
            {formatMessageTime(time)}
          </div>
        </div>
      </div>
    </button>
  );
}
