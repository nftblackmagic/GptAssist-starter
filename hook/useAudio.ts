import { IAudio } from "@/type/audioType";
import { IData } from "@/type/gptType";
import { File } from "buffer";
import React from "react";

export const useAudio = () => {
  const [audio, setAudio] = React.useState<ArrayBuffer>();
  const [transcription, setTranscription] = React.useState<string>();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const createAudio = async (model: string, voice: string, input: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "create",
          model,
          voice,
          input,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IAudio = await res.json();
          setAudio(result.data);
          return result;
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const transcriptAudio = async (audioUrl: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "transcript",
          audioUrl: audioUrl,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IData = await res.json();
          setTranscription(result.data);
          return result;
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    audio,
    transcription,
    isError,
    isLoading,
    createAudio,
    transcriptAudio,
  };
};
