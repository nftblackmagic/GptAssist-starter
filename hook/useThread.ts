import { IData } from "@/type/gptType";
import React from "react";
import * as _ from "lodash";
import { IThread } from "@/type/threadType";

export const useThread = () => {
  const [data, setData] = React.useState<IThread | IData | IThread[]>();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const createThread = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "create",
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IThread = await res.json();
          console.log("createThread Hook api call result", result);
          setData(result);
        }
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const retrieveThread = async (thread_id: string, msg_id: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/thread", {
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
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IThread = await res.json();
          console.log("retrieveThread Hook api call result", result);
          setData(result);
          const comp = _.get(result, "content[0].text.value", "");
        }
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const deleteThread = async (thread_id: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "delete",
          thread_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IData = await res.json();
          console.log("deleteThread Hook api call result", result);
          setData(result);
        }
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
    createThread,
    retrieveThread,
    deleteThread,
  };
};
