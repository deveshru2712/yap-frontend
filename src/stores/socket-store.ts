import { create } from "zustand";
import { Socket } from "socket.io-client";

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
