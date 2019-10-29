import React, { Component } from "react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";

// tslint:disable-next-line:no-empty-interface
export interface DashboardSecondaryToolbarProps {}

const Spacer = styled.div`
  ${({ theme }) => theme.breakpoints.up("sm")} {
    flex: 1;
  }
`;

const Content = styled.div`
  flex-shrink: 0;
  padding-right: 24px;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
  }

  &:last-child {
    padding-right: 0 !important;
  }
`;

export class DashboardSecondaryToolbar extends Component<
  DashboardSecondaryToolbarProps
> {
  static Content = Content;
  static Spacer = Spacer;

  render() {
    const { children } = this.props;

    return (
      <Paper>
        <MultilineMobileToolbar>{children}</MultilineMobileToolbar>
      </Paper>
    );
  }
}

// TODO: Properly implement this.
const MultilineMobileToolbar = styled(Toolbar)`
  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-wrap: wrap;
    padding: ${({ theme }) => theme.spacing(1)}px 0;

    /* A little bit of a hack. Needs to set 100% width on children but
    it negatively affects the dropdown button component because it
    contains two spans. To work around the issue, only the first span
    is affected. */
    span:first-child,
    button {
      width: 100%;
      text-align: left;
    }
  }
`;
