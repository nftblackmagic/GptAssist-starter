import { useMessage } from "@/hook/useMessage";
import { useRun } from "@/hook/useRun";
import { IMessage } from "@/type/messageType";
import { useEffect, useState } from "react";
import * as _ from "lodash";

export const Searcher = () => {
  const { createThreadAndRun, retrieveRun, listRunSteps } = useRun(
    "asst_FTkAAEzhQHpkDWBq30s1IPq9"
  );
  const { retrieveMessage } = useMessage();

  const [text, setText] = useState("What's I2VGen-XL?");
  const [threadId, setThreadId] = useState("");
  const [runId, setRunId] = useState("");
  const [status, setStatus] = useState("");
  const [messageIds, setMessageIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const handleClick = async () => {
    const messages: IMessage[] = [
      {
        role: "user",
        content: text,
      },
    ];
    const tmpRun = await createThreadAndRun(messages);
    if (tmpRun != undefined) {
      console.log("tmpRun", tmpRun);
      setRunId(tmpRun.id);
      setThreadId(tmpRun.thread_id);
      setStatus(tmpRun.status);
    }
    // const msgId = await retrieveMessage(threadId, text);
    // console.log(msgId);
  };

  useEffect(() => {
    // Function to be executed in the interval
    const doSomething = async () => {
      const run = await retrieveRun(threadId, runId);
      console.log("run", run);
      if (run != undefined) {
        setStatus(run.status);
      }
      const runSteps = await listRunSteps(threadId, runId);
      if (runSteps != undefined) {
        console.log("runSteps", runSteps);
        const messageCreationIds = runSteps
          .filter(
            (step) =>
              step.type === "message_creation" &&
              step.step_details?.message_creation &&
              step.status === "completed"
          )
          .map((step) => step.step_details.message_creation?.message_id);
        if (messageCreationIds.length > 0 && messageCreationIds != undefined) {
          // console.log(
          //   "messageCreationIds",
          //   messageCreationIds,
          //   messageIds,
          //   messageIds.length,
          //   messageCreationIds.length,
          //   messageIds.every(function (element, index) {
          //     return element === messageCreationIds[index];
          //   })
          // );

          if (
            !(
              messageIds.length === messageCreationIds.length &&
              messageIds.every(function (element, index) {
                return element === messageCreationIds[index];
              })
            )
          ) {
            setMessageIds(messageCreationIds as string[]);
          }
        }
      }
    };

    // Check if the status should trigger the interval
    if (status === "queued" || status === "in_progress") {
      // Start the interval
      const intervalId = setInterval(doSomething, 1000);

      // Return a cleanup function to clear the interval
      return () => clearInterval(intervalId);
    }
  }, [status]);

  useEffect(() => {
    if (messageIds.length > 0) {
      const getMessage = async () => {
        const messages = await Promise.all(
          messageIds.map(async (messageId) => {
            const message = await retrieveMessage(threadId, messageId);
            if (message != undefined) {
              return _.get(message, "content[0].text.value");
            } else {
              return "";
            }
          })
        );
        // console.log("messages", messages);
        setMessages(messages as string[]);
      };
      getMessage();
    }
  }, [messageIds]);

  return (
    <div className="">
      <h1>Search</h1>
      <input
        className="text w-full"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Search
      </button>
      <p>threadId: {threadId}</p>
      <p>runId: {runId}</p>
      <p>status: {status}</p>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};
