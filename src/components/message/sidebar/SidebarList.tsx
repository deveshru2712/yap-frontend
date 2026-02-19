"use client";

import { useEffect, useRef } from "react";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/hooks/use-searchuser";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/search-store";

interface SidebarListProps {
  className?: string;
  onClose: () => void;
}

export default function SidebarList({ className, onClose }: SidebarListProps) {
  const { query, searchResult: data } = useUserStore();
  const debouncedSearch = useDebounce(query || "");

  const { isFetching } = useSearch(debouncedSearch);

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

  // Default to empty arrays to prevent undefined errors
  const directUsers = data?.users ?? [];
  const groups = data?.groups ?? [];

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
                    <SideBarListItem
                      key={item.conversationId}
                      latestMessage="hi"
                      time={new Date("2026-01-01T00:00:00")}
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
                    <SideBarListItem
                      key={item.conversationId}
                      latestMessage="hi"
                      time={new Date("2026-01-01T00:00:00")}
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
