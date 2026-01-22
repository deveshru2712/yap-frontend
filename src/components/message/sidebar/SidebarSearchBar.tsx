"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/user-store";

export default function SidebarSearchBar() {
  const { username, setUsername } = useUserStore();

  return (
    <div className="w-full p-2">
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
