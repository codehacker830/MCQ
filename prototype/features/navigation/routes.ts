import { LocalizationKey } from "../../types";

export const routes: {
  path: string;
  pageTitleLocalizationKey: LocalizationKey;
}[] = [
  {
    path: "/",
    pageTitleLocalizationKey: "routes_Landing_LandingPage",
  },
  {
    path: "/reset-password",
    pageTitleLocalizationKey: "routes_Landing_PasswordResetPage",
  },
  {
    path: "/terms-conditions",
    pageTitleLocalizationKey: "routes_Landing_TermsConditions",
  },
  {
    path: "/dashboard",
    pageTitleLocalizationKey: "routes_ProgressOverview_ProgressOverviewPage",
  },
  {
    path: "/membership/subscriptions",
    pageTitleLocalizationKey: "routes_Dashboard_MembershipSubscriptionPage",
  },
  {
    path: "/membership/subscriptions/add",
    pageTitleLocalizationKey: "routes_Dashboard_MembershipEntriesPage",
  },
  {
    path: "/membership/subscriptions/payment",
    pageTitleLocalizationKey: "routes_SubscriptionManagement_PaymentPage",
  },
  {
    path: "/exam-pack",
    pageTitleLocalizationKey: "routes_ExamBoard_ExamBoardPage",
  },
  {
    path: "/exam",
    pageTitleLocalizationKey: "routes_ExamTaking_ExamQuizPage",
  },
  {
    path: "/exam-revise",
    pageTitleLocalizationKey: "routes_ExamReview_ExamReviewPage",
  },
  {
    path: "/settings",
    pageTitleLocalizationKey: "routes_Dashboard_SettingsPage",
  },
  {
    path: "/welcome/entries",
    pageTitleLocalizationKey: "routes_Dashboard_OnboardingEntriesPage",
  },
  {
    path: "/welcome/subscriptions",
    pageTitleLocalizationKey: "routes_Dashboard_OnboardingSubscriptionPage",
  },
];

export const routePathFromLocalizationKey = (
  localizationKey: LocalizationKey,
) => {
  const route = routes.find(
    r => r.pageTitleLocalizationKey === localizationKey,
  );
  if (!route) {
    throw new Error(
      `No route matches the provided localization key: ${localizationKey}`,
    );
  }
  return route.path;
};
