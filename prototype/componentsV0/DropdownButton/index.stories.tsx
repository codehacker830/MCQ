import { storiesOf } from "@storybook/react";
import React from "react";
import { DropdownButton } from ".";
import { Typography } from "../Typography";

storiesOf("Components V0", module).add("DropdownButton", () => {
  //

  return (
    <DropdownButton>
      <Typography>Dropdown Button</Typography>
    </DropdownButton>
  );
});
