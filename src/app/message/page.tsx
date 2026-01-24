"use client";
import Loader from "@/components/Loader";
import ChatWindow from "@/components/message/ChatWindow";
import Sidebar from "@/components/message/Sidebar";
import { useSocket } from "@/hooks/use-socket";

export default function MessagePage() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <Loader />
        <span className="text-muted-foreground text-sm font-medium">
          Connecting...
        </span>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      {/* chat layout */}
      <main className="grid h-full w-full grid-cols-1 divide-x divide-neutral-200 md:grid-cols-3">
        {/* sidebar */}
        <Sidebar />
        {/* chat window */}
        <ChatWindow />
      </main>
    </div>
  );
}
