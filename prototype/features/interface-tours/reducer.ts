import { createReducer } from "../../utils";
import { Actions, ActionTypes } from "./actions";

export type State = {
  postSignupDialogsShown: boolean;
};

const initialState: State = {
  postSignupDialogsShown: false,
};

export const reducer = createReducer<State, Actions, ActionTypes>(
  initialState,
  {
    [ActionTypes.DismissPostSignupDialogs]: state => ({
      ...state,
      postSignupDialogsShown: true,
    }),
  },
);
