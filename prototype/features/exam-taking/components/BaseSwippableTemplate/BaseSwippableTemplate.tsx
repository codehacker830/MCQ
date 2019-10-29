import React, { Component, PropsWithoutRef, ReactNode } from "react";
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";
import styled from "styled-components";

export type BaseSwippableTemplateProps = {
  /**
   * Header node. Used for the app bar.
   */
  headerNode: ReactNode;

  /**
   * Content panes, in the order of appearance.
   */
  paneKeyNodeMap: { key: string; node: ReactNode }[];

  /**
   * Footer node. Used to display a bottom navigation.
   */
  footerNode?: ReactNode;

  /**
   * Animation duration of slide when the prop "selectedPane" changes. Value is
   * in milliseconds.
   *
   * @default 250
   */
  slideAnimationDuration?: number;

  /**
   * Pane to display.
   *
   * As part of page navigation, this will be set to the index corresponding to
   * the current page url.
   *
   * As part of the exam screen, this will be set to the question currently
   * being viewed.
   */
  selectedPane: number;

  /**
   * Called when the user slides from one pane to another.
   */
  onPaneChange: (paneIndex: number) => any;

  /**
   * A static view to render in place of the swipe container. When it is
   * provided, the swipe behavior is disabled and this component is rendered
   * instead of the panes.
   */
  staticView?: ReactNode;
};

/**
 * Provides a vertical layout with app bar, swippable panes, and optional bottom
 * navigation bar. This serves as a common base type to page navigation by
 * swiping or navigation amount items.
 */
export class BaseSwippableTemplate extends Component<
  BaseSwippableTemplateProps
> {
  private readonly scrollTopTargetClass = "swipeable-views-scroll-top-target";

  render() {
    const {
      headerNode,
      paneKeyNodeMap,
      footerNode,
      selectedPane,
      staticView,
    } = this.props;

    const panes = paneKeyNodeMap.map(({ key, node }) => (
      <Pane key={key}>{node}</Pane>
    ));

    return (
      <Wrapper>
        {headerNode}

        {staticView ? (
          <StaticViewWrapper>{staticView}</StaticViewWrapper>
        ) : (
          <StyledSwipeableViews
            className={this.scrollTopTargetClass}
            index={selectedPane}
            onChangeIndex={this.handlePaneChange}
          >
            {panes}
          </StyledSwipeableViews>
        )}

        {footerNode}
      </Wrapper>
    );
  }

  /**
   * Scroll to top of page on pane change and then notify handler passed from
   * prop.
   */
  private handlePaneChange = (paneIndex: number) => {
    const scrollTopTargetElement = document.querySelector(
      `.${this.scrollTopTargetClass}`,
    );

    if (scrollTopTargetElement) {
      scrollTopTargetElement.scrollTop = 0;
    }

    this.props.onPaneChange(paneIndex);
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StaticViewWrapper = styled.div`
  overflow-y: auto;
`;

const StyledSwipeableViews = styled(
  (props: PropsWithoutRef<SwipeableViewsProps>) => (
    <SwipeableViews
      {...props}
      springConfig={{ duration: "0.3s", easeFunction: "linear", delay: "0s" }}
    />
  ),
)`
  flex: 1;

  /* Enable Momentum Scrolling on iOS */
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Pane = styled.div`
  overflow-y: auto;

  & > * {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }

  & > *:last-child {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`;
