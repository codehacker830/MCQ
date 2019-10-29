import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ToolbarProfileMenu } from ".";

storiesOf("Components V0", module).add("ToolbarProfileMenu", () => (
  <div style={{ display: "flex", padding: 20, backgroundColor: "#eee" }}>
    <div style={{ backgroundColor: "#fff" }}>
      <ToolbarProfileMenu
        toolbarAvatarProps={{
          letters: "JD",
          name: "John Doe",
        }}
        onLogoutClick={action("onLogoutClick")}
      />
    </div>
  </div>
));
