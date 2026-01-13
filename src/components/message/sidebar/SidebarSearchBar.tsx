import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SidebarSearchBar() {
  return (
    <div className="w-full p-2">
      <div className="flex w-full items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-neutral-700">
        <Search />
        <Input
          unstyled
          placeholder="search..."
          className="bg-transparent text-slate-800 **:data-[slot=input]:placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}
