interface directMessagePayload {
  content: string;
  receiverId: string;
  clientMessageId: string;
}

interface OptimisticMessage extends Message {
  clientMessageId: string;
}

interface User {
  id: string;
  email: string;
  username: string;
}

interface DirectConversation {
  userId: string;
  name: string;
  avatar: string | null;
  type: "direct";
  conversationId: string | null;
  latestMessage: string;
  createdAt: string;
}

interface GroupConversation {
  name: string;
  avatar: string | null;
  type: "group";
  conversationId: string;
  latestMessage: string;
  createdAt: string;
}

interface SearchConversationResult {
  direct: DirectConversation[];
  group: GroupConversation[];
}

type RecentConversation = DirectConversation | GroupConversation;

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  conversationId: string;
}

interface SocketMessageData {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  conversationId: string;
  name: string;
  avatar: string;
  type: "direct" | "group";
}

interface conversationContext {
  // optional as when we are talking in a group receiverId should be null
  receiverId?: string | null;
  // optional in case if we are chating for the first time
  conversationId?: string | null;
  name: string | null;
  avatar: string | null;
}

type Member = {
  userId: string;
  name: string;
};
