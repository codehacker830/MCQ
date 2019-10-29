import React from "react";
import styled from "styled-components";

import Button, { ButtonProps } from "@material-ui/core/Button";

import { CheckmarkableCircle } from "../../../../componentsV0/CheckmarkableCircle";

export type LanguageButtonProps = ButtonProps & {
  selected: boolean;
};

export const LanguageButton = styled(
  ({ children, selected, ...rest }: LanguageButtonProps) => (
    <Button
      variant="outlined"
      classes={{ label: "language-button-label" }}
      {...rest}
    >
      <span>{children}</span>

      <CheckmarkableCircle checked={selected} />
    </Button>
  ),
)`
  width: 125px;
  text-transform: capitalize;

  .language-button-label {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
