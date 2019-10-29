import { IExamQuestion } from "../models/IExamQuestion";

export const createExamQuestionPlaceholder = (): IExamQuestion[] =>
  Array.from({ length: 15 }, (): IExamQuestion => ({ status: "not-visited" }));
