import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createExamPaneKeyNodeMapPlaceholder } from "../../placeholders/createExamPaneKeyNodeMapPlaceholder";

import { PlaceholderProvider } from "../../../../store";
import { ExamTemplate } from "./ExamTemplate";

storiesOf("Exam Taking", module)
  .addParameters({ info: { inline: false } })
  .addDecorator(story => <PlaceholderProvider>{story()}</PlaceholderProvider>)
  .add("ExamTemplate", () => {
    const paneKeyNodeMap = createExamPaneKeyNodeMapPlaceholder();

    return (
      <BrowserRouter>
        <ExamTemplate paneKeyNodeMap={paneKeyNodeMap} featureKey="examTaking">
          Placeholder
        </ExamTemplate>
      </BrowserRouter>
    );
  });
