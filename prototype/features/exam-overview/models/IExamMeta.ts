import { IExamMetaMarkings } from "./IExamMetaMarkings";
import { IExamMetaSubject } from "./IExamMetaSubject";

/**
 * Exam information displayed to a user before they start an exam.
 */
// tslint:disable-next-line: interface-name
export interface IExamMeta {
  /**
   * Information about the subjects covered by an exam. This is displayed
   * to the user before an exam begins.
   */
  subjects: IExamMetaSubject[];

  /**
   * Information about an exam, specifically, the number of marks per question
   * and exam duration in minutes. It is displayed to the user before an exam is
   * started.
   */
  markings: IExamMetaMarkings;
}
