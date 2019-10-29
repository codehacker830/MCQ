import { IEntry, IEntryCategory } from "../../models";
import { createReducer } from "../../utils";
import { Actions, LandingAction } from "./actions";
import { IIndexCardColors } from "./models/IIndexCardColors";

type State = {
  indexCardEntries: IEntry[] | null;
  indexCardEntryCategories: IEntryCategory[] | null;
  indexCardColors: IIndexCardColors[] | null;
};

const initialState: State = {
  indexCardEntries: null,
  indexCardEntryCategories: null,
  indexCardColors: null,
};

export const reducer = createReducer<State, Actions, LandingAction>(
  initialState,
  {
    [LandingAction.FetchIndexCardEntriesSuccess]: (state, { payload }) => ({
      ...state,
      indexCardEntries: payload.indexCardEntries,
      indexCardEntryCategories: payload.indexCardEntryCategories,
      indexCardColors: payload.indexCardColors,
    }),
  },
);
