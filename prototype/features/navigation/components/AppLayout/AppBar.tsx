import React, { ReactNode, SFC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { drawerWidth } from "../../../../css";
import { State } from "../../../../store";

import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { LanguageToggleButton } from "../../../localization";
import { LogoutButton } from "./LogoutButton";

type StateProps = {
  locationPageTitleWithoutProductName: string;
};

type OwnProps = {};
export type AppBarProps = OwnProps;

type Props = StateProps & OwnProps;

const AppBar: SFC<Props> = props => {
  const { locationPageTitleWithoutProductName } = props;

  return (
    <ResponsiveWidthAppBar>
      <Toolbar>
        {/* Page Title */}
        <Typography variant="h3" color="inherit" style={{ fontWeight: 400 }}>
          {locationPageTitleWithoutProductName}
        </Typography>

        <FlexSpacer />

        <LanguageToggleButton />
        <LogoutButton />
      </Toolbar>
    </ResponsiveWidthAppBar>
  );
};

const AppBarContainer = connect<StateProps, {}, OwnProps, State>(
  ({ navigation: { locationPageTitleWithoutProductName } }) => ({
    locationPageTitleWithoutProductName,
  }),
)(AppBar);
export { AppBarContainer as AppBar };

const ResponsiveWidthAppBar = styled(
  ({ className, children }: { children?: ReactNode; className?: string }) => (
    <MuiAppBar className={className} color="inherit">
      {children}
    </MuiAppBar>
  ),
)`
  width: 100%;
  left: 0;

  ${({ theme }) => theme.breakpoints.up("md")} {
    left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }
`;

const FlexSpacer = styled.div`
  flex: 1;
`;
