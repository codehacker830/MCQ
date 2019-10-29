import lodashDebounce from "lodash.debounce";
import React, { Component, ComponentType } from "react";
import { createPortal } from "react-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { NavTheme } from "../NavTheme";

export const portalTargetElementID = "bottom-toolbar-dock-portal-target";

type OwnProps = {
  /**
   * List of routes to render the bottom toolbar on. This is used because the
   * swipeable navigation interface renders all child pages at the same time.
   */
  matchedRoutes: string[];

  NonPortalWrapperComponent: ComponentType<any>;
};
export type BottomToolbarDockPortalProps = OwnProps;

type Props = RouteComponentProps<{}> & OwnProps;

type State = {
  isSwipeableLayout: boolean;
};

class BottomToolbarDockPortal extends Component<Props, State> {
  state: State = {
    isSwipeableLayout: !!document.getElementById(portalTargetElementID),
  };

  private observer = new MutationObserver(this.handleMutation.bind(this));

  componentDidMount() {
    this.observer.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  componentDidUpdate() {
    this.syncRender();
  }

  render() {
    const { children, NonPortalWrapperComponent } = this.props;
    const { isSwipeableLayout } = this.state;
    const shouldRender = this.getIsRouteMatched();

    if (!shouldRender) return null;

    if (!isSwipeableLayout) {
      return <NonPortalWrapperComponent>{children}</NonPortalWrapperComponent>;
    }

    const portalTarget = document.getElementById(portalTargetElementID);
    if (!portalTarget) return null;

    return createPortal(<NavTheme>{children}</NavTheme>, portalTarget);
  }

  private getIsRouteMatched = () => {
    const {
      matchedRoutes,
      location: { pathname },
    } = this.props;

    return matchedRoutes.includes(pathname);
  };

  private handleMutation() {
    const { isSwipeableLayout } = this.state;
    const doesPortalTargetExist = !!document.getElementById(
      portalTargetElementID,
    );

    if (isSwipeableLayout !== doesPortalTargetExist) {
      this.setState({ isSwipeableLayout: doesPortalTargetExist });
    }
  }

  // tslint:disable-next-line: member-ordering
  private syncRender = lodashDebounce(() => {
    const { children } = this.props;
    const portalTarget = document.getElementById(portalTargetElementID);

    if (!portalTarget) return;

    const childNodes = portalTarget.childNodes;
    const shouldHaveChildren = !!children && this.getIsRouteMatched();

    if (shouldHaveChildren && childNodes.length === 0) {
      this.forceUpdate();
    }
  }, 166);
}

/**
 * Renders the toolbar node within a fixed position div when there is no parent
 * swipeable interface layout. When a swipeable interface layout is a parent,
 * the toolbar is rendered above the bottom nav bar of the swipe interface.
 */
const BottomToolbarDockPortalWithRouter = withRouter(BottomToolbarDockPortal);
export { BottomToolbarDockPortalWithRouter as BottomToolbarDockPortal };
