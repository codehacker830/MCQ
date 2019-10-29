import { storiesOf } from "@storybook/react";
import React from "react";
import { drawerWidth } from "../../../../css";

import { ExamDrawerQuestionPalette } from ".";

storiesOf("Exam Taking", module).add("ExamDrawerQuestionPalette", () => {
  //

  return (
    <div style={{ margin: 24, width: drawerWidth }}>
      <ExamDrawerQuestionPalette />
    </div>
  );
});
