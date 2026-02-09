"use client";
import { useUserStore } from "@/stores/user-search-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchUsername } from "@/hooks/use-searchuser";
import { cn } from "@/lib/utils";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarListProps {
  className?: string;
  onClose: () => void;
}

export default function SidebarList({ className, onClose }: SidebarListProps) {
  const { searchUserName } = useUserStore();
  const debouncedSearch = useDebounce(searchUserName || "");
  const { data: userList, isFetching } = useSearchUsername(debouncedSearch);
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
  }, [onClose, !isMobile]);

  const isTyping = searchUserName !== debouncedSearch;

  const handleItemClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div
      ref={listRef}
      className={cn(
        "absolute inset-x-0 top-full z-10 mx-auto mt-1 w-[95%] rounded-sm border bg-white p-2 shadow-lg",
        "w-full lg:static lg:border-none lg:shadow-none",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        {isFetching || isTyping ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
          </div>
        ) : userList && userList.length > 0 ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            {userList.map((userinfo) => (
              <SideBarListItem
                key={userinfo.id}
                {...userinfo}
                onClick={handleItemClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground p-2 text-sm">
            No users found for "{debouncedSearch}"
          </div>
        )}
      </div>
    </div>
  );
}
