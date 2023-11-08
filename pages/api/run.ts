// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IData } from "@/type/gptType";
import { IRun, IRunStep } from "@/type/runType";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRun | IData | IRunStep>
) {
  const { method, thread_id, assistant_id, run_id, messages, step_id } =
    req.body;

  console.log("run Hook api call", req.body);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (
    req.method === "POST" &&
    method === "create" &&
    thread_id &&
    assistant_id
  ) {
    openai.beta.threads.runs
      .create(thread_id, {
        assistant_id,
      })
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IRun);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "retrieve" && thread_id && run_id) {
    openai.beta.threads.runs
      .retrieve(thread_id, run_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IRun);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "cancel" && thread_id && run_id) {
    openai.beta.threads.runs
      .cancel(thread_id, run_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IRun);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (
    req.method === "POST" &&
    method === "createtr" &&
    assistant_id &&
    messages
  ) {
    console.log(
      "createThreadAndRun Hook api call messages",
      messages,
      assistant_id
    );
    openai.beta.threads
      .createAndRun({
        assistant_id,
        thread: {
          messages,
        },
      })
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IRun);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (
    req.method === "POST" &&
    method === "retrievesp" &&
    thread_id &&
    run_id &&
    step_id
  ) {
    openai.beta.threads.runs.steps
      .retrieve(thread_id, run_id, step_id)
      .then((response) => {
        console.log(response);
        res.status(200).json(response as IRunStep);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ data: error });
      });
  }

  if (req.method === "POST" && method === "listsp" && thread_id && run_id) {
    openai.beta.threads.runs.steps
      .list(thread_id, run_id)
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
