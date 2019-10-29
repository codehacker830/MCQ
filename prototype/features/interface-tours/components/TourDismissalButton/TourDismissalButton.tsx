import React, { PropsWithoutRef } from "react";
import styled from "styled-components";
import {
  TypographyButton,
  TypographyButtonProps,
} from "../../../../componentsV0/TypographyButton";

export type TourDismissalButtonProps = OmitStrict<
  PropsWithoutRef<TypographyButtonProps>,
  "children"
> & {
  children: string;
};

export const TourDismissalButton = styled((props: TourDismissalButtonProps) => (
  <TypographyButton {...props} color="primary" filled />
))`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
`;
