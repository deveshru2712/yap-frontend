import SidebarHeader from "@/components/message/sidebar/SidebarHeader";
import SidebarList from "@/components/message/sidebar/SidebarList";
import SidebarSearchBar from "@/components/message/sidebar/SidebarSearchBar";

export default function Sidebar() {
  return (
    <div className="relative flex h-fit w-full flex-col px-2 pt-2 pb-0 md:h-full md:pb-2">
      {/* sidebar header */}
      <SidebarHeader />
      {/* searchbar */}
      <SidebarSearchBar />
      {/* List Section - Scrollable */}
      <SidebarList className="absolute inset-x-0 -bottom-12 z-10 mx-auto w-[92%] rounded-md md:block" />
    </div>
  );
}
