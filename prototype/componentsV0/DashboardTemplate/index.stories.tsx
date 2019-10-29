import { storiesOf } from "@storybook/react";
import React from "react";

import { DashboardTemplate } from ".";

storiesOf("Components V0", module)
  .addParameters({ info: { inline: false } })
  .add("DashboardTemplate", () => {
    //

    return (
      <DashboardTemplate
        appBarNode={<div>App Bar Node</div>}
        drawerContentsNode={<div>Drawer Contents Node</div>}
      >
        Placeholder
      </DashboardTemplate>
    );
  });
