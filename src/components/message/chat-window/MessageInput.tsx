"use client";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { useConversationStore } from "@/stores/conversation-store";
import { useSocketStore } from "@/stores/socket-store";

export default function MessageInput() {
  const { conversationContext, setconversationContext } =
    useConversationStore();
  const { socket } = useSocketStore();
  const { user } = useAuthStore();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit("msg", {
        senderId: user?.id,
        conversationContext: conversationContext.content,
      });
      console.log("success");
    }
  };

  return (
    <div className="shrink-0">
      <form className="flex gap-2" onSubmit={onSubmitHandler}>
        <Input
          value={conversationContext.content || ""}
          onChange={(e) => setconversationContext({ content: e.target.value })}
          placeholder="type here ..."
          className={"rounded-sm"}
          type="text"
        />
        <Button
          type="submit"
          variant={"outline"}
          className="rounded-sm"
          disabled={!conversationContext.content?.trim()}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
