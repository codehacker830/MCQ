import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AdminDashboardTemplate } from "../AdminDashboardTemplate";

storiesOf("Components V0", module).add("SideSheet", () => {
  //

  return (
    <Router>
      <AdminDashboardTemplate
        dashboardAppBarProps={{}}
        sideSheetContents={<div>Side Sheet Contents</div>}
      >
        <div>Placeholder</div>
      </AdminDashboardTemplate>
    </Router>
  );
});
