import React, { Component, ReactNode } from "react";
import styled, { css } from "styled-components";

import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";

import { Typography } from "../Typography";
// import { SideSheetToggleStateConsumer } from "./SideSheetToggleState";
import { SideSheetToggleStoreConsumer } from "./SideSheetToggleStore";

export interface SideSheetProps {
  sideSheetTitle?: string;
  sideSheetContents?: ReactNode;
}

/**
 * Provides a persistent right mounted panel on medium and large width
 * viewports. On mobile, it is hidden by default and revealable through the use
 * of a button.
 *
 * When no children are provided, it avoids becomes invisible and avoids
 * affecting the layout.
 */
export class SideSheet extends Component<SideSheetProps> {
  render() {
    const { children, sideSheetTitle, sideSheetContents } = this.props;

    const panelNode = (
      <PanelContainer>
        {sideSheetTitle && (
          <Typography variant="cardTitle">{sideSheetTitle}</Typography>
        )}

        {sideSheetContents}
      </PanelContainer>
    );

    const sheetHasContents = Boolean(sideSheetContents);

    return (
      <SideSheetToggleStoreConsumer>
        {store => {
          const fixedSheetVisible = sheetHasContents && store.fixedPanelVisible;

          if (store.toggleButtonVisibility !== sheetHasContents) {
            setTimeout(() => {
              store.setToggleButtonVisibility(sheetHasContents);
            }, 166);
          }

          return (
            <SplitContainer sheetVisible={fixedSheetVisible}>
              {children}

              {fixedSheetVisible && (
                <PanelFixedPositioning>{panelNode}</PanelFixedPositioning>
              )}

              {!fixedSheetVisible && (
                <DrawerWithMobileWidth
                  anchor="right"
                  elevation={2}
                  onClose={store.toggleOpen}
                  open={store.open}
                >
                  {panelNode}
                </DrawerWithMobileWidth>
              )}
            </SplitContainer>
          );
        }}
      </SideSheetToggleStoreConsumer>
    );
  }
}

interface SheetVisibleProp {
  sheetVisible: boolean;
}

const panelWidthTablet = 320;

const SplitContainer = styled.div<SheetVisibleProp>`
  ${({ sheetVisible }) =>
    sheetVisible &&
    `
      margin-right: ${panelWidthTablet}px;
    `}
`;

const PanelContainer = styled.div`
  width: ${panelWidthTablet}px;
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px`};
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow-y: auto;
`;

const PanelFixedPositioning = styled(Paper).attrs({ elevation: 1 })`
  position: fixed;
  right: 0;
  background-color: transparent !important;

  ${createToolbarHeightBasedCss(
    height => `
      top: ${height}px;
      height: calc(100% - ${height}px);
    `,
  )};
`;

const DrawerWithMobileWidth = styled(Drawer)`
  ${PanelContainer} {
    width: calc(100vw - ${({ theme }) => theme.spacing(7)}px);
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    ${PanelContainer} {
      max-width: ${panelWidthTablet}px;
    }
  }
`;

function createToolbarHeightBasedCss(render: (height: number) => string) {
  return css`
    ${render(56)};

    ${({ theme }) => theme.breakpoints.up("xs")} and (orientation: landscape) {
      ${render(48)};
    }

    ${({ theme }) => theme.breakpoints.up("sm")} {
      ${render(64)};
    }
  `;
}
