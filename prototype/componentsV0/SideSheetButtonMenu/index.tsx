import React, { Component, MouseEvent } from "react";
import styled from "styled-components";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import { Typography } from "../Typography";
import { TypographyButton } from "../TypographyButton";

export interface SideSheetButtonMenuProps {
  /**
   * Options available through the popup menu.
   */
  options: string[];

  /**
   * Currently selected option.
   *
   * @default options[0]
   */
  value?: string;

  /**
   * Called when the user selects a menu item different from the already
   * selected item.
   */
  onChange?: (value: string) => any;
}

interface SideSheetButtonMenuState {
  value: SideSheetButtonMenuProps["value"];

  anchorEl: HTMLElement | null;
}

export class SideSheetButtonMenu extends Component<
  SideSheetButtonMenuProps,
  SideSheetButtonMenuState
> {
  constructor(props: SideSheetButtonMenuProps) {
    super(props);

    this.state = {
      value: props.value || props.options[0],
      anchorEl: null,
    };
  }

  handleButtonClick = (event: MouseEvent<any>) =>
    this.setState({ anchorEl: event.currentTarget });

  handleMenuClose = () => this.setState({ anchorEl: null });

  handleMenuItemClick = (value: string) => {
    if (value === this.state.value) {
      this.setState({ anchorEl: null });
      return;
    }

    this.setState({ value, anchorEl: null });
    if (this.props.onChange) this.props.onChange(value);
  };

  render() {
    const { options } = this.props;
    const { value, anchorEl } = this.state;

    return (
      <>
        {/* TODO: Fix this type definition: */}
        <ButtonFullWidth {...{ onClick: this.handleButtonClick }}>
          {value}
          <PositionedDropDownArrow />
        </ButtonFullWidth>
        <Menu
          anchorEl={anchorEl || undefined}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={value === option}
              onClick={() => this.handleMenuItemClick(option)}
            >
              <Typography>{option}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

const ButtonFullWidth = styled(TypographyButton).attrs({
  variant: "text",
})`
  width: 100%;
  padding-left: 16px;

  > span {
    justify-content: flex-start;
  }
`;

const PositionedDropDownArrow = styled(ArrowDropDown)`
  position: absolute;
  right: 16px;
`;
