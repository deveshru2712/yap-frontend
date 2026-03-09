"use client";

import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { useFetchRecentConversation } from "@/hooks/use-fetch-recent-conversation";
import { cn } from "@/lib/utils";

interface RecentConversationListProps {
  className?: string;
}

export default function RecentConversationList({
  className,
}: RecentConversationListProps) {
  const { data, isFetching } = useFetchRecentConversation();

  const directUsers = data?.direct ?? [];
  const groups = data?.group ?? [];

  const hasResults = directUsers.length > 0 || groups.length > 0;

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-10 mx-auto mt-1 w-[95%] rounded-sm border bg-white p-2 shadow-lg",
        "md:static md:w-full lg:border-none lg:shadow-none",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Loading */}
        {isFetching ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
          </div>
        ) : hasResults ? (
          <div className="flex flex-col space-y-1">
            {/* Users */}
            {directUsers.length > 0 && (
              <div className="flex flex-col">
                {/* <h3 className="text-muted-foreground p-1 text-sm">Users</h3> */}
                <div className="flex flex-col gap-0.5 rounded-md">
                  {directUsers.map((item) => (
                    // will think about it and fix this
                    <SideBarListItem
                      id={null}
                      key={item.conversationId}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Groups */}
            {groups.length > 0 && (
              <div className="flex flex-col">
                {/* <h3 className="text-muted-foreground p-1 text-sm">Groups</h3> */}
                <div className="flex flex-col gap-0.5 rounded-md">
                  {groups.map((item) => (
                    // will think about it and fix this
                    <SideBarListItem
                      id={null}
                      key={item.conversationId}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            )}
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
