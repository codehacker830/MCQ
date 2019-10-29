import React, { Component } from "react";
import styled from "styled-components";

type Props = {
  state: unknown;
  name: string;
  depth?: number;
};
export type StateNodeProps = Props;

type State = {
  expanded: boolean;
};

export class StateNode extends Component<Props, State> {
  state: State = { expanded: true };

  render() {
    const { name, state, depth = 0 } = this.props;
    const { expanded } = this.state;

    let isArrowVisible = false;
    const isObject =
      state !== null && state !== undefined && typeof state === "object";

    if (isObject) isArrowVisible = true;

    return (
      <>
        <Wrapper
          style={{ cursor: isObject ? "pointer" : undefined }}
          onClick={this.handleClick}
        >
          <Arrow expanded={expanded} visible={isArrowVisible} depth={depth} />
          <Typography>{name}</Typography>
          <Value value={state} />
        </Wrapper>

        {expanded &&
          isObject &&
          Object.keys(state as object).map(key => (
            <StateNode
              key={key}
              depth={depth + 1}
              name={key}
              state={(state as { [key: string]: any })[key]}
            />
          ))}
      </>
    );
  }

  private handleClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 3px;
`;

const Typography = styled.p`
  display: block;
  margin: 0;
  font-family: monaco, Consolas, "Lucida Console", monospace;
  font-size: 12px;
`;

const Arrow = styled(
  ({
    className,
  }: {
    className?: string;
    expanded: boolean;
    visible: boolean;
    depth: number;
  }) => (
    <div className={className}>
      <Typography className="arrow">▶</Typography>
    </div>
  ),
)`
  padding-right: 0.5em;
  margin-left: ${({ depth }) => depth * 0.875}em;
  ${({ visible }) => !visible && "visibility: hidden"};

  .arrow {
    font-size: 9px;
    transition: 150ms;
    transform: rotateZ(${({ expanded }) => (expanded ? 90 : 0)}deg);
    transform-origin: 45% 50% 0px;
  }
`;

const Value = styled(
  ({ className, value }: { className?: string; value: any }) => (
    <>
      <Typography>:&nbsp;</Typography>
      <Typography className={className}>{wrapValue(value)}</Typography>
    </>
  ),
)`
  color: ${({ value }) => getValueColor(value)};
`;

const wrapValue = (value: any): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "[ ... ]";
  if (typeof value === "object") return "{ ... }";
  if (typeof value === "string") {
    return `"${value}"`;
  }

  return value.toString();
};

const getValueColor = (value: any): string => {
  if (value === null || value === undefined) {
    return "#da6d2e";
  }

  if (typeof value === "object") return "#cca287";

  if (typeof value === "string") {
    return "#96c64c";
  }

  return "#fc6d24";
};
