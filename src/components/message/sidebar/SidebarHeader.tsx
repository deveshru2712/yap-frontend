import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/menu";

export default function SidebarHeader() {
  return (
    <div className="p-2 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/yap.png"} width={32} height={32} alt="JustYap" />
        <span className="text-base font-semibold text-neutral-900 md:text-lg">
          JustYap
        </span>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant={"outline"}
              className="py-1.5 border px-2 rounded-sm cursor-pointer"
            >
              <Menu className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent className="lg:mr-24 mr-4 ">
          <DropdownMenuGroup>
            <DropdownMenuItem>Create A Group</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
