import React, { PropsWithoutRef, SFC } from "react";
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";
import styled from "styled-components";
import { bottomNavBoxShadow } from "../../../../css";
import { strings } from "../../../localization";
import { INavigationLink } from "../../models/INavigationLink";

import BottomNavigation, {
  BottomNavigationProps,
} from "@material-ui/core/BottomNavigation";
import BottomNavigationAction, {
  BottomNavigationActionProps,
} from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";

import { BottomToolbarDockPortalPlaceholder } from "../BottomToolbarDock";
import { NavTheme } from "../NavTheme";
import { PageContentWrapper } from "../PageContentWrapper";

export type SwipeableNavProps = {
  links: INavigationLink[];

  bottomNavigationValue: string;
  swipeableViewsClassName?: string;
  swipeableViewsPaneIndex: number;

  onBottomNavigationChange: BottomNavigationProps["onChange"];
  onSwipeableViewsChangeIndex: (paneIndex: number) => any;
};

export const SwipeableNav: SFC<SwipeableNavProps> = props => {
  const {
    links,
    bottomNavigationValue,
    swipeableViewsClassName,
    swipeableViewsPaneIndex,
    onBottomNavigationChange,
    onSwipeableViewsChangeIndex,
  } = props;

  return (
    <Wrapper className="swipeable-nav">
      {/* Place bottom navigation first so shadow overlaps swipe panes. */}
      <NavTheme>
        <StyledBottomNavigation
          value={bottomNavigationValue}
          onChange={onBottomNavigationChange}
        >
          {links.map(l => (
            <StyledBottomNavigationAction
              key={l.titleLocalizationKey}
              icon={l.iconElement}
              value={l.to}
              label={strings[l.titleLocalizationKey]}
            />
          ))}
        </StyledBottomNavigation>
      </NavTheme>

      <StyledSwipeableViews
        // Dynamically setting height causes some panes to be cut short when
        // resizing the window horizontally.
        // animateHeight
        className={swipeableViewsClassName}
        index={swipeableViewsPaneIndex}
        onChangeIndex={onSwipeableViewsChangeIndex}
      >
        {links.map(({ component: PaneComponent, titleLocalizationKey }) => (
          <PageContentWrapper key={titleLocalizationKey}>
            <PaneComponent />
          </PageContentWrapper>
        ))}
      </StyledSwipeableViews>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledBottomNavigation = styled((props: BottomNavigationProps) => (
  <StyledPaper square>
    <BottomToolbarDockPortalPlaceholder />
    <BottomNavigation showLabels {...props} />
  </StyledPaper>
))`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const StyledPaper = styled(Paper)`
  ${bottomNavBoxShadow};
  order: 2;
  z-index: 1;
`;

const StyledBottomNavigationAction = styled(
  ({ classes, ...rest }: BottomNavigationActionProps) => (
    <BottomNavigationAction
      classes={{
        ...classes,
        label: "label",
        selected: "selected",
      }}
      {...rest}
    />
  ),
)`
  color: rgba(255, 255, 255, 0.45);

  &.selected {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  .label {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
  }

  &.selected .label {
    font-size: 13px;
  }
`;

const StyledSwipeableViews = styled(
  (props: PropsWithoutRef<SwipeableViewsProps>) => (
    <SwipeableViews
      {...props}
      springConfig={{ duration: "0.3s", easeFunction: "linear", delay: "0s" }}
    />
  ),
)`
  height: calc(100% - 56px);

  /* Enable Momentum Scrolling on iOS */
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;
