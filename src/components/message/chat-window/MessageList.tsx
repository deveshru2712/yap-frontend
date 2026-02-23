"use client";

import { useEffect } from "react";
import MessageBubble from "@/components/message/chat-window/MessageBubble";
import { useFetchMessage } from "@/hooks/use-fetch-message";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";

export default function MessageList() {
  const { conversationContext } = useConversationStore();
  const { messages, setMessages } = useMessageStore();
  const { data } = useFetchMessage(conversationContext.conversationId);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data, setMessages]);

  return (
    <div className="my-2 min-h-0 flex-1 overflow-y-auto">
      <div className="flex flex-col gap-2 pb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>
    </div>
  );
}
