import { useAudio } from "@/hook/useAudio";
import { useEffect, useState } from "react";

export const AudioPanel = () => {
  const { audio, transcription, isLoading, createAudio, transcriptAudio } =
    useAudio();
  const [audioUrl, setAudioUrl] = useState("");

  const [model, setModel] = useState("tts-1");
  const modelSelection = ["tts-1", "tts-1-hd"];
  const [voice, setVoice] = useState("alloy");
  const voiceSelection = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
  const [text, setText] = useState(
    "Today is a wonderful day to build something people love!"
  );

  const [inputAudio, setInputAudio] = useState(
    "https://upcdn.io/FW25b7k/raw/download.mp3"
  );
  const [outputText, setOutputText] = useState("");

  const handleAudio = async () => {
    createAudio(model, voice, text);
    setAudioUrl("");
  };

  const handleWhisper = async () => {
    transcriptAudio(inputAudio);
  };

  useEffect(() => {
    if (audio != undefined) {
      const audioSrc = `data:audio/mp3;base64,${audio}`;
      setAudioUrl(audioSrc);
    }
  }, [audio]);

  useEffect(() => {
    if (transcription != undefined) {
      setOutputText(transcription);
    }
  }, [transcription]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-2xl font-bold">TTS</h1>
      <select
        className="select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {modelSelection.map((model) => (
          <option className="option" value={model} key={model}>
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
          <option className="option" value={voice} key={voice}>
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
      <h1 className="text-2xl font-bold">Whisper</h1>
      <input
        type="text"
        value={inputAudio}
        onChange={(e) => setInputAudio(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleWhisper}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {outputText && <p>{outputText}</p>}
    </div>
  );
};
