import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-full p-2">
      <div className="flex h-full w-full flex-col rounded-md bg-[#12151D] px-4 py-4 md:px-8">
        {/* navbar */}
        <Navbar />

        {/* main content*/}
        <main className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
          {/* text content */}
          <div className="flex w-full flex-1 flex-col items-start text-left">
            <h2 className="w-full text-3xl font-semibold text-white md:text-4xl lg:text-6xl">
              Connect instantly with friends.
            </h2>
            <span className="mt-4 text-sm font-normal text-gray-100 md:mt-5 md:text-base lg:text-lg lg:font-medium">
              Experience seamless, user-friendly messaging that{" "}
              <br className="hidden lg:block" />
              brings people together effortlessly.
            </span>
          </div>

          {/* Images */}
          <div className="hidden flex-1 md:block"></div>
        </main>
      </div>
    </div>
  );
}
