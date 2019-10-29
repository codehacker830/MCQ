import React, { Component } from "react";
import { Button, ButtonProps } from "../Button";
import { Typography, TypographyProps } from "../Typography";

export interface TypographyButtonProps extends ButtonProps {
  /** @default buttonBold */
  typographyVariant?: TypographyProps["variant"];

  muiTypographyProps?: TypographyProps["muiTypographyProps"];
}

/**
 * A Button component with the text wrapped in a Typography component to enforce
 * the project's font styles.
 */
export class TypographyButton extends Component<TypographyButtonProps> {
  render() {
    const {
      typographyVariant,
      muiTypographyProps,
      children,
      ...rest
    } = this.props;

    return (
      <Button {...rest}>
        <Typography
          variant={typographyVariant || "buttonBold"}
          muiTypographyProps={muiTypographyProps}
        >
          {children}
        </Typography>
      </Button>
    );
  }
}
