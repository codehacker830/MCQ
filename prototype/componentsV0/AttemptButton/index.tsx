import React, { SFC } from "react";
import styled from "styled-components";
import { strings } from "../../features/localization";

import Button, { ButtonProps } from "@material-ui/core/Button";

export type AttemptButtonProps = ButtonProps;

/**
 * Attempt button for call to action cards on landing page.
 */
export const AttemptButton: SFC<AttemptButtonProps> = props => {
  const { children, ...rest } = props;

  return (
    <StyledAttemptButton {...(rest as any)}>
      {strings.components_AttemptButton_Text}
    </StyledAttemptButton>
  );
};

const StyledAttemptButton = styled(Button).attrs({
  classes: { label: "label" },
})`
  min-height: inherit;
  padding: 4px 8px;

  ${props => `
    color: ${props.theme.palette.primary.main};
    border: 1px solid ${props.theme.palette.primary.main}
  `};

  .label {
    font-size: 10px;
    font-weight: 600;
  }
`;
