import React, { SFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { INavigationLink } from "../../models/INavigationLink";

import ListItem from "@material-ui/core/ListItem";

import { DrawerLogo } from "../../../../componentsV0/DrawerLogo";

export type DrawerLogoLinkProps = INavigationLink & { className?: string };

const DrawerLogoLink: SFC<DrawerLogoLinkProps> = props => {
  const { className, to, disabled } = props;
  const linkComponent =
    !disabled && ((listItemProps: any) => <Link to={to} {...listItemProps} />);

  return (
    <ListItem
      className={className}
      // TODO: Fix type:
      // @ts-ignore
      button={!disabled}
      component={linkComponent || undefined}
    >
      <DrawerLogo />
    </ListItem>
  );
};

const StyledDrawerLogoLink = styled(DrawerLogoLink)`
  padding: 8px 4px 8px 16px;
  cursor: ${props => props.disabled && "default"};

  > div {
    width: 100%;
  }
`;

export { StyledDrawerLogoLink as DrawerLogoLink };
