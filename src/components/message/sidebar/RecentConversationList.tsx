"use client";

import { useEffect } from "react";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { useFetchRecentConversation } from "@/hooks/use-fetch-recent-conversation";
import { cn } from "@/lib/utils";
import { useRecentConversationStore } from "@/stores/recent-conversation-store";

interface RecentConversationListProps {
  className?: string;
}

export default function RecentConversationList({
  className,
}: RecentConversationListProps) {
  const recentConversation = useRecentConversationStore(
    (state) => state.recentConversation
  );

  const setRecentConversation = useRecentConversationStore(
    (state) => state.setRecentConversation
  );

  const { data, isFetching } = useFetchRecentConversation();

  const directUsers = data?.direct || [];
  const groups = data?.group || [];

  useEffect(() => {
    if (isFetching || recentConversation.length > 0) return;

    setRecentConversation([...directUsers, ...groups]);
  }, [
    isFetching,
    directUsers,
    groups,
    recentConversation,
    recentConversation.length,
    setRecentConversation,
  ]);

  const hasResults = recentConversation.length > 0;

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-10 mx-auto mt-1 w-[95%] rounded-sm border bg-white p-2 shadow-lg",
        "md:static md:w-full lg:border-none lg:shadow-none",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {isFetching ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
          </div>
        ) : hasResults ? (
          <div className="flex flex-col space-y-1">
            {recentConversation.map((item) => (
              <SideBarListItem
                key={item.conversationId}
                name={item.name}
                id={"userId" in item ? item.userId : undefined}
                avatar={item.avatar}
                conversationId={item.conversationId}
                createdAt={item.createdAt}
                latestMessage={item.latestMessage}
                type={item.type}
              />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground p-2 text-sm">
            No Recent Conversation.
          </div>
        )}
      </div>
    </div>
  );
}
