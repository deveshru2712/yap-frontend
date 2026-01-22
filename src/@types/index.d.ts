interface User {
  id: string;
  email: string;
  username: string;
}

interface recentConversation extends User {
  latestMessage: string;
  time: Date;
}
