// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IAudio } from "@/type/audioType";
import { IData } from "@/type/gptType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

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

  const { model, voice, input } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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
