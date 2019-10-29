import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { drawerWidth } from "../../../../css";
import { UserAppDrawerTheme } from "../../../../theme";

import { ExamDrawerPerformanceAnalysis } from "./ExamDrawerPerformanceAnalysis";

const stories = storiesOf("Exam Taking", module);

stories.addDecorator(story => (
  <div style={{ margin: 24, width: drawerWidth, backgroundColor: "#03285b" }}>
    <UserAppDrawerTheme>{story()}</UserAppDrawerTheme>
  </div>
));

stories.add("ExamDrawerPerformanceAnalysis", () => {
  const examResult = boolean("Exam Result (Passed)", true) ? "pass" : "fail";

  return <ExamDrawerPerformanceAnalysis examResult={examResult} />;
});
