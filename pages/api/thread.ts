// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IData } from "@/type/gptType";
import { IThread } from "@/type/threadType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IThread | IData>
) {
  const { method, thread_id } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method === "POST" && method === "create") {
    openai.beta.threads
      .create({})
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IThread);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "retrieve" && thread_id) {
    openai.beta.threads
      .retrieve(thread_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IThread);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "delete" && thread_id) {
    openai.beta.threads
      .del(thread_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as any);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }
}
