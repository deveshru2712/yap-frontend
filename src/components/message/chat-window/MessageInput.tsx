"use client";
import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { useSocketStore } from "@/stores/socket-store";

export default function MessageInput() {
  const [content, setContent] = useState("");
  const { socket } = useSocketStore();
  const { user } = useAuthStore();

  const onSubmitHandler = () => {
    if (socket) {
      socket.emit("msg", { senderId: user?.id, content });
      console.log("success");
    }
  };
  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="type here ..."
        className={"rounded-sm"}
        type="text"
        disabled={!content.trim()}
      />
      <Button
        onClick={onSubmitHandler}
        variant={"outline"}
        className="rounded-sm"
      >
        <Send />
      </Button>
    </div>
  );
}
