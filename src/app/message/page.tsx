"use client";

import { useEffect } from "react";
import Loader from "@/components/Loader";
import ChatWindow from "@/components/message/ChatWindow";
import Sidebar from "@/components/message/Sidebar";
import { useSocket } from "@/hooks/use-socket";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";
import { useRecentConversationStore } from "@/stores/recent-conversation-store";

export default function MessagePage() {
  const { isConnected, socket } = useSocket();
  const { addMessage } = useMessageStore();
  const { conversationContext } = useConversationStore();
  const { updateRecentConversation } = useRecentConversationStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: SocketMessageData) => {
      updateRecentConversation(message);

      if (message.conversationId === conversationContext.conversationId) {
        addMessage(message);
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [
    socket,
    addMessage,
    conversationContext.conversationId,
    updateRecentConversation,
  ]);

  return (
    <main className="relative flex h-screen grid-cols-1 flex-col divide-x divide-neutral-200 md:grid md:grid-cols-3">
      <Sidebar />
      <ChatWindow />

      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader />
            <span className="text-muted-foreground text-sm font-medium">
              Connecting...
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
