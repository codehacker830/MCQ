import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

import { ICategorySubscriptions } from "./models/ICategorySubscriptions";

export enum SubscriptionManagementAction {
  LoadPlaceholderData = "[subscription-management] Load Placeholder Data",

  SubscriptionAdditionSuccess = "[subscription-management] Subscription Addition Success",

  // TODO: Remove this after development, it is used to skip the onboarding process.
  SetSkipOnboardingProcess = "[subscription-management] Skip Onboarding Process",
}

export const actions = {
  loadPlaceholderData: () =>
    createAction(SubscriptionManagementAction.LoadPlaceholderData),

  subscriptionAdditionSuccess: (subscriptions: ICategorySubscriptions) =>
    createAction(
      SubscriptionManagementAction.SubscriptionAdditionSuccess,
      subscriptions,
    ),

  // TODO: Remove this after development, it is used to skip the onboarding process.
  setSkipOnboardingProcess: () =>
    createAction(SubscriptionManagementAction.SetSkipOnboardingProcess),
};

export type Actions = ActionsUnion<typeof actions>;
