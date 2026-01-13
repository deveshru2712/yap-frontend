import ChatHeader from "@/components/message/chat-window/ChatHeader";
import MessageList from "@/components/message/chat-window/MessageList";
import MessageInput from "@/components/message/chat-window/MessageInput";

export default function ChatWindow() {
  return (
    <div className="relative flex h-full min-h-screen flex-col p-2 md:col-span-2">
      {/* header used to show the receiver info */}
      <ChatHeader username={"Jhone Doe"} />
      {/* display the messages */}
      <MessageList />
      {/* input field */}
      <MessageInput />
    </div>
  );
}
