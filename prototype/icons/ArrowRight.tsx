import React, { SFC } from "react";

import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export const ArrowRight: SFC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <path d="M10 17l5-5-5-5v10z" />
    <path fill="none" d="M0 24V0h24v24H0z" />
  </SvgIcon>
);
