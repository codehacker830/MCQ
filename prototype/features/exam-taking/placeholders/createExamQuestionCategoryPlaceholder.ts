import { IExamQuestionCategory } from "../models/IExamQuestionCategory";

export const createExamQuestionCategoryPlaceholder = (): IExamQuestionCategory[] => [
  { title: { en: "General Knowledge" }, questionCount: 10 },
  { title: { en: "Maths" }, questionCount: 5 },
];
