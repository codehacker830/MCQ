import React, { Component } from "react";
import styled from "styled-components";

import { StateNode } from "./StateNode";

export type PanelProps = {
  state: object | null;
};

export class Panel extends Component<PanelProps> {
  render() {
    const { state } = this.props;

    return (
      <Wrapper>
        {state === null ? (
          <Typography textAlign="center" textTransform="uppercase">
            No State
          </Typography>
        ) : (
          Object.keys(state).map(key => (
            <StateNode
              key={key}
              name={key}
              state={(state as { [key: string]: any })[key]}
            />
          ))
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow: auto;

  * {
    box-sizing: border-box;
  }
`;

const Typography = styled.p<{ textAlign?: string; textTransform?: string }>`
  display: block;
  margin: 0;
  font-size: 11px;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco",
    BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", "Arial",
    sans-serif;
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform}`};
`;
