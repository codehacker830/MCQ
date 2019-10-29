import { storiesOf } from "@storybook/react";
import React from "react";
import { drawerWidth } from "../../../../css";

import { ExamDrawerTimerInfoCard } from "./ExamDrawerTimerInfoCard";

storiesOf("Exam Taking", module).add("ExamDrawerTimerInfoCard", () => {
  //

  return (
    <div style={{ margin: 24, width: drawerWidth }}>
      <ExamDrawerTimerInfoCard>Placeholder</ExamDrawerTimerInfoCard>
    </div>
  );
});
