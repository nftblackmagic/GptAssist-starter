import { Footer } from "@/components/Footer";
import { useMessage } from "@/hook/useMessage";
import { useRun } from "@/hook/useRun";
import { useThread } from "@/hook/useThread";

const title = "What’s 巨头卷死小厂?";

export default function Assit() {
  const {
    completions,
    isLoading,
    retrieveMessage,
    listMessage,
    createMessage,
  } = useMessage();
  const { data, createThread, deleteThread } = useThread();
  const { retrieveRun, retrieveRunStep, listRunSteps } = useRun(
    "asst_FTkAAEzhQHpkDWBq30s1IPq9"
  );

  const handleClick = async () => {
    // retrieveMessage(
    //   "thread_CTXvbZdEAL0QNUXysiAJRRYL",
    //   "msg_iH0wUwAgHbMT620pMkz5MH31"
    // );
    listMessage("thread_CTXvbZdEAL0QNUXysiAJRRYL");
  };

  const handleThreadTest = async () => {
    createThread();
    deleteThread("thread_9pdrjka7mdYVgdaJ82eisbW1");
  };

  const handleRunTest = async () => {
    retrieveRun(
      "thread_CTXvbZdEAL0QNUXysiAJRRYL",
      "run_Cu4EjJcv5wyt8mmQB54M5PY5"
    );
  };

  const handleRunStepTest = async () => {
    listRunSteps(
      "thread_CTXvbZdEAL0QNUXysiAJRRYL",
      "run_Cu4EjJcv5wyt8mmQB54M5PY5"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center w-full gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleThreadTest}
        >
          Thread Test
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRunTest}
        >
          run test
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRunStepTest}
        >
          run step test
        </button>

        {completions && <p>{completions}</p>}
      </main>
      <Footer />
    </div>
  );
}
