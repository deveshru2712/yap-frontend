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

export default function MessageInput() {
  const [content, setContent] = useState("");
  useConversationStore();
  const { user } = useAuthStore();
  const { conversationContext } = useConversationStore();
  const sendDirectMessage = useSendDirectMessage();
  const sendGroupMessage = useSendGroupMessage();
  const { addMessage } = useMessageStore();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientMessageId = crypto.randomUUID();

    // sending direct message
    if (conversationContext.receiverId) {
      const newMessage: Message = {
        id: clientMessageId,
        content,
        createdAt: new Date().toISOString(),
        senderUserName: user.username,
        senderId: user.id,
        conversationId: "should_be_replace",
      };

      // optimistically updating the UI
      addMessage(newMessage);
      sendDirectMessage.mutate({
        content,
        clientMessageId,
        receiverId: conversationContext.receiverId,
      });
    } else {
      // sending group message
      if (conversationContext.conversationId) {
        const newMessage: Message = {
          id: clientMessageId,
          content: content,
          createdAt: new Date().toISOString(),
          senderUserName: user.username,
          senderId: user.id,
          conversationId: conversationContext.conversationId,
        };
        addMessage(newMessage);
        sendGroupMessage.mutate({
          clientMessageId,
          content,
          conversationId: conversationContext.conversationId,
        });
      } else {
        console.log("Enternal error please log out");
      }
    }
    setContent("");
  };

  return (
    <div className="shrink-0">
      <form className="flex gap-2" onSubmit={onSubmitHandler}>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="type here ..."
          className={"rounded-sm"}
          type="text"
        />
        <Button
          type="submit"
          variant={"outline"}
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
