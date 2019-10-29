import React from "react";
import { Route } from "react-router-dom";
import { routePathFromLocalizationKey } from "../navigation";

import { LandingPage } from "./LandingPage";
import { PasswordResetPage } from "./PasswordResetPage";
import { TermsConditionsPage } from "./TermsConditionsPage";

export const pages = [
  <Route
    key="landing"
    path={routePathFromLocalizationKey("routes_Landing_LandingPage")}
    exact
    component={LandingPage}
  />,

  <Route
    key="password"
    path={routePathFromLocalizationKey("routes_Landing_PasswordResetPage")}
    component={PasswordResetPage}
  />,

  <Route
    key="terms"
    path={routePathFromLocalizationKey("routes_Landing_TermsConditions")}
    component={TermsConditionsPage}
  />,
];
