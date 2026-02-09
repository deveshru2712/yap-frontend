import { create } from "zustand";

interface MessageStoreState {
  messageContext: MessageContext;
}
interface MessageStoreActions {
  setMessageContext: (data: Partial<MessageContext>) => void;
  clearContent: () => void;
  resetMessageContext: () => void;
}

type MessageStoreType = MessageStoreState & MessageStoreActions;

export const useMessageStore = create<MessageStoreType>((set) => ({
  messageContext: {
    receiverId: null,
    profilepic: null,
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
  clearContent: () =>
    set((state) => ({
      messageContext: {
        ...state.messageContext,
        content: null,
      },
    })),

  resetMessageContext: () =>
    set({
      messageContext: {
        receiverId: null,
        username: null,
        profilepic: null,
        content: null,
      },
    }),
}));
