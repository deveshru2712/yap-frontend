import SidebarHeader from "@/components/message/sidebar/SidebarHeader";
import SidebarList from "@/components/message/sidebar/SidebarList";
import SidebarSearchBar from "@/components/message/sidebar/SidebarSearchBar";

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col p-2">
      {/* sidebar header */}
      <SidebarHeader />
      {/* searchbar */}
      <SidebarSearchBar />
      {/* list display data based on mode */}
      <SidebarList />
    </div>
  );
}
