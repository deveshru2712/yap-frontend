interface User {
  id: string;
  email: string;
  username: string;
}

interface recentConversation extends User {
  username: string;
  profilepic: string;
  latestMessage: string;
  time: Date;
}

interface MessageContext {
  receiverId: string | null;
  username: string | null;
  profilepic: string | null;
  content: string | null;
}
