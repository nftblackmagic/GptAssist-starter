// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DataInterface } from "@/type/gptType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataInterface>
) {
  const { thread_id, msg_id } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  openai.beta.threads.messages
    .retrieve(thread_id, msg_id)
    .then((response) => {
      res.status(200).json({ data: JSON.stringify(response) });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ data: error });
    });
}
