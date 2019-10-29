import { storiesOf } from "@storybook/react";
import React from "react";
import { DarkTheme } from "../../../../theme";

import { HeroDescription } from "./HeroDescription";

storiesOf("Landing", module)
  .addDecorator(story => <DarkTheme>{story()}</DarkTheme>)
  .add("HeroDescription", () => {
    //

    return <HeroDescription />;
  });
