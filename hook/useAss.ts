import { DataInterface } from "@/type/gptType";
import React from "react";
import * as _ from "lodash";

export const useAss = () => {
  const [data, setData] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [completions, setCompletions] = React.useState("");

  const fetchMessage = async (thread_id: string, msg_id: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id,
          msg_id,
        }),
      }).then(async (res) => {
        const result: DataInterface = await res.json();
        console.log("Hook api call result", result);
        const { data } = result;
        const finalData = JSON.parse(data);
        console.log("Hook finalData", finalData);
        setData(finalData);
        const comp = _.get(finalData, "content[0].text.value", "");
        setCompletions(comp);
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    completions,
    fetchMessage,
  };
};
