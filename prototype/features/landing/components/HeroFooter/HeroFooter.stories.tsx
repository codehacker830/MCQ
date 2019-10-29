import { storiesOf } from "@storybook/react";
import React from "react";
import { DarkTheme } from "../../../../theme";

import { HeroFooter } from "./HeroFooter";

storiesOf("Landing", module).add("HeroFooter", () => (
  <DarkTheme>
    <HeroFooter />
  </DarkTheme>
));
