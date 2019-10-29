import { ArcherElement } from "@strothj/react-archer";
import React, { forwardRef, SFC } from "react";
import styled from "styled-components";

export type ArrowTargetRowItemProps = ArrowTargetRowItemWrapperProps &
  ArrowTargetRowItemTargetElementProps & {
    id: string;
  };

export const ArrowTargetRowItem: SFC<ArrowTargetRowItemProps> = props => {
  const { id, marginLeft, width } = props;

  return (
    <ArrowTargetRowItemWrapper marginLeft={marginLeft}>
      <ArcherElement id={id} style={{ height: "100%" }}>
        <ArrowTargetRowItemTargetElement width={width} />
      </ArcherElement>
    </ArrowTargetRowItemWrapper>
  );
};

type ArrowTargetRowItemWrapperProps = {
  marginLeft?: number;
};

const ArrowTargetRowItemWrapper = styled.div<ArrowTargetRowItemWrapperProps>`
  ${({ marginLeft }) =>
    marginLeft !== undefined && `padding-left: ${marginLeft}px`};
`;

type ArrowTargetRowItemTargetElementProps = {
  width: number;
};

const ArrowTargetRowItemTargetElement = forwardRef<
  HTMLDivElement,
  ArrowTargetRowItemTargetElementProps
>((props, ref) => (
  <div
    ref={ref}
    style={{
      width: props.width,
      height: "100%",
    }}
  />
));
