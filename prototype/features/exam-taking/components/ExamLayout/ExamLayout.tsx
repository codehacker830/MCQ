import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

export type ExamLayoutProps = {
  headerNode: ReactNode;

  contentsNode: ReactNode;

  answerExplanationNode?: ReactNode;
};

export const ExamLayout: SFC<ExamLayoutProps> = props => {
  const { headerNode, contentsNode, answerExplanationNode } = props;

  return (
    <Wrapper>
      {headerNode}
      {contentsNode}
      {answerExplanationNode}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  padding-top: 16px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding-top: 0;
  }
`;
