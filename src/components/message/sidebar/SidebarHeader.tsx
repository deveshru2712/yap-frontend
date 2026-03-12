import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogOutButton from "@/components/LogOutButton";
import FloatingMenu from "@/components/message/sidebar/FloatingMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/menu";

export default function SidebarHeader() {
  return (
    <Dialog>
      <div className="p-2 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/yap.png" width={32} height={32} alt="JustYap" />
          <span className="text-base font-semibold text-neutral-900 md:text-lg">
            JustYap
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="py-1.5 border px-2 rounded-sm cursor-pointer"
                >
                  <Menu className="size-4" />
                </Button>
              }
            />

            <DropdownMenuContent className="lg:mr-24 mr-4">
              <DropdownMenuGroup>
                {/* Create Group */}
                <DialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className="border-none shadow-none rounded-md w-full"
                    >
                      Create A Group
                    </Button>
                  }
                />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <LogOutButton />
        </div>
      </div>

      <DialogContent className="sm:max-w-md overflow-hidden border-muted shadow rounded-lg">
        <DialogHeader className="pt-4 pb-0 px-4">
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        {/* floating menu to create a group */}
        <FloatingMenu />
      </DialogContent>
    </Dialog>
  );
}
