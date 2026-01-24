import MessageBubble from "@/components/message/chat-window/MessageBubble";

const dummyData = [
  { id: 1, userId: "1", message: "Hi there!", time: new Date() },
  {
    id: 2,
    userId: "019bb79b-0000-718b-aaed-87eb22101ee5",
    message: "Hello 👋",
    time: new Date(Date.now() - 1000 * 60),
  },
  {
    id: 3,
    userId: "1",
    message: "How are you doing?",
    time: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 4,
    userId: "019bb79b-0000-718b-aaed-87eb22101ee5",
    message: "I'm good, thanks!",
    time: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: 5,
    userId: "1",
    message: "What are you working on?",
    time: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 6,
    userId: "1",
    message: "Just building a chat UI 😄",
    time: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: 7,
    userId: "019bb79b-0000-718b-aaed-87eb22101ee5",
    message: "Nice! Using Next.js?",
    time: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 8,
    userId: "1",
    message: "Yep, with Zustand for auth state.",
    time: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    id: 9,
    userId: "1",
    message: "Just building a chat UI 😄",
    time: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: 10,
    userId: "019bb79b-0000-718b-aaed-87eb22101ee5",
    message: "Nice! Using Next.js?",
    time: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 11,
    userId: "1",
    message: "Yep, with Zustand for auth state.",
    time: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    id: 12,
    userId: "019bb79b-0000-718b-aaed-87eb22101ee5",
    message: "Nice! Using Next.js?",
    time: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 13,
    userId: "1",
    message: "Yep, with Zustand for auth state.",
    time: new Date(Date.now() - 1000 * 60 * 12),
  },
];

export default function MessageList() {
  return (
    <div className="my-2 min-h-0 flex-1 overflow-y-auto">
      <div className="flex flex-1 flex-col">
        {dummyData.map((data) => (
          <MessageBubble
            key={data.id}
            message={data.message}
            time={data.time}
            userId={data.userId}
          />
        ))}
      </div>
    </div>
  );
}
