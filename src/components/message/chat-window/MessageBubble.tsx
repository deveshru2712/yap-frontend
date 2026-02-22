"use client";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/utils/formatMessageTime";
import { isMine } from "@/utils/isMine";

interface MessageBubbleProps {
  senderId: string;
  content: string;
  createdAt: string;
}

export default function MessageBubble({
  senderId,
  content,
  createdAt,
}: MessageBubbleProps) {
  const mine = isMine(senderId);

  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div className="flex max-w-[75%] flex-col gap-1">
        <div
          className={cn(
            "rounded-xl px-4 py-2 shadow-sm",
            "flex flex-col",
            mine
              ? "bg-muted text-foreground rounded-br-sm"
              : "rounded-bl-sm bg-blue-600 text-white"
          )}
        >
          <p className="text-sm leading-relaxed wrap-break-word">{content}</p>
        </div>

        <span className="text-muted-foreground self-end text-[10px]">
          {formatMessageTime(createdAt)}
        </span>
      </div>
    </div>
  );
}
