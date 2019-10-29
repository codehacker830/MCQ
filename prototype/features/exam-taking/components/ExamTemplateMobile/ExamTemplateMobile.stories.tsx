import { storiesOf } from "@storybook/react";
import React from "react";
import { createExamPaneKeyNodeMapPlaceholder } from "../../placeholders/createExamPaneKeyNodeMapPlaceholder";

import { PlaceholderProvider } from "../../../../store";
import { ExamTemplateMobile } from "./ExamTemplateMobile";

storiesOf("Exam Taking", module)
  .addDecorator(story => <PlaceholderProvider>{story()}</PlaceholderProvider>)
  .add("ExamTemplateMobile", () => {
    const paneKeyNodeMap = createExamPaneKeyNodeMapPlaceholder();

    return (
      <ExamTemplateMobile
        paneKeyNodeMap={paneKeyNodeMap}
        featureKey="examTaking"
      >
        Placeholder
      </ExamTemplateMobile>
    );
  });
