import { Footer } from "@/components/Footer";
import { useGpt } from "@/hook/useGPT";
import { useState } from "react";

const title =
  "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.";

export default function Debug() {
  const { completions, isLoading, fetchData } = useGpt("gpt-4-1106-preview");
  const [message, setMessage] = useState(
    "Compose a poem that explains the concept of recursion in programming."
  );

  const handleClick = async () => {
    const prompt = [
      {
        role: "system",
        content: title,
      },
      {
        role: "user",
        content: message,
      },
    ];
    const promptStr = JSON.stringify(prompt);
    const res = await fetchData(promptStr);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center w-full gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <input
          type="text"
          className="text w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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
