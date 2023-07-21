import React from "react";
import { List, ListItem } from "./List";
import { Answers, Current, Items } from "./types";

export type BaseListProps = {
  data: string[];
  current: Current;
  value: Answers;
  onChecked: (selected: string) => void;
};

export const BaseList = ({
  data,
  current,
  onChecked,
  value,
}: BaseListProps) => {
  return (
    <List data={data}>
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
                  onChecked(question);
                }}
                disabled={value.has(question)}
                completed={value.has(question)}
              />
            ))}
          </React.Fragment>
        );
      }}
    </List>
  );
};
