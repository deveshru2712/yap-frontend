export function formatMessageTime(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  // Older than 24 hours → show date
  if (diffHours >= 24) {
    return date.toLocaleDateString("en-In", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  }

  // Less than 24 hours → show time
  return date.toLocaleTimeString("en-In", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
