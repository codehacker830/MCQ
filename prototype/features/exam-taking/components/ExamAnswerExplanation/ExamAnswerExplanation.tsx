import React, { SFC } from "react";
import styled from "styled-components";
import { Typography } from "../../../../componentsV0/Typography";
import { Well } from "../ExamHeader";

export type ExamAnswerExplanationProps = {
  explanation: string;
};

export const ExamAnswerExplanation: SFC<ExamAnswerExplanationProps> = props => {
  const { explanation } = props;

  return (
    <Wrapper>
      <Typography style={{ fontWeight: 600 }}>Explanation.</Typography>
      <Typography>{explanation}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled(Well)`
  background-color: #deebf7;
`;
