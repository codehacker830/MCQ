import Typography from "@material-ui/core/Typography";
import { storiesOf } from "@storybook/react";
import React from "react";
import { SplitThemesPreviewer } from ".";

storiesOf("Components V0", module).add("SplitThemesPreviewer", () => (
  <SplitThemesPreviewer>
    <Typography variant="h5">Themed Text</Typography>
  </SplitThemesPreviewer>
));
