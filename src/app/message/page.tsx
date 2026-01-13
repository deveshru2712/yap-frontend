import ChatWindow from "@/components/message/ChatWindow";
import Sidebar from "@/components/message/Sidebar";

export default function MessagePage() {
  return (
    <div className="h-screen w-full">
      {/* chat layout */}
      <main className="grid h-full w-full grid-cols-1 divide-x divide-neutral-200 md:grid-cols-3">
        {/* sidebar */}
        <Sidebar />
        {/* chat windown */}
        <ChatWindow />
      </main>
    </div>
  );
}
