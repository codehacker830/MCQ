import { ExamQuizPage } from "../../features/exam-taking";
import { NavigationLinks } from "../types/NavigationLinks";

/**
 * Exam link for in progress exam.
 */
export const navigationLinksExam: NavigationLinks = [
  {
    titleLocalizationKey: "routes_ExamTaking_ExamQuizPage",
    to: "/exam",
    component: ExamQuizPage,
  },
];
