import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { ExamSubmissionSummary } from "./ExamSubmissionSummary";
import { examSubmissionSummaryPlaceholderProps } from "./ExamSubmissionSummary.placeholder";

storiesOf("Exam Taking", module).add("ExamSubmissionSummary", () => {
  const props = examSubmissionSummaryPlaceholderProps;

  return (
    <StorybookContentCenterWrapper>
      <ExamSubmissionSummary {...props}>Placeholder</ExamSubmissionSummary>
    </StorybookContentCenterWrapper>
  );
});
