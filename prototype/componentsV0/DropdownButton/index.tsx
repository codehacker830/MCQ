import React, { Component } from "react";

import Icon from "@material-ui/core/Icon";

import { Button, ButtonProps } from "../Button";

export type DropdownButtonProps = ButtonProps;

export class DropdownButton extends Component<DropdownButtonProps> {
  render() {
    const { children, ...rest } = this.props;

    return (
      <Button {...rest}>
        {children}
        <Icon>arrow_drop_down</Icon>
      </Button>
    );
  }
}
