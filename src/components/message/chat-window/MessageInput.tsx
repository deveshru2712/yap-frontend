"use client";
import { Send } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSendDirectMessage } from "@/hooks/use-send-direct-message";
import { useSendGroupMessage } from "@/hooks/use-send-group-message";

import { useAuthStore } from "@/stores/auth-store";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";
import { useSocketStore } from "@/stores/socket-store";

export default function MessageInput() {
  const [content, setContent] = useState("");

  const { user } = useAuthStore();
  const { conversationContext } = useConversationStore();
  const { addMessage } = useMessageStore();
  const { socket } = useSocketStore();

  const sendDirectMessage = useSendDirectMessage();
  const sendGroupMessage = useSendGroupMessage();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const handleTyping = (value: string) => {
    setContent(value);

    if (!socket) return;

    if (conversationContext.receiverId) {
      socket.emit("user_typing", {
        receiverId: conversationContext.receiverId,
      });
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clientMessageId = crypto.randomUUID();

    if (conversationContext.type === "direct") {
      const newMessage: Message = {
        id: clientMessageId,
        content,
        createdAt: new Date().toISOString(),
        senderUserName: user.username,
        senderId: user.id,
        conversationId: "should_be_replace",
      };

      addMessage(newMessage);

      sendDirectMessage.mutate({
        content,
        clientMessageId,
        receiverId: conversationContext.receiverId!,
      });
    } else {
      if (conversationContext.type === "group") {
        const newMessage: Message = {
          id: clientMessageId,
          content,
          createdAt: new Date().toISOString(),
          senderUserName: user.username,
          senderId: user.id,
          conversationId: conversationContext.conversationId!,
        };

        addMessage(newMessage);

        sendGroupMessage.mutate({
          clientMessageId,
          content,
          conversationId: conversationContext.conversationId!,
        });
      } else {
        console.error("Internal error please log out");
      }
    }

    setContent("");
  };

  return (
    <div className="shrink-0">
      <form className="flex gap-2" onSubmit={onSubmitHandler}>
        <Input
          value={content}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="type here ..."
          className="rounded-sm"
          type="text"
        />

        <Button
          type="submit"
          variant="outline"
          className="rounded-sm"
          disabled={
            !content.trim() ||
            sendDirectMessage.isPending ||
            sendGroupMessage.isPending
          }
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
