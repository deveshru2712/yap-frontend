"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger, MenuPopup } from "@/components/ui/menu";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/hooks/use-auth";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: logOut } = useLogout();
  const profilePhoto = "";

  return (
    <nav className="w-full py-2">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/yap.png"} width={32} height={32} alt="JustYap" />
          <span className="text-base font-semibold text-white md:text-lg">
            JustYap
          </span>
        </Link>

        <div>
          {!isAuthenticated ? (
            <div>
              {/* Mobile: Single button */}
              <Button
                variant={"default"}
                className="rounded-sm border-none bg-blue-500 text-sm text-white hover:bg-blue-500/80 sm:hidden"
              >
                Get Started
              </Button>

              {/* Desktop: Both buttons */}
              <div className="hidden gap-2 sm:flex">
                <Link href={"/sign-in"}>
                  <Button
                    variant={"outline"}
                    className="rounded-sm border-slate-400 bg-transparent text-white"
                  >
                    Login
                  </Button>
                </Link>

                <Link href={"/sign-up"}>
                  <Button
                    variant={"default"}
                    className="rounded-sm border-none bg-blue-500 text-white hover:bg-blue-500/80"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Menu>
              <MenuTrigger
                render={
                  <Button
                    variant={"outline"}
                    className="rounded-sm border-slate-300 bg-transparent py-4 text-white"
                  />
                }
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt="profile photo"
                      height={24}
                      width={24}
                    />
                  ) : (
                    <User />
                  )}
                </div>

                <span>{user?.userName}</span>
              </MenuTrigger>
              <MenuPopup>
                <MenuItem>Profile Settings</MenuItem>
                <MenuItem
                  onClick={() => logOut()}
                  className="group flex items-center justify-between gap-2"
                >
                  Logout
                  <LogOut className="h-4 w-4 translate-x-1 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                </MenuItem>
              </MenuPopup>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}
