import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { INavigationLink } from "../../models/INavigationLink";

import { SwipeableNav } from "./SwipeableNav";

type OwnProps = {
  links: INavigationLink[];
};
export type SwipeableNavProps = OwnProps;

type Props = RouteComponentProps<{}> & OwnProps;

class SwipeableNavContainer extends Component<Props> {
  private readonly scrollTopClass = "swipeable-views-scroll-top";

  render() {
    const { links, location } = this.props;
    const paneIndex = this.getPaneIndexFromCurrentRoute();

    return (
      <SwipeableNav
        links={links}
        bottomNavigationValue={location.pathname}
        swipeableViewsClassName={this.scrollTopClass}
        swipeableViewsPaneIndex={paneIndex}
        onBottomNavigationChange={this.handleBottomNavigationButtonClick}
        onSwipeableViewsChangeIndex={this.handlePaneChange}
      />
    );
  }

  private handleBottomNavigationButtonClick = (_e: any, pathname: string) => {
    this.pushRouteToHistory(pathname);
  };

  private handlePaneChange = (paneIndex: number) => {
    const { links } = this.props;

    this.pushRouteToHistory(links[paneIndex].to);
  };

  private pushRouteToHistory = (pathname: string) => {
    const { history } = this.props;

    history.push(pathname);
    this.scrollTop();
  };

  private scrollTop = () => {
    // Scroll the pane to the top on pane change.
    const swipeContainerDiv = document.querySelector<HTMLDivElement>(
      `.${this.scrollTopClass}`,
    )!;
    swipeContainerDiv.scrollTop = 0;
  };

  private getPaneIndexFromRoute = (pathname: string): number => {
    const { links } = this.props;
    let matchedLinkIndex = links.findIndex(l => l.to === pathname);

    if (matchedLinkIndex === -1) {
      matchedLinkIndex = links.findIndex(
        l =>
          l.alternateMatchPaths !== undefined &&
          l.alternateMatchPaths.includes(pathname),
      );
    }

    const paneIndex = matchedLinkIndex > -1 ? matchedLinkIndex : 0;
    return paneIndex;
  };

  private getPaneIndexFromCurrentRoute = (): number => {
    const { location } = this.props;
    return this.getPaneIndexFromRoute(location.pathname);
  };
}

const SwipeableNavContainerWithRouter = withRouter(SwipeableNavContainer);
export { SwipeableNavContainerWithRouter as SwipeableNav };
