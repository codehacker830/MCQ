import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import {
  CheckmarkableCircle,
  CheckmarkableCircleProps,
} from "./CheckmarkableCircle";

storiesOf("Components V0", module).add("CheckmarkableCircle", () => (
  <CheckmarkableCircle
    checked={boolean("Checked", true)}
    color={
      select(
        "Color",
        ["primary", "secondary"],
        "primary",
      ) as CheckmarkableCircleProps["color"]
    }
  />
));
