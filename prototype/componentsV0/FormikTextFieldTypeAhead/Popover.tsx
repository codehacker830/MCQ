import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
// tslint:disable-next-line:import-name
import MuiPopover from "@material-ui/core/Popover";

import { TypeAheadContextConsumer } from "./TypeAheadContext";

// tslint:disable-next-line:no-empty-interface
export interface PopoverProps {}

export class Popover extends Component<PopoverProps> {
  render() {
    return (
      <TypeAheadContextConsumer>
        {api => {
          if (!api) throw new Error("Used outside of context.");

          const { downshiftApi, inputRef } = api;
          const { isOpen } = downshiftApi;

          return (
            <MuiPopover
              open={isOpen}
              anchorEl={inputRef || undefined}
              disableAutoFocus
              disableEnforceFocus
              disableBackdropClick
              hideBackdrop
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Paper
                square
                style={{ width: inputRef ? inputRef.clientWidth : undefined }}
              >
                {this.props.children}
              </Paper>
            </MuiPopover>
          );
        }}
      </TypeAheadContextConsumer>
    );
  }
}
