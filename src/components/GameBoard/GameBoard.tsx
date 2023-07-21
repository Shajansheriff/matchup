"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Rocket, RotateCcw, Undo } from "lucide-react";
import { useGameBoard } from "./useGameBoard";
import { Items } from "./types";
import React from "react";
import { ActionButton } from "../ActionButton";
import { Arrows } from "./Arrows";
import { Result } from "./Result";
import { QuestionList } from "./QuestionList";
import { AnswerList } from "./AnswerList";

async function getData(): Promise<Items> {
  const res = await fetch("https://official-joke-api.appspot.com/jokes/ten");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const GameBoard = () => {
  const {
    status,
    datalist,
    answerMap,
    current,
    userAnswers,
    pushQuestion,
    pushAnswer,
    reset,
    undo,
    newGame,
  } = useGameBoard({ queryFn: getData });

  const isGameOver = userAnswers.size === answerMap.size;

  switch (status) {
    case "error":
      return <div className="text-4xl text-center">Error...</div>;
    case "fetching":
      return <div className="text-4xl text-center">Loading...</div>;
    case "success":
      return (
        <div className="flex flex-col gap-8">
          <div className="flex justify-end gap-1.5">
            <ActionButton tooltipText="Help" variant="ghost">
              <HelpCircle className="w-4 h-4" />
            </ActionButton>
            {!isGameOver && (
              <ActionButton
                tooltipText="Undo"
                variant="outline"
                disabled={userAnswers.size < 1}
                onClick={undo}
              >
                <Undo className="w-4 h-4" />
              </ActionButton>
            )}
            <ActionButton
              tooltipText="Reset"
              variant="secondary"
              onClick={reset}
            >
              <RotateCcw className="w-4 h-4" />
            </ActionButton>
            <ActionButton tooltipText="Help" onClick={newGame}>
              <Rocket className="w-4 h-4" />
            </ActionButton>
          </div>
          {datalist ? (
            isGameOver ? (
              <Result data={datalist} result={userAnswers} />
            ) : (
              <React.Fragment>
                <div className="grid grid-cols-2 gap-20">
                  <QuestionList
                    current={current}
                    value={userAnswers}
                    data={datalist.map(({ setup }) => setup)}
                    onChecked={pushQuestion}
                  />
                  <AnswerList
                    current={current}
                    value={userAnswers}
                    data={datalist.map(({ punchline }) => punchline)}
                    onChecked={pushAnswer}
                  />
                </div>
                <Arrows data={userAnswers} />
              </React.Fragment>
            )
          ) : null}
        </div>
      );
    case "idle":
    default:
      return (
        <div className="grid place-content-center h-40 border p-8 border-dashed">
          <Button size="lg" onClick={newGame}>
            Start Game
          </Button>
        </div>
      );
  }
};
