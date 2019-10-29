import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { AuthenticationErrorSnackbar } from ".";

storiesOf("Components V0", module).add("AuthenticationErrorSnackbar", () => {
  //

  return (
    <AuthenticationErrorSnackbar
      error={boolean("Open", true) ? "Invalid username or password." : null}
      onClose={action("onClose")}
    />
  );
});
