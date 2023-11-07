import { Footer } from "@/components/Footer";
import { useGpt } from "@/hook/useGPT";
import Image from "next/image";
import { useState } from "react";

const title = "What’s in this image?";

export default function Debug() {
  const { completions, isLoading, fetchData } = useGpt("gpt-4-vision-preview");
  const [message, setMessage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
  );

  const handleClick = async () => {
    const prompt = [
      {
        role: "user",
        content: [
          { type: "text", text: title },
          {
            type: "image_url",
            image_url: message,
          },
        ],
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
        {message && <Image src={message} width={500} height={500} alt="" />}
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
