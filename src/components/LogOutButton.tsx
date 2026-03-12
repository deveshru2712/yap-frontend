"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";

export default function LogOutButton() {
  const { mutate: logOut } = useLogout();
  return (
    <Button variant={"outline"} onClick={() => logOut()}>
      <LogOut className="size-4" />
    </Button>
  );
}
