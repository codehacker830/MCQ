import React, { SFC } from "react";

import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export const ArrowForwardIos: SFC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </SvgIcon>
);
