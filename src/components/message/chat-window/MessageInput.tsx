"use client";
import { Send } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendDirectMessage } from "@/hooks/use-send-direct-message";
import { useAuthStore } from "@/stores/auth-store";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";

export default function MessageInput() {
  const [content, setContent] = useState("");
  useConversationStore();
  const { user } = useAuthStore();
  const { conversationContext } = useConversationStore();
  const sendMessage = useSendDirectMessage();
  const { addMessage } = useMessageStore();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (conversationContext.receiverId) {
      const clientMessageId = crypto.randomUUID();
      const newMessage: Message = {
        id: clientMessageId,
        content,
        createdAt: Date.toString(),
        senderId: user.id,
        conversationId: "should_be_replace",
      };

      // optimistically updating the UI
      addMessage(newMessage);
      // sending the message
      sendMessage.mutate({
        content,
        clientMessageId,
        receiverId: conversationContext.receiverId,
      });
    } else {
      console.log("comming soon");
    }
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
          disabled={!content.trim() || sendMessage.isPending}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
