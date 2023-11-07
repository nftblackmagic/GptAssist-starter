import { Footer } from "@/components/Footer";
import { useAss } from "@/hook/useAss";
import Image from "next/image";
import { useState } from "react";

const title = "What’s 巨头卷死小厂?";

export default function Assit() {
  const { completions, isLoading, fetchMessage } = useAss();

  const handleClick = async () => {
    fetchMessage(
      "thread_CTXvbZdEAL0QNUXysiAJRRYL",
      "msg_iH0wUwAgHbMT620pMkz5MH31"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center w-full gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {completions && <p>{completions}</p>}
      </main>
      <Footer />
    </div>
  );
}
