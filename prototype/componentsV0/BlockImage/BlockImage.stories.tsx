import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../storybook/StorybookContentCenterWrapper";
import { storybookPlaceholderImageUrl } from "../storybook/storybookPlaceholderImageUrl";
import { BlockImage } from "./BlockImage";

storiesOf("Components V0", module).add("BlockImage", () => {
  const src = storybookPlaceholderImageUrl;

  return (
    <StorybookContentCenterWrapper>
      <BlockImage src={src} />
    </StorybookContentCenterWrapper>
  );
});
