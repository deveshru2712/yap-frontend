"use client";
import { useState } from "react";
import SidebarHeader from "@/components/message/sidebar/SidebarHeader";
import SidebarList from "@/components/message/sidebar/SidebarList";
import SidebarSearchBar from "@/components/message/sidebar/SidebarSearchBar";
import { useUserStore } from "@/stores/user-search-store";

export default function Sidebar() {
  const [showList, setShowList] = useState(false);
  const { searchUserName } = useUserStore();

  return (
    <div className="relative flex h-fit w-full flex-col px-2 pt-2 pb-0 md:h-full md:pb-2">
      {/* sidebar header */}
      <SidebarHeader />

      {/* searchbar */}
      <SidebarSearchBar onFocus={() => setShowList(true)} />

      {/* List Section - Scrollable */}
      {showList && searchUserName?.trim() && (
        <SidebarList onClose={() => setShowList(false)} />
      )}
    </div>
  );
}
