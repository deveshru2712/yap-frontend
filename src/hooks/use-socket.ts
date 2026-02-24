"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSocketStore } from "@/stores/socket-store";

export function useSocket() {
  const { socket, setSocket, isConnected, setIsConnected } = useSocketStore();

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
  }, [socket, setSocket, setIsConnected]);

  return { socket, isConnected };
}
