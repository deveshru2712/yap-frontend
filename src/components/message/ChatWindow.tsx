"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ChatHeader from "@/components/message/chat-window/ChatHeader";
import MessageInput from "@/components/message/chat-window/MessageInput";
import MessageList from "@/components/message/chat-window/MessageList";
import { useSocket } from "@/hooks/use-socket";
import { useConversationStore } from "@/stores/conversation-store";

export default function ChatWindow() {
  const { conversationContext } = useConversationStore();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(
        ["messages", message.conversationId],
        (old: Message[] | undefined) => (old ? [...old, message] : [message])
      );
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, queryClient]);

  return (
    <div className="flex h-full flex-col overflow-hidden p-2 pt-0 md:col-span-2 md:pt-2">
      {conversationContext.name ? (
        <div className="flex flex-1 flex-col overflow-hidden px-2">
          <ChatHeader />
          <MessageList />
          <MessageInput />
        </div>
      ) : (
        <div className="text-muted-foreground flex h-screen w-full flex-col items-center justify-center text-center">
          <h2 className="text-foreground mb-2 text-xl font-semibold">
            Get started chatting 💬
          </h2>
          <p className="max-w-62.5 text-sm">
            Select a conversation or start a new one to begin chatting.
          </p>
        </div>
      )}
    </div>
  );
}
