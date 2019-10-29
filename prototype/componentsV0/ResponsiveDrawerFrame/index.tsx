import React, { cloneElement, ReactElement, ReactNode, SFC } from "react";
import styled from "styled-components";
import { drawerWidth, fromToolbarHeight } from "../../css";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import {
  DrawerProps,
  DrawerStateConsumer,
  DrawerStateProvider,
} from "./DrawerState";

export { DrawerStateConsumer, DrawerStateProvider };

export type ResponsiveDrawerFrameProps = DrawerProps & {
  /**
   * Page contents node.
   */
  children: ReactNode;

  /**
   * AppBar node.
   */
  appBarNode: ReactNode;

  /**
   * Drawer contents node.
   */
  drawerContentsNode: ReactNode;

  /**
   * Optional theme element to wrap drawer content in.
   */
  drawerThemeElement?: ReactElement<any>;

  backgroundColor?: string;
};

/**
 * Provides a container with spacing for an app drawer, app bar, and page
 * contents. Drawer is toggleable on mobile and persistent on tablet/desktop.
 */
export const ResponsiveDrawerFrame: SFC<ResponsiveDrawerFrameProps> = props => {
  const {
    appBarNode,
    children,
    mobileOpen,
    drawerContentsNode,
    drawerThemeElement,
    backgroundColor,
  } = props;

  const withTheme = (node: ReactNode) =>
    drawerThemeElement ? cloneElement(drawerThemeElement, {}, node) : node;

  return (
    <DrawerStateProvider mobileOpen={mobileOpen}>
      <DrawerStateConsumer>
        {drawerState => (
          <Wrapper className={drawerState.mobileOpen ? "mobile-open" : ""}>
            <AppBarContainer>{appBarNode}</AppBarContainer>

            {/* Mobile Drawer */}
            <Hidden mdUp>
              {withTheme(
                <StyledDrawer
                  variant="temporary"
                  anchor="left"
                  open={drawerState.mobileOpen}
                  onClose={drawerState.toggleDrawer}
                  classes={{ paper: "drawer-paper" }}
                  ModalProps={{ keepMounted: true }}
                >
                  {drawerContentsNode}
                </StyledDrawer>,
              )}
            </Hidden>

            {/* Tablet/Desktop Drawer */}
            <Hidden smDown implementation="css">
              {withTheme(
                <StyledDrawer
                  variant="permanent"
                  open
                  classes={{ paper: "drawer-paper" }}
                >
                  {drawerContentsNode}
                </StyledDrawer>,
              )}
            </Hidden>

            <PageContentsContainer style={{ backgroundColor }}>
              <PageContentsAppBarSpacer />

              {children}
            </PageContentsContainer>
          </Wrapper>
        )}
      </DrawerStateConsumer>
    </DrawerStateProvider>
  );
};

const toolBarHeight = fromToolbarHeight("height");

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AppBarContainer = styled.div`
  position: fixed;
  width: 100%;
  ${toolBarHeight};
  z-index: ${({ theme }) => theme.zIndex.appBar};

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: calc(100% - ${drawerWidth}px);
    left: ${drawerWidth}px;
  }
`;

const StyledDrawer = styled(Drawer)`
  .drawer-paper {
    width: ${drawerWidth}px;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    .drawer-paper {
      position: fixed;
    }
  }
`;

const PageContentsContainer = styled.div`
  height: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-left: ${drawerWidth}px;
  }
`;

const PageContentsAppBarSpacer = styled.div`
  ${toolBarHeight};
`;
