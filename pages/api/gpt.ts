// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DataInterface } from "@/type/gptType";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataInterface>
) {
  //   console.log("handler req", req.body);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + process.env.OPENAI_API_KEY);

  const { message, model, max_tokens } = req.body;
  //   console.log("handler message", message, model);
  const messageJson = JSON.parse(message);

  var raw = JSON.stringify({
    model,
    messages: messageJson,
    max_tokens,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((error) => {
      res.status(500).json({ data: error });
    });

  //   res.status(500).json({ data: "error" });
}
