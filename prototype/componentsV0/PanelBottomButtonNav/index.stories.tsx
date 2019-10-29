import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { PanelBottomButtonNav } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

storiesOf("Components V0", module).add("PanelBottomButtonNav", () => (
  <ContentCenterWrapper>
    <PanelBottomButtonNav
      label={
        boolean("With Label", true)
          ? "Category Selected : Paramilitary (Asst comdt)"
          : undefined
      }
      backButtonLabel="Back"
      nextButtonLabel="Next"
      showBackButton
      showNextButton
      onBackButtonClick={action("onBackButtonClick")}
      onNextButtonClick={action("onNextButtonClick")}
    />
  </ContentCenterWrapper>
));
