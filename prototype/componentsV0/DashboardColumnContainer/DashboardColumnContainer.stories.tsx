import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { DashboardColumnContainer } from ".";
import { StorybookContentCenterWrapper } from "../storybook/StorybookContentCenterWrapper";

storiesOf("Components V0", module).add("DashboardColumnContainer", () => {
  const children = Array.from({ length: 10 }, (_, index) => (
    <div key={index} style={{ width: 200, height: 100 }}>
      Child {index.toString()}
    </div>
  ));

  return (
    <StorybookContentCenterWrapper>
      <DashboardColumnContainer interlaced={boolean("Interlaced", false)}>
        {children}
      </DashboardColumnContainer>
    </StorybookContentCenterWrapper>
  );
});
