"use client";

import { useEffect, useRef } from "react";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/hooks/use-search-query";
import { cn } from "@/lib/utils";
import { useUserSearchStore } from "@/stores/search-store";

interface SearchConversationListProps {
  className?: string;
  onClose: () => void;
}

export default function SearchConversationList({
  className,
  onClose,
}: SearchConversationListProps) {
  const { query } = useUserSearchStore();
  const debouncedSearch = useDebounce(query || "");

  const { data, isFetching } = useSearch(debouncedSearch);

  const listRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (listRef.current && !listRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onClose, isMobile]);

  const isTyping = query !== debouncedSearch;

  const handleItemClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const directUsers = data?.direct ?? [];
  const groups = data?.group ?? [];

  const hasResults = directUsers.length > 0 || groups.length > 0;

  return (
    <div
      ref={listRef}
      className={cn(
        "absolute inset-x-0 top-full z-10 mx-auto mt-1 w-[95%] rounded-sm border bg-white p-2 shadow-lg",
        "md:static md:w-full lg:border-none lg:shadow-none",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Loading */}
        {isFetching || isTyping ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
          </div>
        ) : hasResults ? (
          <div className="flex flex-col">
            {/* Users */}
            {directUsers.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-muted-foreground p-1 text-sm">Users</h3>
                <div className="flex flex-col gap-0.5 rounded-md">
                  {directUsers.map((item) => (
                    // will think about it and fix this
                    <SideBarListItem
                      id={null}
                      key={item.conversationId}
                      {...item}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Groups */}
            {groups.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-muted-foreground p-1 text-sm">Groups</h3>
                <div className="flex flex-col gap-0.5 rounded-md">
                  {groups.map((item) => (
                    // will think about it and fix this
                    <SideBarListItem
                      id={null}
                      key={item.conversationId}
                      {...item}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground p-2 text-sm">
            No results found for "{debouncedSearch}"
          </div>
        )}
      </div>
    </div>
  );
}
