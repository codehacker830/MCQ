import Typography from "@material-ui/core/Typography";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AdminDashboardTemplate, AdminDashboardTemplateProps } from ".";

storiesOf("Components V0", module)
  .addParameters({
    info: { inline: false },
  })
  .add("AdminDashboardTemplate", () => {
    const props: AdminDashboardTemplateProps = {
      dashboardAppBarProps: {},
    };

    return (
      <Router>
        <AdminDashboardTemplate {...props}>
          <Typography>Example Page Contents</Typography>
        </AdminDashboardTemplate>
      </Router>
    );
  });
