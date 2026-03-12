"use client";
import { useEffect, useState } from "react";
import RecentConversationList from "@/components/message/sidebar/RecentConversationList";
import SearchConversationList from "@/components/message/sidebar/SearchConversationList";
import SidebarHeader from "@/components/message/sidebar/SidebarHeader";
import SidebarSearchBar from "@/components/message/sidebar/SidebarSearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/stores/conversation-store";
import { useUserSearchStore } from "@/stores/search-store";

export default function Sidebar() {
  const [showList, setShowList] = useState(false);
  const { query } = useUserSearchStore();
  const { conversationContext } = useConversationStore();
  const isMobile = useIsMobile();

  const name = conversationContext?.name;

  useEffect(() => {
    if (name && isMobile) {
      setShowList(false);
    }
  }, [name, isMobile]);

  return (
    <div className="relative md:flex h-fit w-full flex-col px-2 pt-2 pb-0 md:h-full md:pb-2">
      {/* sidebar header */}
      <SidebarHeader />

      {/* searchbar */}
      <SidebarSearchBar onFocus={() => setShowList(true)} />

      {/* List Section */}
      {showList && query?.trim() ? (
        <SearchConversationList onClose={() => setShowList(false)} />
      ) : (
        <RecentConversationList className={cn(name && isMobile && "hidden")} />
      )}
    </div>
  );
}
