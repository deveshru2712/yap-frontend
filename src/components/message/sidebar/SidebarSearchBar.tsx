"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-search-store";

interface SidebarSearchBarProps {
  className?: string;
  onFocus?: () => void;
}

export default function SidebarSearchBar({
  className,
  onFocus,
}: SidebarSearchBarProps) {
  const { searchUserName, setSearchUserName, clearSearchUserName } =
    useUserStore();

  return (
    <div className={cn("w-full p-1", className)}>
      <div className="flex w-full items-center justify-between gap-1 rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
        <div className="flex flex-1 items-center">
          <Search />
          <Input
            unstyled
            type="text"
            value={searchUserName || ""}
            onChange={(e) => {
              setSearchUserName(e.target.value);
              onFocus?.();
            }}
            onFocus={onFocus}
            placeholder="search..."
            className="w-full flex-1 bg-transparent text-slate-800 **:data-[slot=input]:placeholder:text-slate-600"
          />
        </div>

        {/* clear search button */}
        <button
          onClick={() => clearSearchUserName()}
          className="cursor-pointer rounded-full p-0.5 hover:bg-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
