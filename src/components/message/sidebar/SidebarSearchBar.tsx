"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/user-store";
import { cn } from "@/lib/utils";

interface SidebarSearchBarProps {
  className?: string;
}

export default function SidebarSearchBar({ className }: SidebarSearchBarProps) {
  const { username, setUsername } = useUserStore();

  return (
    <div className={cn("w-full p-2", className)}>
      <div className="flex w-full items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
        <Search />
        <Input
          unstyled
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="search..."
          className="bg-transparent text-slate-800 **:data-[slot=input]:placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}
