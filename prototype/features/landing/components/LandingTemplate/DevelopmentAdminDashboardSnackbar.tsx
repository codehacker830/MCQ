import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Tooltip from "@material-ui/core/Tooltip";
import Close from "@material-ui/icons/Close";
import DeveloperBoard from "@material-ui/icons/DeveloperBoard";

export type DevelopmentAdminDashboardSnackbarProps = RouteComponentProps<void>;

type DevelopmentAdminDashboardSnackbarState = {
  open: boolean;
};

class DevelopmentAdminDashboardSnackbar extends Component<
  DevelopmentAdminDashboardSnackbarProps,
  DevelopmentAdminDashboardSnackbarState
> {
  state: DevelopmentAdminDashboardSnackbarState = {
    open: false,
  };

  handleButtonClick = (path: string) => {
    if (path === "/storybook") {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:9001"
          : "/storybook/";
      window.open(url);
      return;
    }

    this.props.history.push(path);
  };

  render() {
    const { open } = this.state;

    const snackbarContent = (
      <SnackbarContentExtraVerticalHightMobile
        message={<span>Development Build</span>}
        action={
          <>
            {[
              { to: "/membership/subscriptions/payment", title: "Payment" },
              { to: "/loading", title: "Loading" },
              { to: "/welcome/entries", title: "Onboarding" },
              { to: "/dashboard", title: "User" },
              { to: "/admin/dashboard", title: "Admin" },
              { to: "/exam", title: "Exam" },
              { to: "/storybook", title: "Storybook" },
            ].map(l => (
              <Button
                key={l.to}
                color="secondary"
                onClick={() => this.handleButtonClick(l.to)}
              >
                {l.title}
              </Button>
            ))}
            <IconButton
              color="inherit"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={() => this.setState({ open: false })}
            >
              <Close />
            </IconButton>
          </>
        }
      />
    );

    return (
      <>
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          {snackbarContent}
        </Snackbar>

        {!open && (
          <Tooltip title="Development Links">
            <Fab
              color="secondary"
              style={{
                position: "fixed",
                bottom: 24,
                right: 48,
                zIndex: 9999,
              }}
              onClick={() => this.setState({ open: true })}
            >
              <DeveloperBoard />
            </Fab>
          </Tooltip>
        )}
      </>
    );
  }
}

const DevelopmentAdminDashboardSnackbarWithRouter = withRouter(
  DevelopmentAdminDashboardSnackbar,
);

export {
  DevelopmentAdminDashboardSnackbarWithRouter as DevelopmentAdminDashboardSnackbar,
};

const SnackbarContentExtraVerticalHightMobile = styled(SnackbarContent).attrs({
  classes: {
    action: "action",
  },
})`
  .action {
    flex-wrap: wrap;
  }
`;
