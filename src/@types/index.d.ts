interface User {
  id: string;
  email: string;
  username: string;
}

interface Conversation {
  id?: string;
  name: string;
  avatar: string;
  type: "direct" | "group";
  conversationId: string;
}

interface SearchConversationResult {
  users: Conversation[];
  groups: Conversation[];
}

interface MessageContext {
  receiverId: string | null;
  name: string | null;
  avatar: string | null;
  content: string | null;
}
