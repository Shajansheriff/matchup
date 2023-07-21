import { useEffect, useMemo, useState } from "react";
import { Answer, Current, Items, QueryStatus } from "./types";

export const useGameBoard = ({
  queryFn,
}: {
  queryFn: () => Promise<Items>;
}) => {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>("idle");
  const [datalist, setDatalist] = useState<Items>();
  const [current, setCurrent] = useState<Current>([null, null]);
  const [userAnswers, setUserAnswers] = useState(new Map<string, string>());

  const answerMap = useMemo(() => {
    const map = new Map<string, string>();
    datalist?.forEach((item) => {
      map.set(item.setup, item.punchline);
    });
    return map;
  }, [datalist]);

  const pushQuestion = (qn: string) => {
    setCurrent((prev) => {
      const [, prevAns] = prev;
      return [qn, prevAns];
    });
  };

  const pushAnswer = (ans: string) => {
    setCurrent((prev) => {
      const [prevQuestionId] = prev;
      return [prevQuestionId, ans];
    });
  };

  useEffect(() => {
    const [question, answer] = current;
    if (question && answer) {
      setUserAnswers((prev) => prev.set(question, answer));
      setCurrent(() => [null, null]);
    }
  }, [current]);

  const reset = () => {
    setUserAnswers((prev) => {
      prev.clear();
      return prev;
    });
    setCurrent([null, null]);
  };

  const undo = () => {
    setUserAnswers((prev) => {
      const last = Array.from(prev.keys()).at(-1);
      if (last) {
        prev.delete(last);
      }
      return prev;
    });
  };

  const runQueryFn = async () => {
    setQueryStatus("fetching");
    queryFn()
      .then((response) => {
        setDatalist(response);
        setQueryStatus("success");
      })
      .catch(() => {
        setQueryStatus("error");
      });
  };

  const newGame = () => {
    reset();
    runQueryFn();
  };

  return {
    status: queryStatus,
    datalist,
    runQueryFn,
    answerMap,
    current,
    pushQuestion,
    pushAnswer,
    userAnswers,
    reset,
    undo,
    newGame,
  };
};
