import React, { SFC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { strings } from "../../../localization";
import { INavigationLink } from "../../models/INavigationLink";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export type DrawerLinkProps = INavigationLink & { className?: string };

const DrawerLink: SFC<DrawerLinkProps> = props => {
  const { className, titleLocalizationKey, to, iconElement, disabled } = props;
  const linkComponent =
    !disabled &&
    ((listItemProps: any) => (
      <NavLink to={to} activeClassName="active" {...listItemProps} />
    ));

  return (
    <ListItem
      className={className}
      // TODO: Fix type:
      // @ts-ignore
      button={!disabled}
      component={linkComponent || undefined}
    >
      <DrawerLinkOptionalIcon iconElement={iconElement} />
      <ListItemText>{strings[titleLocalizationKey]}</ListItemText>
    </ListItem>
  );
};

const listItemColorNotActive = "#999696";
const listItemColorActive = "#fff";

const StyledDrawerLink = styled(DrawerLink)`
  cursor: ${props => props.disabled && "default"};

  span {
    color: ${listItemColorNotActive};
  }

  &.active span {
    color: ${listItemColorActive};
  }
`;

export { StyledDrawerLink as DrawerLink };

const DrawerLinkOptionalIcon = styled(
  ({
    className,
    iconElement,
  }: {
    className?: string;
    iconElement: INavigationLink["iconElement"];
  }) =>
    iconElement ? (
      <ListItemIcon className={className}>{iconElement}</ListItemIcon>
    ) : null,
)`
  color: ${listItemColorNotActive};

  .active & {
    color: ${listItemColorActive};
  }
`;
