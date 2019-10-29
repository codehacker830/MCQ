import React from "react";
import styled from "styled-components";

import Check from "@material-ui/icons/Check";

export type CheckmarkableCircleProps = {
  className?: string;

  /**
   * Color to use when checked. Primary color or secondary color from theme.
   *
   * @default primary
   */
  color?: "primary" | "secondary";

  /**
   * Whether item is checked or not.
   */
  checked: boolean;
};

/**
 * Checkmark with primary and secondary color theme option. Grey when not
 * selected.
 */
export const CheckmarkableCircle = styled(
  ({ className, checked }: CheckmarkableCircleProps) => (
    <div className={className}>{checked && <StyledCheckIcon />}</div>
  ),
)`
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey["300"]};

  ${({ checked, color = "primary", theme }) =>
    checked && `background-color: ${theme.palette[color].main}`};
`;

const StyledCheckIcon = styled(Check)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`;
