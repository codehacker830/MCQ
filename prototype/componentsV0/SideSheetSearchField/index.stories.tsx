import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SideSheetSearchField } from ".";

storiesOf("Components V0", module).add("SideSheetSearchField", () => {
  //

  return (
    <SideSheetSearchField
      label="Search Users"
      placeholder="Search for users here..."
      onSubmit={action("onSubmit")}
    />
  );
});
