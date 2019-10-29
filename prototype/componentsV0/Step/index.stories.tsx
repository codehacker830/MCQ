import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Step } from ".";

storiesOf("Components V0", module).add("Step", () => (
  <Step
    stepNumber={1}
    label="Select Entry Type"
    visited={boolean("Visited", true)}
  />
));
