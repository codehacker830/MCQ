import React, { SFC } from "react";
import styled from "styled-components";
import { textGrey, whiteDark } from "../../../../css";

import { Typography } from "../../../../componentsV0/Typography";

export interface ExamHeaderProps {
  /**
   * Exam section title.
   *
   * Example: Part 1. General Knowledge
   */
  sectionTitle: string;

  /**
   * Amount of marks given or taken for answering the questions in this section.
   * It will be surrounded by parentheses and applied a grey color. It will
   * follow directly after the section title.
   *
   * Example: +2, -.33
   */
  sectionMarkingsCaption: string;

  /**
   * Section instructions, shown under the section title.
   */
  sectionInstructions: string;

  /**
   * Question text including the question number.
   */
  question: string;

  /**
   * Question number (1 based).
   */
  questionNumber: number;

  /**
   * Exam name, shown under the question text in grey text.
   */
  examName: string;
}

export const ExamHeader: SFC<ExamHeaderProps> = props => {
  const {
    sectionTitle,
    sectionMarkingsCaption,
    sectionInstructions,
    question,
    questionNumber,
    examName,
  } = props;

  return (
    <Wrapper>
      <Typography variant="examTitle">
        {sectionTitle}
        &nbsp;
        <MarkingsCaption>({sectionMarkingsCaption})</MarkingsCaption>
      </Typography>

      <Well>
        <Typography>{sectionInstructions}</Typography>
      </Well>

      <Typography variant="examQuestion">
        Q{questionNumber}. {question}
      </Typography>

      <ExamName>{examName}</ExamName>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > * {
    margin-bottom: 8px;
  }
`;

const MarkingsCaption = styled.span`
  /* So entire span goes to new line on mobile. */
  display: inline-block;
  margin-top: 8px;
  color: ${textGrey};

  ${({ theme }) => theme.breakpoints.down("xs")} {
    display: none;
  }
`;

const ExamName = styled(Typography)`
  font-size: 12px;
  color: ${textGrey};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

export const Well = styled.div`
  padding: 16px 8px;
  background-color: ${whiteDark};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-left: -8px;
    margin-right: -8px;
  }
`;
