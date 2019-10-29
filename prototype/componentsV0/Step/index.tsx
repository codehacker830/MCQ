import { Theme } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, { SFC } from "react";
import styled from "styled-components";

export interface StepProps {
  className?: string;

  /** The step number. */
  stepNumber: number;

  /** The step label. */
  label: string;

  /** Whether or not the step has or is being visited. */
  visited: boolean;
}

/**
 * Step for the stepper on the onboarding screens.
 */
export const Step: SFC<StepProps> = props => {
  const { className, stepNumber, visited, label } = props;

  return (
    <Wrapper className={className}>
      <Circle visited={visited}>
        {visited && <CircleStepNumber>{stepNumber}</CircleStepNumber>}
      </Circle>

      <Label visited={visited}>{label}</Label>
    </Wrapper>
  );
};

export const stepWidth = 128;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: ${stepWidth}px;
`;

const Circle = styled.div<{ visited: boolean }>`
  position: relative;
  width: ${props => props.theme.spacing(4)}px; /* 32px */
  height: ${props => props.theme.spacing(4)}px; /* 32px */
  border-radius: 50%;
  background-color: ${props =>
    props.visited
      ? props.theme.palette.primary.main
      : props.theme.palette.grey["500"]};
`;

const CircleStepNumber = styled(Typography).attrs({ variant: "button" })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.palette.common.white};
`;

const Label: SFC<TypographyProps & { visited: boolean }> = ({
  visited,
  ...props
}) => {
  const StyledLabel = styled(Typography).attrs({
    ...props,
    variant: "button",
    // tslint:disable-next-line:object-literal-sort-keys
    style: ({ theme }: { theme: Theme }) => ({
      color: visited ? "#4f4f4f" : theme.palette.grey["500"],
      marginTop: theme.spacing(1),
    }),
  })`
    font-size: 14px;
    text-align: center;
    text-transform: none;
  `;
  return <StyledLabel />;
};
