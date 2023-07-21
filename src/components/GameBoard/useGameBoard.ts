import { useEffect, useMemo, useState } from "react";
import { Items } from "./types";

type QuestionId = string;
type AnswerId = string;
type Current = [QuestionId | null, AnswerId | null];
type Answer = [QuestionId, AnswerId];
type Answers = Answer[];
type QueryStatus = "idle" | "fetching" | "success" | "error";

export const useGameBoard = ({
  queryFn,
}: {
  queryFn: () => Promise<Items>;
}) => {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>("idle");
  const [datalist, setDatalist] = useState<Items>();
  const [current, setCurrent] = useState<Current>([null, null]);
  const [userAnswers, setUserAnswers] = useState<Answers>([]);

  const answerMap = useMemo(() => {
    const map = new Map<string, string>();
    datalist?.forEach((item) => {
      map.set(item.setup, item.punchline);
    });

    return map;
  }, [datalist]);

  const userQtoAMap = useMemo(() => {
    return new Map([...userAnswers]);
  }, [userAnswers]);

  const userAtoQMap = useMemo(() => {
    return new Map(
      [...userAnswers].map((entry) => [...entry].reverse() as Answer)
    );
  }, [userAnswers]);

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
      setUserAnswers((prev) => [...prev, [question, answer]]);
      setCurrent(() => [null, null]);
    }
  }, [current]);

  const getAnswerValue = (answerId: string) => {
    const questionId = userAtoQMap.get(answerId);
    return questionId && [questionId, answerId];
  };

  const getQuestion = (questionId: string) => {
    const answerId = userQtoAMap.get(questionId);
    return answerId && [questionId, answerId];
  };

  const reset = () => {
    setUserAnswers([]);
    setCurrent([null, null]);
  };

  const undo = () => {
    setUserAnswers((prev) => {
      const temp = [...prev];
      temp.pop();
      return temp;
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
    getAnswerValue,
    getQuestion,
    userQtoAMap,
    userAtoQMap,
    reset,
    undo,
    newGame,
  };
};
