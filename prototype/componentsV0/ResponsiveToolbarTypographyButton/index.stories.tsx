import { storiesOf } from "@storybook/react";
import React from "react";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Add from "@material-ui/icons/Add";

import { ResponsiveToolbarTypographyButton } from ".";
import { StorybookContentCenterWrapper } from "../storybook/StorybookContentCenterWrapper";

storiesOf("Components V0", module)
  .addParameters({
    info: { propTablesExclude: [StorybookContentCenterWrapper] },
  })
  .add("ResponsiveToolbarTypographyButton", () => {
    //

    return (
      <StorybookContentCenterWrapper>
        <Paper>
          <Toolbar>
            <div style={{ flex: 1 }} />

            <ResponsiveToolbarTypographyButton
              color="orange"
              iconNode={<Add />}
              tooltipTitle="Add New Entry"
            >
              Entry
            </ResponsiveToolbarTypographyButton>
          </Toolbar>
        </Paper>
      </StorybookContentCenterWrapper>
    );
  });
