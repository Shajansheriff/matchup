export interface Item {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}
export type Items = Item[];

export type QuestionId = string;
export type AnswerId = string;
export type Current = [QuestionId | null, AnswerId | null];
export type Answer = [QuestionId, AnswerId];
export type Answers = Map<string, string>;
export type QueryStatus = "idle" | "fetching" | "success" | "error";
