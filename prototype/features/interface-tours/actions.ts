import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

export enum ActionTypes {
  DismissPostSignupDialogs = "[dashboard] DismissPostSignupDialogs",
}

export const actions = {
  dismissPostSignupDialogs: () =>
    createAction(ActionTypes.DismissPostSignupDialogs),
};

export type Actions = ActionsUnion<typeof actions>;
