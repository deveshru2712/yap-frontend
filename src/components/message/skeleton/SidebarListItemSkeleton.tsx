export default function SidebarListItemSkeleton() {
  return (
    <div className="w-full cursor-default rounded-sm bg-neutral-200/60 px-2 py-1">
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-neutral-300" />

        {/* Content */}
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-300" />
            <div className="h-3 w-32 animate-pulse rounded bg-neutral-300" />
          </div>

          <div className="h-3 w-10 shrink-0 animate-pulse rounded bg-neutral-300" />
        </div>
      </div>
    </div>
  );
}
