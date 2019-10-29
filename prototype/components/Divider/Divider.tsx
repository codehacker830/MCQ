// tslint:disable-next-line:import-name
import MuiDivider, {
  DividerProps as MuiDividerProps,
} from "@material-ui/core/Divider";
import React from "react";
import styled, { css } from "styled-components";

export type DividerProps = MuiDividerProps & {
  /**
   * Divider direction.
   *
   * @default horizontal
   */
  direction?: "horizontal" | "vertical";

  /**
   * CSS property for height when variant is set to vertical.
   *
   * @default "100%""
   */
  verticalVariantHeight?: string;
};

/**
 * The Material UI Divider component with an additional vertical variant.
 */
export const Divider = styled(
  ({ direction: variant, verticalVariantHeight, ...rest }: DividerProps) => (
    <MuiDivider {...rest} />
  ),
)`
  ${props =>
    props.direction === "vertical" &&
    css`
      width: 1px;
      height: ${props.verticalVariantHeight || "100%"};
    `};
`;
