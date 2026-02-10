"use client";
import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { useSocketStore } from "@/stores/socket-store";

export function useSocket() {
  const { socket, setSocket, isConnected, setIsConnected } = useSocketStore();
  let socketInstance: Socket | null = socket;

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(process.env.NEXT_PUBLIC_API_URL!, {
        withCredentials: true,
        transports: ["websocket"],
      });
    }

    setSocket(socketInstance);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);

    setIsConnected(socketInstance.connected);

    return () => {
      socketInstance?.off("connect", handleConnect);
      socketInstance?.off("disconnect", handleDisconnect);
    };
  }, []);

  return { socket, isConnected };
}
