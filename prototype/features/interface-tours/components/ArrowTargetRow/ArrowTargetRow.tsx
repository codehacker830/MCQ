import styled from "styled-components";
import { fromToolbarHeight } from "../../../../css";

export type ArrowTargetRowProps = {
  variant: "exam-half-toolbar" | "toolbar";
};

export const ArrowTargetRow = styled.div<ArrowTargetRowProps>`
  display: flex;
  width: 100vw;

  ${({ variant }) => (variant === "toolbar" ? toolbarHeight : `height: 32px;`)};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    ${({ variant }) => (variant === "toolbar" ? `` : `padding: 0 8px;`)};
  }
`;

const toolbarHeight = fromToolbarHeight("height");
