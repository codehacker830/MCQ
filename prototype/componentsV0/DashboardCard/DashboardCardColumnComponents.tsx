import React, { cloneElement, SFC } from "react";
import styled from "styled-components";

import Switch, { SwitchProps } from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

import { ResponsiveToolbarTypographyButton } from "../ResponsiveToolbarTypographyButton";
import { Typography } from "../Typography";
import { DashboardCardItemColumn } from "./DashboardCardItemColumn";
import { DashboardCardModeApi } from "./DashboardCardModeContext";

type ColumnItemComponent = SFC<{
  itemColumn: DashboardCardItemColumn;
  mode: DashboardCardModeApi["state"]["mode"];
}>;

export const ColumnItemDualLine: ColumnItemComponent = ({ itemColumn }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Typography>{itemColumn.primaryText}</Typography>
    <Typography muiTypographyProps={{ variant: "caption" }}>
      {itemColumn.secondaryText}
    </Typography>
  </div>
);

export const ColumnItemImage: ColumnItemComponent = ({ itemColumn }) => (
  <img
    style={{ display: "block", height: 64, margin: "4px 0" }}
    src={itemColumn.imgUrl}
  />
);

export const ColumnItemProfile: ColumnItemComponent = ({ itemColumn }) => (
  <ProfileWrapper>
    <div className="profile-newness">
      <div
        style={{ visibility: itemColumn.isNewUser ? "visible" : "hidden" }}
      />
    </div>
    {/* Profile image */}
    <img className="profile-image" src={itemColumn.imgUrl} />
    {/* Dual line text */}
    <div className="profile-text">
      <Typography>{itemColumn.primaryText}</Typography>
      <Typography muiTypographyProps={{ variant: "caption" }}>
        <a href={`mailto:${itemColumn.secondaryText}`}>
          {itemColumn.secondaryText}
        </a>
      </Typography>
    </div>
  </ProfileWrapper>
);

export const ColumnItemSingleLine: ColumnItemComponent = ({ itemColumn }) => (
  <Typography>{itemColumn.primaryText}</Typography>
);

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch
    color="primary"
    classes={{ track: "bar", checked: "checked", disabled: "disabled" }}
    {...props}
  />
))`
  .disabled {
    color: ${({ theme }) => theme.palette.grey[50]};
  }

  .disabled + .bar {
    opacity: 0.38;
  }

  .checked {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .checked + .bar {
    background-color: ${({ theme }) => theme.palette.primary.main};
    opacity: 0.5;
  }
`;

export const ColumnItemSwitch: ColumnItemComponent = ({ itemColumn, mode }) => {
  const component = (
    <StyledSwitch
      checked={Boolean(itemColumn.switchChecked)}
      onClick={event => {
        event.stopPropagation();
      }}
      onChange={event => {
        if (!itemColumn.switchOnChange) return;
        itemColumn.switchOnChange(event.target.checked);
      }}
      disabled={mode !== "edit"}
      color="primary"
    />
  );

  return itemColumn.switchTooltipTitle ? (
    <Tooltip title={itemColumn.switchTooltipTitle}>{component}</Tooltip>
  ) : (
    component
  );
};

export const ColumnItemButton: ColumnItemComponent = ({ itemColumn }) => {
  const button = (
    <ResponsiveToolbarTypographyButton
      onClick={itemColumn.onClick}
      iconNode={itemColumn.buttonIconNode}
      tooltipTitle={itemColumn.buttonTooltipTitle}
    >
      {itemColumn.primaryText}
    </ResponsiveToolbarTypographyButton>
  );

  return itemColumn.wrapper
    ? cloneElement(itemColumn.wrapper, undefined, button)
    : button;
};

const ProfileWrapper = styled.div`
  display: flex;

  .profile-newness {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-newness div {
    width: 16px;
    height: 16px;
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-radius: 50%;
  }

  .profile-image {
    display: block;
    height: 64px;
    margin: 4px 8px 4px 0;
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-text > *:first-child {
    margin-bottom: 4px;
  }
`;
