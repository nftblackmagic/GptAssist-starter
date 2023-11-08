import { IData } from "@/type/gptType";
import React from "react";
import * as _ from "lodash";
import { IRun, IRunStep } from "@/type/runType";
import { IMessage } from "@/type/messageType";

export const useRun = (assistant_id: string) => {
  const [data, setData] = React.useState<
    IRun | IData | IRunStep[] | IRunStep
  >();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const createRun = async (thread_id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "create",
          assistant_id,
          thread_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRun = await res.json();
          console.log("createRun Hook api call result", result);
          setData(result);
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const retrieveRun = async (thread_id: string, run_id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "retrieve",
          thread_id,
          run_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRun = await res.json();
          console.log("retrieveRun Hook api call result", result);
          setData(result);
          return result;
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const cancelRun = async (thread_id: string, run_id: string) => {
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
          run_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRun = await res.json();
          console.log("cancelRun Hook api call result", result);
          setData(result);
        }
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const createThreadAndRun = async (messages: IMessage[]) => {
    setIsLoading(true);
    try {
      console.log("createThreadAndRun Hook api call messages", messages);
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "createtr",
          assistant_id,
          messages,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRun = await res.json();
          console.log("createThreadAndRun Hook api call result", result);
          setData(result);
          return result;
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const retrieveRunStep = async (thread_id: string, run_id: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "retrievesp",
          thread_id,
          run_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRunStep = await res.json();
          console.log("retrieveRunStep Hook api call result", result);
          setData(result);
        }
      });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const listRunSteps = async (thread_id: string, run_id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "listsp",
          thread_id,
          run_id,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const result: IRunStep[] = await res.json();
          console.log("listRunSteps Hook api call result", result);
          setData(result);
          return result;
        }
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    data,
    isError,
    isLoading,
    createRun,
    retrieveRun,
    cancelRun,
    createThreadAndRun,
    retrieveRunStep,
    listRunSteps,
  };
};
