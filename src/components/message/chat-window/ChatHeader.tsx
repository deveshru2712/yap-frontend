"use client";
import { User } from "lucide-react";
import Image from "next/image";
import { useMessageStore } from "@/stores/message-store";

export default function ChatHeader() {
  const { messageContext } = useMessageStore();
  const { username, profilepic } = messageContext;
  return (
    <div className="w-full shrink-0 border-b p-1">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full bg-neutral-100">
          {profilepic ? (
            <Image
              src={profilepic}
              alt="profile picture"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full object-cover"
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
