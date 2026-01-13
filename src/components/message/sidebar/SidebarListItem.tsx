import { formatMessageTime } from "@/utils/formatMessageTime";
import { User } from "lucide-react";
import Image from "next/image";

interface UserListItemProps {
  username: string;
  profilePic?: string;
  latestMessage: string;
  time: Date;
}

export default function UserListItem({
  username,
  profilePic,
  latestMessage,
  time,
}: UserListItemProps) {
  return (
    <div className="w-full rounded-sm bg-neutral-200/60 px-2 py-1">
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full bg-neutral-100 p-4">
          {profilePic ? (
            <Image
              src={profilePic}
              alt="profile picture"
              height={24}
              width={24}
              className="rounded-full"
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
    </div>
  );
}
