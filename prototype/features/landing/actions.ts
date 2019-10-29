import { IEntry, IEntryCategory } from "../../models";
import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";
import { IIndexCardColors } from "./models/IIndexCardColors";

export enum LandingAction {
  FetchIndexCardEntriesSuccess = "[landing] Fetch Index Card Entries Success",
}

export const actions = {
  fetchIndexCardEntriesSuccess: (
    indexCardEntries: IEntry[],
    indexCardEntryCategories: IEntryCategory[],
    indexCardColors: IIndexCardColors[],
  ) =>
    createAction(LandingAction.FetchIndexCardEntriesSuccess, {
      indexCardEntries,
      indexCardEntryCategories,
      indexCardColors,
    }),
};

export type Actions = ActionsUnion<typeof actions>;
