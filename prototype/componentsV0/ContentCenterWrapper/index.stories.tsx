import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookPlaceholderImage } from "../storybook/StorybookPlaceholderImage";
import { ContentCenterWrapper } from "./";

storiesOf("Components V0", module).add("ContentCenterWrapper", () => (
  <div style={{ height: 500 }}>
    <ContentCenterWrapper>
      <StorybookPlaceholderImage />
    </ContentCenterWrapper>
  </div>
));
