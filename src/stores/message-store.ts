import { create } from "zustand";

interface MessageStoreState {
  messageContext: MessageContext;
}
interface MessageStoreActions {
  setMessageContext: (data: Partial<MessageContext>) => void;
  resetMessageContext: () => void;
}

type MessageStoreType = MessageStoreState & MessageStoreActions;

export const useMessageStore = create<MessageStoreType>((set) => ({
  messageContext: {
    receiverId: null,
    avatar: null,
    username: null,
    content: null,
  },
  setMessageContext: (data) =>
    set((state) => ({
      messageContext: {
        ...state.messageContext,
        ...data,
      },
    })),
  resetMessageContext: () =>
    set({
      messageContext: {
        receiverId: null,
        username: null,
        avatar: null,
        content: null,
      },
    }),
}));
