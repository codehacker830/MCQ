import React, { SFC } from "react";
import styled from "styled-components";

import { storybookPlaceholderImageUrl } from "./storybookPlaceholderImageUrl";

const StorybookPlaceholderImageBase = styled.img.attrs({
  alt: "Placeholder Image",
  src: storybookPlaceholderImageUrl,
})`
  display: block;
  width: 100%;
  height: 100%;
`;

/**
 * Simple placeholder image. Takes up full width and height of containing
 * element.
 */
export const StorybookPlaceholderImage: SFC<{}> = () => (
  <StorybookPlaceholderImageBase />
);
