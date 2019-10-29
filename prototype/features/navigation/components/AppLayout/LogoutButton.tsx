import React from "react";
import styled from "styled-components";

import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

/** Logout button. */
export const LogoutButton = styled((props: IconButtonProps) => (
  <IconButton {...props}>
    <PowerSettingsNew />
  </IconButton>
))`
  min-width: inherit;
  margin-right: -12px;
  color: #910f0f;
  text-transform: none;
`;
