import { storiesOf } from "@storybook/react";
import React from "react";
import { OnboardingHeader } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

storiesOf("Components V0", module).add("OnboardingHeader", () => (
  <ContentCenterWrapper>
    <OnboardingHeader
    // logoutButtonProps={{ onClick: action("onLogoutButtonClick") }}
    />
  </ContentCenterWrapper>
));
