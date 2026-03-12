"use client";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/utils/formatMessageTime";
import { isMine } from "@/utils/isMine";

interface MessageBubbleProps {
  senderId: string;
  senderUserName: string;
  content: string;
  createdAt: string;
}

export default function MessageBubble({
  senderId,
  senderUserName,
  content,
  createdAt,
}: MessageBubbleProps) {
  const mine = isMine(senderId);

  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div className="flex max-w-[55%] flex-col gap-1">
        {/* Username (only show for other users) */}
        {!mine && (
          <span className="text-muted-foreground text-xs font-medium px-1">
            {senderUserName}
          </span>
        )}

        <div
          className={cn(
            "rounded-xl px-4 py-2 shadow-sm flex flex-col",
            mine
              ? "bg-muted text-foreground rounded-br-sm"
              : "rounded-bl-sm bg-blue-600 text-white"
          )}
        >
          <p className="text-sm leading-relaxed wrap-break-word">{content}</p>
        </div>

        <span
          className={cn(
            "text-muted-foreground text-[10px]",
            mine ? "self-end" : "self-start"
          )}
        >
          {formatMessageTime(createdAt)}
        </span>
      </div>
    </div>
  );
}
