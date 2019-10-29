import { css } from "styled-components";

export const fromMobileFlatBorder = () => css`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    box-shadow: none;
    border: 1px solid #dadce0;
    border-radius: 4px;
  }
`;
