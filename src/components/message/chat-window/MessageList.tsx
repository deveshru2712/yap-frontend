"use client";
import MessageBubble from "@/components/message/chat-window/MessageBubble";
import { useFetchMessage } from "@/hooks/use-fetch-message";
import { useConversationStore } from "@/stores/conversation-store";

export default function MessageList() {
  const { conversationContext } = useConversationStore();
  const { data: messages } = useFetchMessage(
    conversationContext.conversationId
  );
  return (
    <div className="my-2 min-h-0 flex-1 overflow-y-auto">
      <div className="flex flex-col gap-2 pb-4">
        {messages?.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>
    </div>
  );
}
