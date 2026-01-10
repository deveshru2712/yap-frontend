import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex items-center justify-center gap-2 border-t pt-4 text-center">
      <p className="text-muted-foreground">Made with ❤️ by</p>
      <Link
        href="https://x.com/deveshru2712"
        className="font-medium transition-colors hover:underline hover:underline-offset-2"
      >
        Devesh Chandra
      </Link>
    </div>
  );
}
