import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

export enum ExamTakingAction {
  LoadPlaceholderExam = "[exam-taking] Load Placeholder Exam",

  NavigateToQuestion = "[exam-taking] Navigate to Question",
  NavigateToPreviousQuestion = "[exam-taking] Navigate to Previous Question",
  NavigateToNextQuestion = "[exam-taking] Navigate to Next Question",

  DismissOverviewScreen = "[exam-taking] Dismiss Overview Screen",
  DisplaySubmissionSummaryScreen = "[exam-taking] Display Submission Summary Screen",
}

export const actions = {
  loadPlaceholderExam: () => createAction(ExamTakingAction.LoadPlaceholderExam),

  navigateToQuestion: (questionIndex: number) =>
    createAction(ExamTakingAction.NavigateToQuestion, questionIndex),
  navigateToPreviousQuestion: () =>
    createAction(ExamTakingAction.NavigateToPreviousQuestion),
  navigateToNextQuestion: () =>
    createAction(ExamTakingAction.NavigateToNextQuestion),

  dismissOverviewScreen: () =>
    createAction(ExamTakingAction.DismissOverviewScreen),

  displaySubmissionSummaryScreen: () =>
    createAction(ExamTakingAction.DisplaySubmissionSummaryScreen),
};

export type Actions = ActionsUnion<typeof actions>;
