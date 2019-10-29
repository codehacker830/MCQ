import { ActionsUnion } from "../../types";
// import { createAction } from "../../utils";

export enum ActionTypes {}
// LoadPlaceholderExamOverviewInfo = "[exam-overview] Load Placeholder Exam Overview Info",

export const actions = {
  // loadPlaceholderExamOverviewInfo: () =>
  //   createAction(ActionTypes.LoadPlaceholderExamOverviewInfo),
};

export type Actions = ActionsUnion<typeof actions>;
