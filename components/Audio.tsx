import { useAudio } from "@/hook/useAudio";
import { useEffect, useState } from "react";

export const AudioPanel = () => {
  const { audio, isLoading, createAudio } = useAudio();
  const [audioUrl, setAudioUrl] = useState("");

  const [model, setModel] = useState("tts-1");
  const modelSelection = ["tts-1", "tts-1-hd"];
  const [voice, setVoice] = useState("alloy");
  const voiceSelection = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
  const [text, setText] = useState(
    "Today is a wonderful day to build something people love!"
  );

  const handleAudio = async () => {
    createAudio(model, voice, text);
    setAudioUrl("");
  };

  useEffect(() => {
    if (audio != undefined) {
      console.log(audio);

      const audioSrc = `data:audio/mp3;base64,${audio}`;

      setAudioUrl(audioSrc);
    }
  }, [audio]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <select
        className="select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {modelSelection.map((model) => (
          <option className="option" value={model}>
            {model}
          </option>
        ))}
      </select>
      <select
        className="select"
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
      >
        {voiceSelection.map((voice) => (
          <option className="option" value={voice}>
            {voice}
          </option>
        ))}
      </select>
      <input
        className="text w-full"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAudio}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
