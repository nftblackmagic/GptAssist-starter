import { IData } from "@/type/gptType";
import React from "react";
import * as _ from "lodash";
import { IMessage, IMessageContent } from "@/type/messageType";

export const useMessage = () => {
  const [data, setData] = React.useState<IMessage | IData | IMessage[]>();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completions, setCompletions] = React.useState("");

  const createMessage = async (
    thread_id: string,
    messages: IMessageContent[]
  ) => {
    setIsLoading(true);
    try {
      await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "create",
          thread_id,
          messages,
        }),
      }).then(async (res) => {
        const result: IMessage = await res.json();
        console.log("Hook api call result", result);
        setData(result);
        const comp = _.get(result, "content[0].text.value", "");
        setCompletions(comp);
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const retrieveMessage = async (thread_id: string, msg_id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "retrieve",
          thread_id,
          msg_id,
        }),
      }).then(async (res) => {
        if (res.status == 200) {
          const result: IMessage = await res.json();
          console.log("retrieveMessage Hook api call result", result);
          setData(result);
          const comp = _.get(result, "content[0].text.value", "");
          setCompletions(comp);
          setIsLoading(false);
          return result;
        } else {
          setIsError(true);
        }
      });
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const listMessage = async (thread_id: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "list",
          thread_id,
        }),
      }).then(async (res) => {
        const result: Array<IMessage> = await res.json();
        console.log("listMessage Hook api call result", result);
        setData(result);
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
    completions,
    retrieveMessage,
    createMessage,
    listMessage,
  };
};
