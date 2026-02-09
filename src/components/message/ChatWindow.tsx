"use client";
import ChatHeader from "@/components/message/chat-window/ChatHeader";
import MessageInput from "@/components/message/chat-window/MessageInput";
import MessageList from "@/components/message/chat-window/MessageList";
import { useMessageStore } from "@/stores/message-store";

export default function ChatWindow() {
  const { messageContext } = useMessageStore();

  return (
    <div className="flex flex-col overflow-hidden p-2 pt-0 md:col-span-2 md:pt-2">
      {messageContext.username ? (
        <div className="flex flex-col overflow-hidden px-2">
          {/* chat header */}
          <ChatHeader />
          {/* message list */}
          <MessageList />
          {/* message input */}
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
