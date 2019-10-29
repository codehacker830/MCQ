import { IEntry, IEntryCategory } from "../../models";
import { createReducer } from "../../utils";
import { Actions, SubscriptionManagementAction } from "./actions";
import { ICategoryQuantitySelectionSettings } from "./models/ICategoryQuantitySelectionSettings";
import { ICategorySubscriptions } from "./models/ICategorySubscriptions";

import { createCategoryQuantitySelectionSettingsPlaceholder } from "./placeholders/createCategoryQuantitySelectionSettingsPlaceholder";
import { createEntryCategoryPlaceholders } from "./placeholders/createEntryCategoryPlaceholders";
import { createEntryPlaceholders } from "./placeholders/createEntryPlaceholders";

type State = {
  loading: boolean;
  loaded: boolean;

  // TODO: Remove this after development, it is used to skip the onboarding process.
  skipOnboardingProcess: boolean;

  entries: IEntry[];
  categories: IEntryCategory[];
  categoryQuantitySelectionSettings: ICategoryQuantitySelectionSettings | null;

  subscriptions: ICategorySubscriptions | null;
};

const initialState: State = {
  loading: true,
  loaded: false,

  // TODO: Remove this after development, it is used to skip the onboarding process.
  skipOnboardingProcess: false,

  entries: [],
  categories: [],
  categoryQuantitySelectionSettings: null,

  subscriptions: null,
};

export const reducer = createReducer<
  State,
  Actions,
  SubscriptionManagementAction
>(initialState, {
  [SubscriptionManagementAction.LoadPlaceholderData]: state => ({
    ...state,
    loading: false,
    loaded: true,

    entries: createEntryPlaceholders(),
    categories: createEntryCategoryPlaceholders(),
    categoryQuantitySelectionSettings: createCategoryQuantitySelectionSettingsPlaceholder(),
  }),

  [SubscriptionManagementAction.SubscriptionAdditionSuccess]: (
    state,
    action,
  ) => ({
    ...state,
    subscriptions: (state.subscriptions || []).concat(action.payload),
  }),

  // TODO: Remove this after development, it is used to skip the onboarding process.
  [SubscriptionManagementAction.SetSkipOnboardingProcess]: state => ({
    ...state,
    skipOnboardingProcess: true,
  }),
});
