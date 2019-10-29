import { storiesOf } from "@storybook/react";
import React from "react";

import { PlaceholderProvider } from "../../../../store";
import { ExamAppBar } from "./ExamAppBar";

storiesOf("Exam Taking", module)
  .addDecorator(story => <PlaceholderProvider>{story()}</PlaceholderProvider>)
  .add("ExamAppBar", () => {
    //

    return <ExamAppBar featureKey="examTaking" />;
  });
