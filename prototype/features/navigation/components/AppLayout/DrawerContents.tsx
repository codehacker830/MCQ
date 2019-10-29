import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { INavigationLink } from "../../models/INavigationLink";

import List from "@material-ui/core/List";

import { DrawerLink } from "./DrawerLink";
import { DrawerLogoLink } from "./DrawerLogoLink";

export interface DrawerContentsProps {
  /**
   * List of links to include in the drawer.
   */
  links: INavigationLink[];
}

/**
 * Contents of the app drawer for the admin and user dashboards. Contains links
 * to each dashboard page.
 */
export const DrawerContents: SFC<DrawerContentsProps> = props => {
  const { links } = props;

  const listLinks = links.map(link => (
    <DrawerLink key={link.titleLocalizationKey} {...link} />
  ));

  return (
    <DrawerList>
      <DrawerLogoLink {...links[0]} />

      {listLinks}
    </DrawerList>
  );
};

const DrawerList = styled(
  ({ className, children }: { children?: ReactNode; className?: string }) => (
    <List className={className} component="nav">
      {children}
    </List>
  ),
)`
  padding-top: 0;
`;
