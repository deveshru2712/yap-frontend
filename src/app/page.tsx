import { ArrowRight, MessageCircle, Users, Zap } from "lucide-react";
import Link from "next/link";
import FeauturesCard from "@/components/FeauturesCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const featuresList = [
    {
      id: 1,
      icon: <MessageCircle />,
      title: "1-on-1 Direct Chat",
      description:
        "Chat privately with friends through secure one-on-one messaging.",
    },
    {
      id: 2,
      icon: <Users />,
      title: "Group Chat",
      description:
        "Create groups and stay connected with multiple friends at once.",
    },
    {
      id: 3,
      icon: <Zap />,
      title: "Fast UI",
      description:
        "Smooth and responsive interface for a seamless chatting experience.",
    },
  ];

  return (
    <div className="h-screen w-full overflow-y-auto p-3">
      <div className="flex h-full w-full flex-col rounded-xl bg-[#12151D] px-4 py-4 md:px-8">
        {/* navbar */}
        <Navbar />

        {/* main content*/}
        <main className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
          <div className="flex flex-1 flex-col items-start gap-5">
            {/* text content */}
            <div className="flex w-full flex-col items-start text-left">
              <h2 className="w-full text-3xl font-semibold text-white md:text-4xl lg:text-6xl">
                Connect instantly with friends.
              </h2>
              <span className="mt-4 text-sm font-normal text-gray-100 md:mt-5 md:text-base lg:text-lg lg:font-medium">
                Experience seamless, user-friendly messaging that{" "}
                <br className="hidden lg:block" />
                brings people together effortlessly.
              </span>
            </div>

            {/* cta */}
            <Link
              href={"/message"}
              className="flex cursor-pointer items-center rounded-sm bg-blue-500/95 p-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500 active:bg-blue-500"
            >
              Start Chatting Now <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>

          {/* Images */}
          <div className="hidden flex-1 md:block"></div>
        </main>
      </div>

      {/* features section */}
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 py-16 md:gap-8 md:py-20 lg:py-30">
        <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
          Features
        </h2>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featuresList.map((feature) => (
            <FeauturesCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
