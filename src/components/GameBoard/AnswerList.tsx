import React, { useState } from "react";
import { Answer } from "./types";
import { shuffle } from "@/lib/utils";
import { BaseList, BaseListProps } from "./BaseList";

export const AnswerList = ({
  data,
  current,
  onChecked,
  value,
}: BaseListProps) => {
  const [datalist] = useState(() => shuffle(data));
  const userAtoQMap = new Map(
    Array.from(value.entries(), (entry) => {
      return [...entry].reverse() as Answer;
    })
  );
  return (
    <BaseList
      data={datalist}
      current={current}
      value={userAtoQMap}
      onChecked={onChecked}
    />
  );
};
