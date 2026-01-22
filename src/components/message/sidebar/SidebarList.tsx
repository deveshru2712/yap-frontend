"use client";
import { useUserStore } from "@/stores/user-store";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchUsername } from "@/hooks/use-searchuser";
import SideBarListItem from "@/components/message/sidebar/SidebarListItem";

export default function SidebarList() {
  const { username } = useUserStore();
  const debouncedSearch = useDebounce(username || "");

  const {
    data: userList,
    isLoading,
    isFetching,
  } = useSearchUsername(debouncedSearch);

  if (!username?.trim()) {
    return null;
  }

  const isTyping = username !== debouncedSearch;

  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col gap-1">
        {isFetching || isTyping ? (
          <div className="text-muted-foreground text-sm">Searching...</div>
        ) : userList && userList.length > 0 ? (
          userList.map((userinfo) => (
            <SideBarListItem key={userinfo.id} {...userinfo} />
          ))
        ) : (
          <div>No users found for {debouncedSearch}</div>
        )}
      </div>
    </div>
  );
}
