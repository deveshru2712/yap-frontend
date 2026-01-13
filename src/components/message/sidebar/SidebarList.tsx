import UserListItem from "@/components/message/sidebar/SidebarListItem";

const UserListItemInfo = {
  username: "Jhon Doe",
  // profilePic: "test Image",
  latestMessage: "this is a dummy message",
  time: new Date("2026-01-01T00:00:00"),
};

export default function SidebarList() {
  return (
    <div className="flex-1 p-2">
      <UserListItem {...UserListItemInfo} />
    </div>
  );
}
