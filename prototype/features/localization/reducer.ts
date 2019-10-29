import { Actions, LocalizationAction } from "./actions";
import { strings } from "./strings";

interface State {
  localizationLanguage: "en" | "hi";
}

const initialState: State = {
  localizationLanguage: "en",
};

export const reducer = (
  state: State = initialState,
  action: Actions,
): State => {
  switch (action.type) {
    case LocalizationAction.SetLocalizationLanguage: {
      const { payload: localizationLanguage } = action;

      strings.setLanguage(localizationLanguage);

      return { ...state, localizationLanguage };
    }

    default: {
      return state;
    }
  }
};
