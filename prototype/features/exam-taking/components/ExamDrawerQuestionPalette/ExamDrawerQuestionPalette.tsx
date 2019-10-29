import React, { SFC } from "react";
import styled from "styled-components";
import {
  examDrawerInfoCardBackground,
  examQuestionStatusAnswered,
  examQuestionStatusMarkedForReview,
  examQuestionStatusNotAnswered,
  examQuestionStatusNotVisited,
} from "../../../../css";
import { UserAppDrawerTheme } from "../../../../theme";

import { Typography } from "../../../../componentsV0/Typography";

// tslint:disable-next-line:no-empty-interface
export interface ExamDrawerQuestionPaletteProps {}

export const ExamDrawerQuestionPalette: SFC<
  ExamDrawerQuestionPaletteProps
> = props => {
  const {} = props;

  return (
    <UserAppDrawerTheme>
      <Wrapper>
        <Typography variant="examDrawerTitle">Question Palette</Typography>

        <ItemWrapper>
          {[
            { color: examQuestionStatusAnswered, title: "Answered" },
            { color: examQuestionStatusNotAnswered, title: "Not Answered" },
            {
              color: examQuestionStatusMarkedForReview,
              title: "For Review",
            },
            {
              color: examQuestionStatusNotVisited,
              title: "Not Visited",
            },
          ].map(i => (
            <Item key={i.title}>
              <Circle style={{ backgroundColor: i.color }} />
              <Typography variant="cardStatCaption">{i.title}</Typography>
            </Item>
          ))}
        </ItemWrapper>
      </Wrapper>
    </UserAppDrawerTheme>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  padding-left: 16px;
  background-color: ${examDrawerInfoCardBackground};

  > *:first-child {
    margin: 8px 0;
    margin-bottom: 16px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 8px;

  * {
    font-size: 11px;
  }
`;

const Circle = styled.div`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 50%;
`;
