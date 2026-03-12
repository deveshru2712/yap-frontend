"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FloatingMenuListItem from "@/components/message/sidebar/FloatingMenuListItem";
import SidebarListItemSkeleton from "@/components/message/skeleton/SidebarListItemSkeleton";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateGroup } from "@/hooks/use-create-group";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearch } from "@/hooks/use-search-query";
import { useRecentConversationStore } from "@/stores/recent-conversation-store";

export default function FloatingMenu() {
  const [query, setQuery] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);

  const { mutate: createGroup } = useCreateGroup();
  const { setRecentConversation } = useRecentConversationStore();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // ref used to close dialog programmatically
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const debouncedSearch = useDebounce(query);
  const { data, isFetching } = useSearch(debouncedSearch);

  const directUsers: DirectConversation[] = data?.direct ?? [];

  const isCreateDisabled = members.length < 1 || groupName.trim() === "";
  const showResults = query.trim().length > 0;

  const addMember = (user: DirectConversation) => {
    if (members.some((m) => m.userId === user.userId)) return;

    setMembers((prev) => [
      ...prev,
      {
        userId: user.userId,
        name: user.name,
      },
    ]);

    setQuery("");
  };

  const removeMember = (userId: string) => {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
  };

  const handleCreateGroup = () => {
    const payload = {
      name: groupName.trim(),
      userId: members.map((m) => m.userId),
    };

    createGroup(payload, {
      onSuccess: (data) => {
        setRecentConversation(data);

        // reset form
        setMembers([]);
        setGroupName("");
        setQuery("");

        // close dialog
        closeRef.current?.click();
      },
    });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* hidden dialog close trigger */}
      <DialogClose ref={closeRef} className="hidden" />

      {/* Group Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Group Name
        </Label>

        <Input
          placeholder="My group..."
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      {/* Group Image */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-muted-foreground">
          Group Image
        </Label>

        <div className="flex items-center justify-center h-28 w-full rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 hover:bg-muted cursor-pointer">
          <span className="text-sm text-muted-foreground">
            Image upload feature coming soon
          </span>
        </div>
      </div>

      {/* Add Members */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          Add Members
        </Label>

        <div className="min-h-36 flex w-full flex-col">
          {members.length > 0 && (
            <div className="flex flex-wrap gap-2 m-2">
              {members.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm"
                >
                  {member.name}

                  <button
                    onClick={() => removeMember(member.userId)}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search */}
          <div ref={containerRef} className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
            />

            {showResults && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-40 overflow-y-auto rounded-md border bg-background shadow-md z-50">
                {isFetching ? (
                  <div className="p-1 space-y-1">
                    <SidebarListItemSkeleton />
                    <SidebarListItemSkeleton />
                    <SidebarListItemSkeleton />
                  </div>
                ) : debouncedSearch.length > 0 && directUsers.length > 0 ? (
                  <div className="flex flex-col space-y-1 p-1">
                    {directUsers.map((user) => {
                      if (members.some((m) => m.userId === user.userId))
                        return null;

                      return (
                        <FloatingMenuListItem
                          key={user.userId}
                          id={user.userId}
                          {...user}
                          onclick={() => addMember(user)}
                        />
                      );
                    })}
                  </div>
                ) : debouncedSearch.length > 0 ? (
                  <div className="text-muted-foreground text-sm p-2">
                    No results found for "{debouncedSearch}"
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <DialogClose
          render={
            <button className="text-sm px-3 py-2 rounded-md border hover:bg-muted">
              Cancel
            </button>
          }
        />
        <button
          disabled={isCreateDisabled}
          onClick={handleCreateGroup}
          className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Group ({members.length})
        </button>
      </div>
    </div>
  );
}
