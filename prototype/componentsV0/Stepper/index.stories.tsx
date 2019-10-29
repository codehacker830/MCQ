import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Stepper } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

storiesOf("Components V0", module)
  .addParameters({ info: { propTablesExclude: [ContentCenterWrapper as any] } })
  .add("Stepper", () => {
    const labels = ["Select Entry Type", "Select Category", "Plan"];
    const visitedCount = number("Visited Count", 1, {
      max: 3,
      min: 0,
      range: true,
      step: 1,
    });

    return (
      <ContentCenterWrapper>
        <Stepper labels={labels} visitedCount={visitedCount} />
      </ContentCenterWrapper>
    );
  });
