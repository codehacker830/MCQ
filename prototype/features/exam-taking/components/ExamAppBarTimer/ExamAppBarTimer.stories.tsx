import { storiesOf } from "@storybook/react";
import React from "react";
import { DarkTheme } from "../../../../theme";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { ExamAppBarTimer } from "./ExamAppBarTimer";

storiesOf("Exam Taking", module).add("ExamAppBarTimer", () => {
  //

  return (
    <DarkTheme>
      <AppBar position="static" color="inherit">
        <Toolbar style={{ justifyContent: "center" }}>
          <ExamAppBarTimer />
        </Toolbar>
      </AppBar>
    </DarkTheme>
  );
});
