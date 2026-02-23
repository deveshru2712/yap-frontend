"use client";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendDirectMessage } from "@/hooks/use-send-direct-message";
import { useConversationStore } from "@/stores/conversation-store";

export default function MessageInput() {
  const [content, setContent] = useState("");
  useConversationStore();
  const { conversationContext } = useConversationStore();
  const sendMessage = useSendDirectMessage();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (conversationContext.receiverId) {
      sendMessage.mutate({
        content,
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
