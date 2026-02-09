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
    <main className="flex h-screen grid-cols-1 flex-col divide-x divide-neutral-200 md:grid md:grid-cols-3">
      {/* sidebar */}
      <Sidebar />
      {/* chat window */}
      <ChatWindow />
    </main>
  );
}
