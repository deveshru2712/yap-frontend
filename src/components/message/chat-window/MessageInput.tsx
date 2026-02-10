"use client";
import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { useMessageStore } from "@/stores/message-store";
import { useSocketStore } from "@/stores/socket-store";

export default function MessageInput() {
  const { content, setContent } = useMessageStore();
  const { socket } = useSocketStore();
  const { user } = useAuthStore();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit("msg", { senderId: user?.id, content });
      console.log("success");
    }
  };

  return (
    <div className="shrink-0">
      <form className="flex gap-2" onSubmit={onSubmitHandler}>
        <Input
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
          placeholder="type here ..."
          className={"rounded-sm"}
          type="text"
        />
        <Button
          type="submit"
          variant={"outline"}
          className="rounded-sm"
          disabled={!content?.trim()}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
