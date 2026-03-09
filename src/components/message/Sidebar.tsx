"use client";
import { useState } from "react";
import RecentConversationList from "@/components/message/sidebar/RecentConversationList";
import SearchConversationList from "@/components/message/sidebar/SearchConversationList";
import SidebarHeader from "@/components/message/sidebar/SidebarHeader";
import SidebarSearchBar from "@/components/message/sidebar/SidebarSearchBar";
import { useUserSearchStore } from "@/stores/search-store";

export default function Sidebar() {
  const [showList, setShowList] = useState(false);
  const { query } = useUserSearchStore();

  return (
    <div className="relative flex h-fit w-full flex-col px-2 pt-2 pb-0 md:h-full md:pb-2">
      {/* sidebar header */}
      <SidebarHeader />

      {/* searchbar */}
      <SidebarSearchBar onFocus={() => setShowList(true)} />

      {/* List Section - Scrollable */}
      {showList && query?.trim() ? (
        <SearchConversationList onClose={() => setShowList(false)} />
      ) : (
        <RecentConversationList />
      )}
    </div>
  );
}
