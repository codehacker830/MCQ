import React, { SFC } from "react";
import {
  AdminDashboardTemplate,
  AdminDashboardTemplateProps,
} from "../componentsV0/AdminDashboardTemplate";

interface AdminDashboardTemplateContainerOwnProps
  extends Pick<
    AdminDashboardTemplateProps,
    | "sideSheetTitle"
    | "sideSheetContents"
    | "sideSheetIconElement"
    | "sideSheetIconTooltipTitle"
  > {
  actionButtonElements?: AdminDashboardTemplateProps["dashboardAppBarProps"]["actionButtonElements"];
}

// tslint:disable-next-line:no-empty-interface
interface AdminDashboardTemplateContainerProps
  extends AdminDashboardTemplateContainerOwnProps {}

export const AdminDashboardTemplateContainer: SFC<
  AdminDashboardTemplateContainerProps
> = props => {
  const { children, actionButtonElements, ...rest } = props;

  const adminAppBarProps: AdminDashboardTemplateProps["dashboardAppBarProps"] = {
    actionButtonElements,
  };

  return (
    <AdminDashboardTemplate dashboardAppBarProps={adminAppBarProps} {...rest}>
      {children}
    </AdminDashboardTemplate>
  );
};
