import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

export interface DashboardColumnContainerProps {
  /**
   * Elements to arrange within columns.
   */
  children: ReactNode[];

  /**
   * Interlace the children rather than split them. Instead of splitting by
   * first half and second half, arrange items by alternating left and right.
   */
  interlaced?: boolean;
}

/**
 * Arranges the supplied children into columns. On mobile, the columns are
 * combined into a single column. The first half of children are placed on the
 * left, the rest on the right.
 */
export const DashboardColumnContainer: SFC<
  DashboardColumnContainerProps
> = props => {
  const { children, interlaced } = props;

  let left: ReactNode[] = [];
  let right: ReactNode[] = [];

  if (!interlaced) {
    left = children.slice(0, Math.ceil(children.length / 2));
    right = children.slice(left.length);
  } else {
    for (let i = 0; i < children.length; i += 2) {
      left.push(children[i]);
      if (children[i + 1]) right.push(children[i + 1]);
    }
  }

  return (
    <FlexWrapper>
      <FlexColumn>{left}</FlexColumn>
      <FlexColumn>{right}</FlexColumn>
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const FlexColumn = styled.div`
  flex: 1;
  flex-basis: 100%;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-basis: 0;
    width: 50%;

    &:first-child {
      margin-right: 8px;
    }

    &:last-child {
      margin-left: 8px;
    }
  }

  & > * {
    margin-bottom: 16px;
  }
`;
