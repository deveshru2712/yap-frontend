import Image from "next/image";
import Link from "next/link";

export default function SidebarHeader() {
  return (
    <div className="p-2">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/yap.png"} width={32} height={32} alt="JustYap" />
        <span className="text-base font-semibold text-neutral-900 md:text-lg">
          JustYap
        </span>
      </Link>
    </div>
  );
}
