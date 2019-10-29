import { ActionsUnion } from "../types";
import { Action } from "./action-helpers";

export const createReducer = <
  State,
  Actions extends ActionsUnion<any>,
  ActionTypes extends string
>(
  initialState: State,
  handlers: {
    [P in ActionTypes]: (
      state: State,
      action: Extract<Actions, Action<P>>,
    ) => State;
  },
) => (state: State = initialState, action: Actions): State => {
  if (handlers.hasOwnProperty(action.type)) {
    // @ts-ignore
    return handlers[action.type](state, action);
  }

  return state;
};
