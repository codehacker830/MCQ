import React, { SFC } from "react";
import styled from "styled-components";
import { DarkTheme } from "../../theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ComponentWrapper = styled.div`
  width: 100%;
  border: 8px solid #f7f7f7;

  ${Wrapper} &:nth-child(2) {
    margin-top: ${props => props.theme.spacing(2)}px;
  }
`;

/** Preview a component using both the light and dark themes. */
export const SplitThemesPreviewer: SFC<{}> = ({ children }) => (
  <Wrapper>
    <p>Light Theme:</p>
    <ComponentWrapper>{children}</ComponentWrapper>

    <p>Dark Theme:</p>
    <ComponentWrapper style={{ backgroundColor: "#000" }}>
      <DarkTheme>{children}</DarkTheme>
    </ComponentWrapper>
  </Wrapper>
);
