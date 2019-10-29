import React, { cloneElement, ReactElement, SFC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State } from "../../store";

import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/icons/Menu";

import { LogoutButton } from "../../features/navigation";
import { DrawerStateConsumer } from "../ResponsiveDrawerFrame";

type StateProps = {
  locationPageTitleWithoutProductName: string;
};

type OwnProps = {
  /**
   * Whether to show hamburger button.
   *
   * @default true
   */
  showHamburgerButton?: boolean;

  /**
   * Whether to display the title in the app bar on mobile viewpoints.
   */
  showAppTitleOnMobile?: boolean;

  /**
   * Additional buttons to place to the left of the logout button.
   */
  actionButtonElements?: ReactElement<any>[];
};
export type DashboardAppBarProps = OwnProps;

type Props = StateProps & OwnProps;

/**
 * App bar for both admin and user dashboards. Implements a persistent
 * navigation drawer.
 *
 * The implementation is based on the example here:
 * https://material-ui-next.com/demos/drawers/#persistent-drawer
 */
const DashboardAppBar: SFC<Props> = props => {
  const {
    showHamburgerButton = true,
    showAppTitleOnMobile = false,
    actionButtonElements: outerActionButtonElements,
    locationPageTitleWithoutProductName,
  } = props;

  let actionButtonNodes: typeof outerActionButtonElements;
  if (outerActionButtonElements) {
    actionButtonNodes = outerActionButtonElements.map((node, index) =>
      !node.key ? cloneElement(node, { key: index }) : node,
    );
  }

  return (
    <StyledToolbar>
      {showHamburgerButton && (
        <DrawerStateConsumer>
          {drawerState => (
            <IconButton
              className="menu-button"
              color="inherit"
              aria-label="Menu"
              onClick={drawerState.toggleDrawer}
            >
              <Menu />
            </IconButton>
          )}
        </DrawerStateConsumer>
      )}

      <Hidden smDown={!showAppTitleOnMobile} implementation="css">
        <Typography variant="h2" color="inherit" style={{ fontWeight: 400 }}>
          {locationPageTitleWithoutProductName}
        </Typography>
      </Hidden>
      <div style={{ flex: 1 }} />

      {actionButtonNodes}

      <LogoutButton />
    </StyledToolbar>
  );
};

const DashboardAppBarContainer = connect<StateProps, {}, OwnProps, State>(
  ({ navigation }) => ({
    locationPageTitleWithoutProductName:
      navigation.locationPageTitleWithoutProductName,
  }),
)(DashboardAppBar);
export { DashboardAppBarContainer as DashboardAppBar };

const StyledToolbar = styled(Toolbar)`
  .menu-button {
    margin-left: -12px;
    margin-right: 20px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    .menu-button {
      display: none;
    }
  }
`;
