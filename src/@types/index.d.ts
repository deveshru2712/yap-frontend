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

interface MessageContext {
  receiverId: string | null;
  username: string | null;
  avatar: string | null;
  content: string | null;
}
