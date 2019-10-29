import React, { SFC } from "react";
import styled from "styled-components";
import { examDrawerInfoCardBackground, examTimerYellow } from "../../../../css";
import { UserAppDrawerTheme } from "../../../../theme";

import { Typography } from "../../../../componentsV0/Typography";

// tslint:disable-next-line:no-empty-interface
export interface ExamDrawerTimerInfoCardProps {}

/**
 * Displays the current test, total marks, and remaining test time in the user
 * dashboard exam page.
 */
export const ExamDrawerTimerInfoCard: SFC<
  ExamDrawerTimerInfoCardProps
> = props => {
  const {} = props;

  return (
    <UserAppDrawerTheme>
      <Wrapper>
        <Typography variant="examDrawerTitle">
          Army Solider GD Test 1
        </Typography>

        <Typography variant="examDrawerSubtitle" style={{ color: "#a6a6a6" }}>
          Total Marks: 200
        </Typography>

        <Typography
          variant="examDrawerTitle"
          style={{ color: examTimerYellow }}
        >
          00:00:00
        </Typography>
      </Wrapper>
    </UserAppDrawerTheme>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  padding-left: 16px;
  background-color: ${examDrawerInfoCardBackground};

  & > * {
    margin: 8px 0;
  }
`;
