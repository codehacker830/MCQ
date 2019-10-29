import React from "react";
import { Route } from "react-router-dom";
import { routePathFromLocalizationKey } from "../navigation";
import { ExamReviewPage } from "./ExamReviewPage";

export const pages = [
  <Route
    key="exam-review-page"
    path={routePathFromLocalizationKey("routes_ExamReview_ExamReviewPage")}
    exact
    component={ExamReviewPage}
  />,
];
