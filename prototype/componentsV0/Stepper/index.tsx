import React, { SFC } from "react";
import styled from "styled-components";
import { Step, StepProps } from "../Step";

export interface StepperProps {
  /** Step labels. */
  labels: string[];

  /** Number of steps which were visited. */
  visitedCount: number;

  className?: string;
}

export const Stepper: SFC<StepperProps> = props => {
  const { className, labels, visitedCount } = props;

  const steps: StepProps[] = labels.map((label, index) => ({
    label,
    stepNumber: index + 1,
    visited: index < visitedCount,
  }));

  return (
    <Wrapper className={className}>
      {steps.map((step, index) => (
        <StepWithProgressBar
          key={index}
          width={100 / labels.length}
          {...step}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const StepWithProgressBar = styled(
  ({ width, ...rest }: StepProps & { width: number }) => <Step {...rest} />,
)`
  position: relative;
  width: ${props => props.width}%;

  &:after {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    left: -50%;
    top: 16px;
    background-color: ${props =>
      props.visited
        ? props.theme.palette.primary.main
        : props.theme.palette.grey["500"]};
    z-index: -1;
    content: "";
  }

  &:first-child:after {
    content: none;
  }
`;

// const ProgressLine = withProps<{ progress: number }>()(styled.div)`
//   position: absolute;
//   width: calc(100% - ${stepWidth}px);
//   height: 2px;
//   top: 16px;
//   left: ${stepWidth / 2}px
//   background: ${props =>
//     `linear-gradient(90deg, ${props.theme.palette.primary.main} ${
//       props.progress
//     }%, ${props.theme.palette.grey["500"]} ${100 - props.progress}%)`};
// `;
