import { Footer } from "@/components/Footer";
import { Searcher } from "@/components/Searcher";

export default function Search() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center w-full gap-2">
        <Searcher />
      </main>

      <Footer />
    </div>
  );
}
