import { action } from "@storybook/addon-actions";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import {
  ExamAnswerSelectItem,
  ExamAnswerSelectItemProps,
} from "./ExamAnswerSelectItem";

const stories = storiesOf("Exam Taking", module);

stories.addParameters({
  info: { propTablesExclude: [StorybookContentCenterWrapper] },
});

stories.add("ExamAnswerSelectItem", () => {
  const selectionStyle = select<ExamAnswerSelectItemProps["selectionStyle"]>(
    "Selection Style",
    {
      "User Correct": "user-correct",
      "User Incorrect": "user-incorrect",
      "Exam Correct": "exam-correct",
    },
    "user-correct",
  );

  return (
    <StorybookContentCenterWrapper maxWidthPercent={50}>
      <ExamAnswerSelectItem
        answerLabel="Lat"
        answerIndex={0}
        selected={boolean("Selected", true)}
        selectionStyle={selectionStyle}
        onClick={action("onClick")}
      />
    </StorybookContentCenterWrapper>
  );
});
