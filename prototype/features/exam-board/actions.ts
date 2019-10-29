import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

export enum ActionTypes {
  LoadPlaceholderData = "[exam-board] Load Placeholder Data",
}

export const actions = {
  loadPlaceholderData: () => createAction(ActionTypes.LoadPlaceholderData),
};

export type Actions = ActionsUnion<typeof actions>;
