interface User {
  id: string;
  email: string;
  username: string;
}

interface Conversation {
  id: string | null;
  name: string;
  avatar: string | null;
  type: "direct" | "group";
  conversationId: string | null;
}

interface SearchConversationResult {
  users: Conversation[];
  groups: Conversation[];
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface conversationContext {
  // optional as when we are talking in a group receiverId should be null
  receiverId?: string | null;
  // optional in case if we are chating for the first time
  conversationId?: string | null;
  name: string | null;
  avatar: string | null;
}
