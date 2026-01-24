import ChatHeader from "@/components/message/chat-window/ChatHeader";
import MessageInput from "@/components/message/chat-window/MessageInput";
import MessageList from "@/components/message/chat-window/MessageList";

export default function ChatWindow() {
  return (
    <div className="flex h-screen flex-col px-4 py-3 md:col-span-2">
      {/* header */}
      <ChatHeader username="Jhone Doe" />

      {/* messages */}
      <MessageList />

      {/* input */}
      <MessageInput />
    </div>
  );
}
