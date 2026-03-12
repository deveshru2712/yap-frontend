"use client";

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useConversationStore } from "@/stores/conversation-store";
import { useMessageStore } from "@/stores/message-store";
import { useRecentConversationStore } from "@/stores/recent-conversation-store";
import { useSocketStore } from "@/stores/socket-store";
import { useStatusStore } from "@/stores/status-store";

export function useSocket() {
  const { socket, setSocket, isConnected, setIsConnected } = useSocketStore();

  const { addMessage } = useMessageStore();
  const { conversationContext } = useConversationStore();
  const { updateRecentConversation } = useRecentConversationStore();

  const { updateOnlineUserList, setTypingUser, removeTypingUser } =
    useStatusStore();

  const conversationRef = useRef(conversationContext);

  useEffect(() => {
    conversationRef.current = conversationContext;
  }, [conversationContext]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: socket should initialize once
  useEffect(() => {
    if (socket) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL!, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("new_message", (message: SocketMessageData) => {
      updateRecentConversation(message);

      if (message.conversationId === conversationRef.current.conversationId) {
        addMessage(message);
      }
    });

    socketInstance.on("online_users", updateOnlineUserList);

    socketInstance.on("typing", ({ userId }: { userId: string }) => {
      setTypingUser(userId);
    });

    socketInstance.on("stop_typing", ({ userId }: { userId: string }) => {
      removeTypingUser(userId);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected };
}
