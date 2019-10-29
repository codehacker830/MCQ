import { storiesOf } from "@storybook/react";
import React from "react";
import { DashboardEntryCard, DashboardEntryCardProps } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

storiesOf("Components V0", module).add("DashboardEntryCard", () => {
  const dashboardEntryCardProps: DashboardEntryCardProps = {
    entryTitle: "Army",
    categoryLabels: [
      "Soldier GD",
      "Soldier Tradesman",
      "Soldier Tradesman 8th Grade",
      "Soldier NA",
    ],
    categoryPrices: [10, 10, 10, 10],
    categoryActivated: [false, true, true, false],
  };

  return (
    <ContentCenterWrapper>
      <DashboardEntryCard {...dashboardEntryCardProps} />
    </ContentCenterWrapper>
  );
});
