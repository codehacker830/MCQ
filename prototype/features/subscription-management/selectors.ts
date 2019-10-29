import { createSelector } from "reselect";
import { State } from "../../store";

const subscriptionsSelector = (state: State) =>
  state.subscriptionManagement.subscriptions;

export const isOnboardingSelector = createSelector(
  subscriptionsSelector,
  subscriptions => {
    if (subscriptions === null) return true;

    return false;
  },
);
