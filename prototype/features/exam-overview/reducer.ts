// import { Actions, ActionTypes } from "./actions";
import { IExamMeta } from "./models/IExamMeta";
import { createExamMetaPlaceholder } from "./placeholders/createExamMetaPlaceholder";

export type State = {
  // TODO: Make use of a web request thunk.
  examMeta: IExamMeta;
};

const initialState: State = {
  examMeta: createExamMetaPlaceholder(),
};

export const reducer = (
  state: State = initialState,
  // action: Actions,
): State => {
  return state;
};
