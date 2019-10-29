import Hidden from "@material-ui/core/Hidden";
import React, { Fragment, ReactNode, SFC } from "react";
import styled from "styled-components";
import { Typography } from "../../../../componentsV0/Typography";
import { examDrawerInfoCardBackground } from "../../../../css";

export type ExamDrawerPerformanceAnalysisProps = {
  examResult: "pass" | "fail";
};

export const ExamDrawerPerformanceAnalysis: SFC<
  ExamDrawerPerformanceAnalysisProps
> = props => {
  const { examResult } = props;

  return (
    <div>
      <Hidden smDown>
        <TitleWrapper>
          <SectionText large bold>
            Army Soldier GD Test 1
          </SectionText>
        </TitleWrapper>
      </Hidden>

      <SectionWrapper>
        <SectionText large bold bottomMargin>
          Performance Analysis
        </SectionText>

        {[
          "Total Questions – 50",
          "Not Answered – 10",
          "Correctly Answered – 30",
          "Wrong Answers – 10",
        ].map(text => (
          <SectionText key={text}>{text}</SectionText>
        ))}
      </SectionWrapper>

      <SectionWrapper>
        <SectionText>Total Attempts - 2345</SectionText>
        <SectionText>Total Passed - 1234</SectionText>
        <SectionText bold statColor={examResult === "pass" ? "green" : "red"}>
          Your Result - Pass
        </SectionText>
      </SectionWrapper>

      <SectionWrapper>
        <SectionText>Total Marks - 200</SectionText>
        <SectionText>Topper Score - 180/200</SectionText>
        <SectionText bold>Your Score - 120/120</SectionText>
      </SectionWrapper>

      <SectionWrapper>
        <SectionText bold userRankColor>
          Your Rank - 123/2345
        </SectionText>
      </SectionWrapper>
    </div>
  );
};

const TitleWrapper = styled.div`
  padding: 8px;
  padding-left: 16px;
  background-color: ${examDrawerInfoCardBackground};

  > *:first-child {
    margin: 8px 0;
  }
`;

const SectionWrapper = styled.div`
  padding: 16px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 16px 0;
  }
`;

type SectionTextProps = {
  className?: string;
  bold?: boolean;
  large?: boolean;
  bottomMargin?: boolean;
  userRankColor?: boolean;
  statColor?: "none" | "green" | "red";
};

const SectionText = styled(
  (props: SectionTextProps & { children?: ReactNode }) => {
    const {
      children,
      className,
      large,
      bold,
      bottomMargin,
      userRankColor,
      statColor = "none",
    } = props;

    const classNames: string[] = [];
    if (className) classNames.push(className);
    if (!large) classNames.push("font-small");
    if (userRankColor) classNames.push("user-rank-color");

    if (typeof children !== "string") {
      throw new Error('Expected string for field "children".');
    }

    let text: ReactNode = children;

    if (statColor !== "none") {
      const result = /.*- */.exec(children);
      if (!result) throw new Error("Incorrect format for text.");

      const description = result[0];
      const stat = children.slice(description.length);

      text = [
        <Fragment key="description">{description}</Fragment>,
        <Fragment key="stat">
          <span className={statColor}>{stat}</span>
        </Fragment>,
      ];
    }

    return (
      <Typography
        className={classNames.join(" ")}
        variant={bold ? "examDrawerTitle" : "examDrawerSubtitle"}
        muiTypographyProps={{ paragraph: bottomMargin }}
      >
        {text}
      </Typography>
    );
  },
)`
  &.font-small {
    font-size: 14px;
  }

  &.user-rank-color {
    color: #ffc000;
  }

  .green {
    color: #00b050;
  }

  .red {
    color: #ff0000;
  }
`;
