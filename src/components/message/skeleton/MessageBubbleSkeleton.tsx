"use client";
import { cn } from "@/lib/utils";

interface MessageBubbleSkeletonProps {
  mine?: boolean;
}

export default function MessageBubbleSkeleton({
  mine = false,
}: MessageBubbleSkeletonProps) {
  return (
    <div className={cn("flex w-full", mine ? "justify-end" : "justify-start")}>
      <div className="flex max-w-[75%] flex-col gap-1">
        <div
          className={cn(
            "rounded-xl px-4 py-2 flex flex-col gap-2",
            mine ? "bg-muted rounded-br-sm" : "bg-blue-600/90 rounded-bl-sm"
          )}
        >
          <div
            className={cn(
              "h-3 w-40 animate-pulse rounded",
              mine ? "bg-muted-foreground/20" : "bg-white/40"
            )}
          />
          <div
            className={cn(
              "h-3 w-28 animate-pulse rounded",
              mine ? "bg-muted-foreground/20" : "bg-white/40"
            )}
          />
        </div>

        <div
          className={cn(
            "h-2 w-10 animate-pulse self-end rounded",
            mine ? "bg-muted-foreground/20" : "bg-blue-400/90"
          )}
        />
      </div>
    </div>
  );
}
