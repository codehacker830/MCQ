import { storiesOf } from "@storybook/react";
import React from "react";

import { ContentCenterWrapper } from "../../../../componentsV0/ContentCenterWrapper";
import { PlaceholderProvider } from "../../../../store";
import { ExamOverviewMarkings } from "./ExamOverviewMarkings";

const stories = storiesOf("Exam Overview", module);

stories.addDecorator(story => (
  <PlaceholderProvider>{story()}</PlaceholderProvider>
));

stories.add("ExamOverviewMarkings", () => {
  //

  return (
    <div style={{ display: "flex", marginTop: 24 }}>
      <ContentCenterWrapper style={{ width: "50%" }}>
        <ExamOverviewMarkings />
      </ContentCenterWrapper>
    </div>
  );
});
