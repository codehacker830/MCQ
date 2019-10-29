import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { DashboardAppBarIconGroup } from ".";
import { DashboardAppBarIconStore } from "../../stores";
import { Button } from "../Button";

storiesOf("Components V0", module).add("DashboardAppBarIconGroup", () => {
  //
  /* tslint:disable-next-line:no-console */

  return (
    <DashboardAppBarIconStore.Provider>
      <AppBar position="static">
        <Toolbar>
          <DashboardAppBarIconStore.Consumer>
            {({ iconGroups }) => iconGroups.map(i => i.iconGroupNode)}
          </DashboardAppBarIconStore.Consumer>
        </Toolbar>
      </AppBar>

      <DashboardAppBarIconGroup iconGroupKey="dashboard-app-bar-icon-group-story">
        <>
          <ButtonWithRightMargin color="inherit">Sign-in</ButtonWithRightMargin>
          <ButtonWithRightMargin color="inherit">Logout</ButtonWithRightMargin>
        </>
      </DashboardAppBarIconGroup>

      <DashboardAppBarIconGroup iconGroupKey="dashboard-app-bar-icon-group-story-2">
        <ButtonWithRightMargin color="inherit">Other</ButtonWithRightMargin>
      </DashboardAppBarIconGroup>
    </DashboardAppBarIconStore.Provider>
  );
});

const ButtonWithRightMargin = styled(Button)`
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;
