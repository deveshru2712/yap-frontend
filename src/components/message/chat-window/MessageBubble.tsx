"use client";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/utils/formatMessageTime";
import { isMine } from "@/utils/isMine";

interface MessageBubbleProps {
  userId: string;
  message: string;
  time: Date;
}

export default function MessageBubble({
  userId,
  message,
  time,
}: MessageBubbleProps) {
  const mine = isMine(userId);

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
          <p className="text-sm leading-relaxed wrap-break-word">{message}</p>
        </div>

        <span className="text-muted-foreground self-end text-[10px]">
          {formatMessageTime(time)}
        </span>
      </div>
    </div>
  );
}
