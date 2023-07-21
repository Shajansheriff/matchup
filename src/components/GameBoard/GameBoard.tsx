"use client";

import { Button } from "../ui/button";
import { colors } from "@/lib/constants";
import { List, ListItem, ShuffledList } from "./List";
import Xarrow from "react-xarrows";
import {
  CheckCircle,
  HelpCircle,
  Rocket,
  RotateCcw,
  Undo,
  XCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useGameBoard } from "./useGameBoard";
import { Items } from "./types";
import React from "react";
import { ActionButton } from "../ActionButton";

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
    userAtoQMap,
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
            <ActionButton
              tooltipText="Undo"
              variant="outline"
              disabled={userAnswers.size < 1}
              onClick={undo}
            >
              <Undo className="w-4 h-4" />
            </ActionButton>
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
          {!isGameOver ? (
            <>
              <div className="grid grid-cols-2 gap-20">
                {datalist && (
                  <List data={datalist.map(({ setup }) => setup)}>
                    {(items) => {
                      return (
                        <React.Fragment>
                          {items.map((question) => (
                            <ListItem
                              key={question}
                              id={question}
                              value={question}
                              checked={current[0] === question}
                              onCheckedChange={() => {
                                pushQuestion(question);
                              }}
                              disabled={userAnswers.has(question)}
                              completed={userAnswers.has(question)}
                            />
                          ))}
                        </React.Fragment>
                      );
                    }}
                  </List>
                )}
                {datalist && (
                  <ShuffledList
                    data={datalist.map(({ punchline }) => punchline)}
                  >
                    {(items) => {
                      return (
                        <React.Fragment>
                          {items.map((answer) => {
                            return (
                              <ListItem
                                key={answer}
                                id={answer}
                                value={answer}
                                checked={current[1] === answer}
                                onCheckedChange={() => {
                                  pushAnswer(answer);
                                }}
                                disabled={userAtoQMap.has(answer)}
                                completed={userAtoQMap.has(answer)}
                              />
                            );
                          })}
                        </React.Fragment>
                      );
                    }}
                  </ShuffledList>
                )}
              </div>
              {Array.from(
                userAnswers.entries(),
                ([question, answer], index) => {
                  let color = colors[index];

                  if (answerMap.size === userAnswers.size) {
                    const rightAnswer = answerMap.get(question);

                    color = rightAnswer === answer ? "green" : "red";
                  }
                  return (
                    <Xarrow
                      key={question}
                      start={question}
                      end={answer}
                      curveness={1}
                      color={color}
                    />
                  );
                }
              )}
            </>
          ) : (
            <div>
              <div className="border border-input p-6 rounded-md shadow divide-dashed divide-y ">
                {datalist?.map((item) => {
                  const userAnswer = userAnswers.get(item.setup);
                  const isAnswerCorrect = userAnswer === item.punchline;
                  return (
                    <div
                      key={item.setup}
                      className=" p-2 text-center space-y-2"
                    >
                      <div className="font-base font-medium">{item.setup}</div>
                      <div className="flex justify-center text-sm">
                        {isAnswerCorrect ? (
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
                            {userAnswer}
                          </div>
                        ) : (
                          <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center">
                              <XCircle className="w-4 h-4 mr-1.5 text-red-600" />
                              <div className="line-through">{userAnswer}</div>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
                              {item.punchline}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
