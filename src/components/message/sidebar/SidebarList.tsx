"use client";

import { useEffect, useRef } from "react";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchUsername } from "@/hooks/use-searchuser";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-search-store";

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
  }, [onClose, isMobile]);

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
        "md:static md:w-full lg:border-none lg:shadow-none",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Loading State */}
        {isFetching || isTyping ? (
          <div className="flex flex-col gap-0.5 rounded-md">
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
            <SidebarListItemSkeleton />
          </div>
        ) : userList &&
          (userList.users.length > 0 || userList.groups.length > 0) ? (
          <div className="flex flex-col">
            {/* Users Section */}
            {userList.users.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-muted-foreground p-1 text-sm">Users</h3>
                <div className="flex flex-col gap-0.5 rounded-md">
                  {userList!.users.map((userinfo) => (
                    <SideBarListItem
                      key={userinfo.id}
                      {...userinfo}
                      onClick={handleItemClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Groups Section */}
            {userList.groups.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-muted-foreground p-1 text-sm">Groups</h3>
                <div className="flex flex-col gap-0.5 rounded-md">
                  {userList!.groups.map((groupinfo) => (
                    <SideBarListItem
                      key={groupinfo.id}
                      {...groupinfo}
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
