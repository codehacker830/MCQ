import { storiesOf } from "@storybook/react";
import React from "react";
import { drawerWidth } from "../../../../css";
import { UserAppDrawerTheme } from "../../../../theme";

import { PlaceholderProvider } from "../../../../store";
import { ExamDrawerQuestionSelect } from "./ExamDrawerQuestionSelect";

storiesOf("Exam Taking", module)
  .addDecorator(story => <PlaceholderProvider>{story()}</PlaceholderProvider>)
  .add("ExamDrawerQuestionSelect", () => {
    return (
      <UserAppDrawerTheme>
        <div
          style={{ margin: 24, width: drawerWidth, backgroundColor: "#03285b" }}
        >
          <ExamDrawerQuestionSelect featureKey="examTaking" />
        </div>
      </UserAppDrawerTheme>
    );
  });
