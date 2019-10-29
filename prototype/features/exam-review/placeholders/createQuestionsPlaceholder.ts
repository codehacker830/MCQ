import { IExamQuestion } from "../../exam-taking";

const statuses: IExamQuestion["status"][] = [
  "answered",
  "not-answered",
  "marked-for-review",
  "not-visited",
];

/**
 * Creates placeholder questions for use in store. Questions are created to
 * mimic possible state from a submitted exam.
 */
export const createQuestionsPlaceholder = (): IExamQuestion[] => {
  return Array.from(
    { length: 15 },
    (): IExamQuestion => ({
      status: statuses[Math.floor(Math.random() * 4)],
    }),
  );
};
