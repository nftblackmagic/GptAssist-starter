import { AudioPanel } from "@/components/Audio";
import { Footer } from "@/components/Footer";

export default function Audio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center w-full gap-2">
        <AudioPanel />
      </main>
      <Footer />
    </div>
  );
}
