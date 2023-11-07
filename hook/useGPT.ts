import { DataInterface } from "@/type/gptType";
import React from "react";
import * as _ from "lodash";

export const useGpt = (model: string) => {
  // Send user meesage to api, meesage and prompt in body
  // then update state value with response
  const [data, setData] = React.useState("");
  const [completions, setCompletions] = React.useState(""); // ["hello", "hi"
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [choices, setChoices] = React.useState("");

  const fetchData = async (message: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          model,
          max_tokens: 300,
        }),
      }).then(async (res) => {
        const result: DataInterface = await res.json();
        console.log("Hook api call result", result);
        const { data } = result;
        const finalData = JSON.parse(data);
        console.log("Hook finalData", finalData);
        setData(finalData);
        const comp = _.get(finalData, "choices[0].message.content", "");
        setCompletions(comp);
        // const choices = _.get(finalData, "choices", []);
        // setChoices(choices);
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    data,
    completions,
    isLoading,
    isError,
    isSuccess,
    fetchData,
  };
};
