import { storiesOf } from "@storybook/react";
import React from "react";
import { DashboardCardStatsContent } from ".";

storiesOf("Components V0", module).add("DashboardCardStatsContent", () => {
  //

  return (
    <DashboardCardStatsContent>
      <DashboardCardStatsContent.Item>Item 1</DashboardCardStatsContent.Item>
      <DashboardCardStatsContent.Item>Item 2</DashboardCardStatsContent.Item>
    </DashboardCardStatsContent>
  );
});
