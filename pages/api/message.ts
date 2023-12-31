// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IData } from "@/type/gptType";
import { IMessage } from "@/type/messageType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMessage | IData>
) {
  const { method, thread_id, msg_id, messages } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method === "POST" && method === "create" && thread_id && messages) {
    openai.beta.threads.messages
      .create(thread_id, messages)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IMessage);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "retrieve" && thread_id && msg_id) {
    openai.beta.threads.messages
      .retrieve(thread_id, msg_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IMessage);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "list" && thread_id) {
    openai.beta.threads.messages
      .list(thread_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response.data as any);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }
}
