import React, { SFC } from "react";
import styled, { css } from "styled-components";

import { fade } from "@material-ui/core/styles/colorManipulator";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

import { Button } from "../../../../componentsV0/Button";
import { Typography } from "../../../../componentsV0/Typography";

export interface ExamAnswerSelectItemProps {
  className?: string;

  /**
   * Answer text.
   */
  answerLabel: string;

  /**
   * Answer's index in the list. It is used for both the onClick handler and in
   * generating the letter to the left of the answer label.
   */
  answerIndex: number;

  /**
   * Whether the answer is selected or not.
   */
  selected: boolean;

  /**
   * Checkmark style. During exam taking, always uses the style "user-correct".
   * During exam review, the styles indicate whether the user's exam answer
   * selection was correct or not and provides the correct answer if not.
   *
   * @default user-correct
   */
  selectionStyle?: "user-correct" | "user-incorrect" | "exam-correct";

  /**
   * Enables item selection. This is set to false in exam review mode to remove
   * the button styling.
   *
   * TODO: Come up with an alternate solution because the component polymorphism
   * of the Material UI Button component seems to have changed.
   *
   * @default true
   * @deprecated
   */
  isButton?: boolean;

  /**
   * Called when the answer is clicked.
   */
  onClick: (answerIndex: number) => any;
}

/**
 * A button for an exam answer.
 */
const ExamAnswerSelectItemBase: SFC<ExamAnswerSelectItemProps> = props => {
  const {
    className,
    answerLabel,
    answerIndex,
    selected,
    selectionStyle = "user-correct",
    isButton = true,
    onClick,
  } = props;

  const classNames: string[] = [];
  if (className) classNames.push(className);
  if (selected) classNames.push("selected");
  classNames.push(selectionStyle);

  const answerLetter = getAnswerLetterFromIndex(answerIndex);

  const Icon = selectionStyle === "user-incorrect" ? Close : Check;

  if (!isButton) {
    /* tslint:disable-next-line:no-console */
    console.warn('"isButton" prop is depreciated.');
  }

  return (
    <Button
      className={classNames.join(" ")}
      variant="text"
      onClick={() => onClick(answerIndex)}
      // component={isButton ? "button" : "div"}
      disableRipple={!isButton}
      disableFocusRipple={!isButton}
    >
      <div className="selection-circle">
        <div className="letter-circle">
          <Typography className="answer-letter">{answerLetter}</Typography>
        </div>

        <div className="selection-mask" />
        <Icon className="check-mark" />
      </div>

      <Typography className="answer-label">{answerLabel}</Typography>
    </Button>
  );
};

const selectionCircleBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const StyledExamAnswerSelectItem = styled(ExamAnswerSelectItemBase)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  ${props =>
    !props.isButton &&
    `
    &:hover {
      background-color: transparent !important;
      cursor: inherit !important;

      * {
        cursor: inherit !important;
      }
    }
  `};

  .selection-circle {
    ${selectionCircleBase};
    position: relative;
  }

  .selection-mask {
    ${selectionCircleBase};
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Selection Mask */
  &.selected {
    & .selection-mask {
      display: flex;
    }

    &.user-correct .selection-mask {
      background-color: ${({ theme }) =>
        fade(theme.palette.primary.light, 0.45)};
    }

    &.user-incorrect .selection-mask {
      background-color: ${({ theme }) => fade(theme.palette.error.main, 0.65)};
    }

    &.exam-correct .selection-mask {
      background-color: ${({ theme }) =>
        fade(theme.palette.secondary.main, 0.65)};
    }
  }

  .letter-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    border: 1px solid #dbdbdb;
  }

  .check-mark {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    transform: translate(-50%, -50%);
  }

  &.user-incorrect .check-mark {
    color: #fff;
  }

  &.exam-correct .check-mark {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  &.selected .check-mark {
    display: block;
  }

  .answer-label {
    margin-left: 4px;
  }

  .answer-letter {
    font-size: 12px;
  }
`;

export const ExamAnswerSelectItem: SFC<ExamAnswerSelectItemProps> = props => (
  <StyledExamAnswerSelectItem {...props} />
);

const getAnswerLetterFromIndex = (index: number): string =>
  String.fromCharCode(65 /* Beginning of alphabet */ + index);
