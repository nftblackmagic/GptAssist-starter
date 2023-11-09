// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IAudio } from "@/type/audioType";
import { IData } from "@/type/gptType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import axios from "axios";

const downloadAudio = async (
  audioUrl: string,
  outputPath: string
): Promise<void> => {
  const res = await fetch(audioUrl);
  if (!res.ok)
    throw new Error(`Failed to fetch ${audioUrl}: ${res.statusText}`);
  const fileStream = fs.createWriteStream(outputPath);
  return new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};
// ... other imports

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAudio | IData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { method, model, voice, input, audioUrl } = req.body;

  if (
    method !== "create" &&
    method !== "transcript" &&
    method !== "translate"
  ) {
    res.status(500).json({ data: "Invalid method." });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (method === "create" && model && voice && input) {
    try {
      const mp3Response = await openai.audio.speech.create({
        model: model,
        voice: voice,
        input: input,
      });

      const buffer = await mp3Response.arrayBuffer();
      const base64Audio = Buffer.from(buffer).toString("base64");

      res.status(200).json({ data: base64Audio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: "Failed to generate audio." });
    }
  }

  if (method === "transcript" && audioUrl) {
    try {
      // The URL of the MP3 file you want to download
      const fileUrl = audioUrl;

      // The path where the MP3 file will be saved temporarily on the server
      const filePath = path.resolve("/tmp", "downloadedFile.mp3");

      // Axios request for the MP3 file as a stream
      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "stream",
      });

      // Create a write stream to save the file to the server's file system
      const writer = fs.createWriteStream(filePath);

      // Pipe the response data to the file
      response.data.pipe(writer);

      // Return a new Promise that resolves on finish or rejects on error
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
      });

      console.log(transcription.text);

      res.status(200).json({ data: transcription.text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: "Failed to generate audio." });
    }
  }
}
