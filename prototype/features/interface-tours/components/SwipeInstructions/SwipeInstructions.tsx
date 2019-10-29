import React from "react";
import styled from "styled-components";
import { Typography } from "../../../../componentsV0/Typography";
import { colors } from "../../colors";
import { ReactComponent as SwipeImage } from "./swipe.svg";

export type SwipeInstructionsProps = {
  className?: string;

  children: string;

  /**
   * Offset from the top of the screen.
   *
   * Example: 60%.
   */
  topOffset: string;
};

export const SwipeInstructions = styled(
  ({ className, children }: SwipeInstructionsProps) => (
    <div className={className}>
      <StyledSwipeImage />
      <InstructionsText>{children}</InstructionsText>
    </div>
  ),
)`
  position: fixed;
  width: 30vmin;
  height: 30vmin;
  left: 50%;
  top: ${({ topOffset }) => topOffset};
  transform: translate(-50%, -50%);
`;

const StyledSwipeImage = styled(SwipeImage)`
  fill: ${colors.green};
`;

type InstructionsTextProps = {
  className?: string;
  children: string;
};

const InstructionsText = styled(
  ({ className, children }: InstructionsTextProps) => (
    <Typography className={className}>{children}</Typography>
  ),
)`
  position: absolute;
  width: 200%;
  left: -50%;
  padding-top: 16px;
  font-size: 13px;
  text-align: center;
  color: #fff;
`;
