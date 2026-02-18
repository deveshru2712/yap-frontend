interface User {
  id: string;
  email: string;
  username: string;
}

interface recentConversation extends User {
  username: string;
  avatar: string;
  latestMessage: string;
  time: Date;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  type: "direct" | "group";
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
