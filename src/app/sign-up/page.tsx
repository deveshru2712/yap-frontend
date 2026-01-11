import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <Image src={"/yap.png"} alt="Just Yap" height={24} width={24} />
            Just Yap
          </Link>
        </div>
        <div className="flex items-center justify-center md:flex-1">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted hidden items-center justify-center lg:flex">
        <Image height={64} width={64} src="/yap.png" alt="Image" />
      </div>
    </div>
  );
}
