import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { StorybookPlaceholderImage } from "../../../../componentsV0/storybook/StorybookPlaceholderImage";
import { storybookPlaceholderImageUrl } from "../../../../componentsV0/storybook/storybookPlaceholderImageUrl";
import { ExamContents } from "./ExamContents";

storiesOf("Exam Taking", module).add("ExamContents", () => {
  const isHorizontal = boolean("Horizontal", true);
  const withImage = boolean("With Image", true);

  const orientation = isHorizontal ? "horizontal" : "vertical";
  const questionImageUrl = withImage ? storybookPlaceholderImageUrl : undefined;

  return (
    <StorybookContentCenterWrapper>
      <ExamContents
        orientation={orientation}
        questionImageUrl={questionImageUrl}
        answerNode={<StorybookPlaceholderImage />}
      />
    </StorybookContentCenterWrapper>
  );
});
