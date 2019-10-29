import React, { SFC } from "react";
import { Route, Switch } from "react-router-dom";
import { AdminAppDrawerTheme, UserAppDrawerTheme } from "../../../../theme";

export const NavTheme: SFC<{}> = ({ children }) => (
  <Switch>
    {[
      "/dashboard",
      "/exam-pack",
      "/membership",
      "/settings",
      "/welcome/entries",
      "/welcome/subscriptions",
    ].map(path => (
      <Route
        key={path}
        path={path}
        render={() => <UserAppDrawerTheme>{children}</UserAppDrawerTheme>}
      />
    ))}

    <Route
      path="/admin"
      render={() => <AdminAppDrawerTheme>{children}</AdminAppDrawerTheme>}
    />
  </Switch>
);
