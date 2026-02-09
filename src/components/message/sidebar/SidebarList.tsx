"use client";
import { useUserStore } from "@/stores/user-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchUsername } from "@/hooks/use-searchuser";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";
import { cn } from "@/lib/utils";

interface SidebarListProps {
  className: string;
}

export default function SidebarList({ className }: SidebarListProps) {
  const { username } = useUserStore();
  const debouncedSearch = useDebounce(username || "");

  const { data: userList, isFetching } = useSearchUsername(debouncedSearch);
  if (!username?.trim()) {
    return null;
  }

  const isTyping = username !== debouncedSearch;

  return (
    <div className={cn("flex-1 border bg-white p-2", className)}>
      <div className="flex flex-col gap-1">
        {isFetching || isTyping ? (
          <div className="text-muted-foreground py-1 font-medium">
            Searching...
          </div>
        ) : userList && userList.length > 0 ? (
          userList.map((userinfo) => (
            <SideBarListItem key={userinfo.id} {...userinfo} />
          ))
        ) : (
          <div className="">No users found for {debouncedSearch}</div>
        )}
      </div>
    </div>
  );
}
