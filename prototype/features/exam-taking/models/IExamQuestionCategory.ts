import { LocalizedString } from "../../../types";

// tslint:disable-next-line: interface-name
export interface IExamQuestionCategory {
  /** Category title. */
  title: LocalizedString;

  /** Number of questions in the category. */
  questionCount: number;
}
