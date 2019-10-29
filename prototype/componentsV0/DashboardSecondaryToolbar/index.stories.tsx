import { storiesOf } from "@storybook/react";
import React from "react";
import { DashboardSecondaryToolbar } from ".";

import { Button } from "../Button";
import { ContentCenterWrapper } from "../ContentCenterWrapper";
import { Typography } from "../Typography";

storiesOf("Components V0", module).add("DashboardSecondaryToolbar", () => {
  const buttons = Array.from({ length: 3 }, (_item, index) => (
    <Button key={index} variant="text">
      <Typography variant="buttonBold">Button {index + 1}</Typography>
    </Button>
  ));

  return (
    <ContentCenterWrapper>
      <DashboardSecondaryToolbar>
        <DashboardSecondaryToolbar.Spacer />
        {buttons}
      </DashboardSecondaryToolbar>
    </ContentCenterWrapper>
  );
});
