import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

export enum LocalizationAction {
  SetLocalizationLanguage = "[localization] Set Localization Language",
}

export const actions = {
  setLocalizationLanguage: (localizationLanguage: "en" | "hi") =>
    createAction(
      LocalizationAction.SetLocalizationLanguage,
      localizationLanguage,
    ),
};

export type Actions = ActionsUnion<typeof actions>;
