/**
 * Information about an exam, specifically, the number of marks per question and
 * exam duration in minutes. It is displayed to the user before an exam is
 * started.
 */
// tslint:disable-next-line: interface-name
export interface IExamMetaMarkings {
  /** Total marks possible from completing an exam. */
  totalMarks: number;

  /** Marks required to pass the exam. */
  passingMarks: number;

  /** Maximum minutes available to complete the exam. */
  totalTimeMinutes: number;

  /** Number of questions in the exam. */
  questionsCount: number;

  /** Number of marks awarded for answering a question correctly. */
  marksPerCorrectAnswer: number;

  /** Number of marks deducted for incorrectly answering a question. */
  marksPerIncorrectAnswer: number;
}
