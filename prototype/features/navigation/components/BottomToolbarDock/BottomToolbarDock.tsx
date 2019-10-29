import React, { ReactNode } from "react";
import styled from "styled-components";
import { drawerWidth, fromToolbarHeight } from "../../../../css";

import {
  BottomToolbarDockPortal,
  BottomToolbarDockPortalProps,
} from "./BottomToolbarDockPortal";

export type BottomToolbarDockProps = Pick<
  BottomToolbarDockPortalProps,
  "matchedRoutes"
> & {
  className?: string;
  toolbarNode: ReactNode;
};

/**
 * Renders the toolbar node within a fixed position div when there is no parent
 * swipeable interface layout. When a swipeable interface layout is a parent,
 * the toolbar is rendered above the bottom nav bar of the swipe interface.
 */
export const BottomToolbarDock = styled(
  (
    props: BottomToolbarDockProps & {
      children?: ReactNode;
    },
  ) => {
    const { className, children, toolbarNode, matchedRoutes } = props;

    return (
      <div className={className}>
        <BottomToolbarDockPortal
          matchedRoutes={matchedRoutes}
          NonPortalWrapperComponent={ToolbarWrapper}
        >
          {toolbarNode}
        </BottomToolbarDockPortal>

        {children}

        <ToolbarSpacer />
      </div>
    );
  },
)`
  height: 100%;
  overflow-y: auto;

  /* Remove padding from ContentCenterWrapper */
  width: calc(100% + 32px);
  padding: 16px;
  margin: -16px;
`;

const ToolbarSpacer = styled.div`
  ${fromToolbarHeight("height", height => `${height - 8}px`)};
`;

const ToolbarWrapper = styled.div`
  ${fromToolbarHeight("height")};

  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding-left: ${drawerWidth}px;
  }
`;
