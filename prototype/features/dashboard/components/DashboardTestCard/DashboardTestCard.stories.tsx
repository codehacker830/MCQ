import { storiesOf } from "@storybook/react";
import React from "react";
import { entryImages } from "../../../../common/structures/entryImages";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { DashboardTestCard } from "./DashboardTestCard";

storiesOf("Dashboard", module).add("DashboardTestCard", () => {
  //

  return (
    <StorybookContentCenterWrapper>
      <DashboardTestCard
        color="yellow"
        attemptButtonLabel="Attempt"
        imageLogoUrl={entryImages.AirForce}
        title="Soldier General Duty Free Mock Test"
        subtitle="Validity 31st Jan 2019"
      />
    </StorybookContentCenterWrapper>
  );
});
