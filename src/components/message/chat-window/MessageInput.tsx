import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function MessageInput() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="bg-background/70 flex items-center gap-1.5 px-4 py-3 backdrop-blur-lg">
        <Input className="rounded-sm" placeholder="type here ..." />
        <Button variant="outline" className="rounded-sm" disabled>
          <Send />
        </Button>
      </div>
    </div>
  );
}
