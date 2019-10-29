import React, { ComponentType, SFC } from "react";

import {
  ResponsiveDrawerFrame,
  ResponsiveDrawerFrameProps,
} from "../ResponsiveDrawerFrame";

// TODO: Reorganize this file so that it doesn't have to depend on a component
// from a feature folder.
import { PageContentWrapper } from "../../features/navigation/components/PageContentWrapper";

export interface DashboardTemplateProps extends ResponsiveDrawerFrameProps {
  /**
   * Optional wrapper element to use to wrap the page contents from the
   * "children" prop. This is used in the AdminDashboard to wrap the page
   * contents in a side sheet component.
   */
  pageContentsWrapperComponent?: ComponentType<any>;
}

export const DashboardTemplate: SFC<DashboardTemplateProps> = props => {
  const {
    children,
    appBarNode,
    drawerThemeElement,
    drawerContentsNode,
    pageContentsWrapperComponent: PageContentsWrapperComponent,
    backgroundColor,
  } = props;

  let wrappedPageContents = <PageContentWrapper>{children}</PageContentWrapper>;
  if (PageContentsWrapperComponent) {
    wrappedPageContents = (
      <PageContentsWrapperComponent>
        {wrappedPageContents}
      </PageContentsWrapperComponent>
    );
  }

  return (
    <ResponsiveDrawerFrame
      appBarNode={appBarNode}
      drawerContentsNode={drawerContentsNode}
      drawerThemeElement={drawerThemeElement}
      backgroundColor={backgroundColor}
    >
      {wrappedPageContents}
    </ResponsiveDrawerFrame>
  );
};
