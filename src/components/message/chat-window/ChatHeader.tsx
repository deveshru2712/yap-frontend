import { User } from "lucide-react";
import Image from "next/image";

interface ChatHeaderProps {
  username: string;
  profilePic?: string;
}

export default function ChatHeader({ username, profilePic }: ChatHeaderProps) {
  return (
    <div className="w-full border-b px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
          {profilePic ? (
            <Image
              src={profilePic}
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <User size={20} />
          )}
        </div>

        {/* Username */}
        <h4 className="font-medium text-neutral-900">{username}</h4>
      </div>
    </div>
  );
}
