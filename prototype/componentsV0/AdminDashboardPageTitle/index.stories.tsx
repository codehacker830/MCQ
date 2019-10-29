import { storiesOf } from "@storybook/react";
import React from "react";
import { AdminDashboardPageTitle } from ".";

storiesOf("Components V0", module).add("AdminDashboardPageTitle", () => {
  //

  return (
    <AdminDashboardPageTitle>
      Welcome to some Admin Dashboard page.
    </AdminDashboardPageTitle>
  );
});
