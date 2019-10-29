import React, { SFC } from "react";
import { Route, RouteProps } from "react-router-dom";

// TODO: Check authentication state, redirect if not authenticated as admin user.

// tslint:disable-next-line:no-empty-interface
export interface AdminRouteProps extends RouteProps {}

/**
 * Wraps protected admin dashboard pages. It prevents users from reaching admin
 * pages while not authenticated as an admin user.
 */
export const AdminRoute: SFC<AdminRouteProps> = props => {
  // const {} = props;

  return <Route {...props} />;
};
