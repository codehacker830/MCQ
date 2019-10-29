import React, { SFC } from "react";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export const BottomToolbar: SFC<{}> = ({ children }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      <ToolbarContentsWrapper>{children}</ToolbarContentsWrapper>
    </Toolbar>
  </AppBar>
);

const ToolbarContentsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1232px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
`;
