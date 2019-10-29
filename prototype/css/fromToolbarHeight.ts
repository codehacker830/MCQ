import { css } from "styled-components";

const defaultValueBuilder = (height: number) => `${height}px`;

export const fromToolbarHeight = (
  property: string,
  valueBuilder = defaultValueBuilder,
) => css`
  ${property}: ${valueBuilder(56)};

  ${({ theme }) => theme.breakpoints.up("xs")} and (orientation: landscape) {
    ${property}: ${valueBuilder(48)};
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    ${property}: ${valueBuilder(64)};
  }
`;
