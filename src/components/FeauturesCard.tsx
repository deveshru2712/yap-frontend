import { cn } from "@/lib/utils";

interface FeauturesCardProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeauturesCard({
  id,
  icon,
  title,
  description,
}: FeauturesCardProps) {
  return (
    <div className="flex h-full w-full gap-2 p-2">
      {/* icon container */}
      <div
        className={cn(
          "h-fit rounded-full p-2",
          id === 1 && "bg-red-300 text-red-600",
          id === 2 && "bg-blue-300 text-blue-600",
          id === 3 && "bg-green-300 text-green-600"
        )}
      >
        {icon}
      </div>
      {/* text container */}
      <div className="flex flex-col items-start text-left">
        <h4 className="text-lg font-medium">{title}</h4>
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}
