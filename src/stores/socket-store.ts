import type { Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStoreState {
  socket: Socket | null;
  isConnected: boolean;
}

interface SocketStoreAction {
  setSocket: (socket: Socket | null) => void;
  setIsConnected: (connected: boolean) => void;
}

type SocketStoreType = SocketStoreState & SocketStoreAction;

export const useSocketStore = create<SocketStoreType>((set) => ({
  socket: null,
  isConnected: false,
  setSocket: (socket) => set({ socket }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));
