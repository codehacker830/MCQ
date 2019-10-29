import React, { Component, ReactNode } from "react";
import styled from "styled-components";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";

import { Typography } from "../Typography";

export interface DashboardEntryCardToolbarProps {
  entryTitle: string;

  mode: "display" | "edit" | "deletion";

  selectedCount: number;

  onEnterDeletionModeClick: () => void;
  onEnterEditModeClick: () => void;
  onDeleteSelectedClick: () => void;
  onExitModeClick: () => void;
}

export class DashboardEntryCardToolbar extends Component<
  DashboardEntryCardToolbarProps
> {
  render() {
    const {
      entryTitle,
      mode,
      selectedCount,
      onEnterDeletionModeClick,
      onEnterEditModeClick,
      onDeleteSelectedClick,
      onExitModeClick,
    } = this.props;

    let actionButtonsNode: ReactNode;

    if (mode === "display") {
      actionButtonsNode = (
        <>
          <Tooltip title="Deletion Mode">
            <IconButton onClick={onEnterDeletionModeClick}>
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Mode">
            <IconButton onClick={onEnterEditModeClick}>
              <Icon>edit</Icon>
            </IconButton>
          </Tooltip>
        </>
      );
    } else {
      actionButtonsNode = (
        <>
          {mode === "deletion" && (
            <Tooltip
              title={`Delete ${selectedCount} Selected Item${
                selectedCount !== 1 ? "s" : ""
              }`}
            >
              <IconButton
                disabled={selectedCount === 0}
                onClick={onDeleteSelectedClick}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={`Exit ${mode === "edit" ? "Edit" : "Deletion"} Mode`}>
            <IconButton onClick={onExitModeClick}>
              <Icon>done</Icon>
            </IconButton>
          </Tooltip>
        </>
      );
    }

    const captionNode = (
      <>
        {/* Display mode caption. */}
        {mode === "display" && (
          <EntryTitleWrapper>
            <Icon>dashboard</Icon>
            <Typography variant="cardTitle">{entryTitle} Entry</Typography>
          </EntryTitleWrapper>
        )}

        {/* Edit/Deletion mode captions. */}
        {mode !== "display" && (
          <Typography
            variant="tableHeadCell"
            muiTypographyProps={{ color: "inherit" }}
          >
            {mode === "edit"
              ? "Edit Mode - Click to Edit Entry"
              : `${selectedCount} Selected for Deletion`}
          </Typography>
        )}
      </>
    );

    return (
      <ColoredToolbar mode={mode}>
        <CaptionWrapper>{captionNode}</CaptionWrapper>
        {actionButtonsNode}
      </ColoredToolbar>
    );
  }
}

type ModeProp = Pick<DashboardEntryCardToolbarProps, "mode">;

const ColoredToolbar = styled(({ mode, ...rest }: ToolbarProps & ModeProp) => (
  <Toolbar {...rest} />
))`
  ${({ mode, theme }) => {
    if (mode === "display") return;

    return `
      color: ${
        mode === "edit" ? theme.palette.primary.dark : theme.palette.error.dark
      };
      background-color: ${lighten(
        mode === "edit"
          ? theme.palette.primary.light
          : theme.palette.error.light,
        0.75,
      )}
    `;
  }}
`;

const CaptionWrapper = styled.div`
  flex: 1;
`;

const EntryTitleWrapper = styled.div`
  display: flex;

  > *:first-child {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
    color: #757575;
  }
`;
