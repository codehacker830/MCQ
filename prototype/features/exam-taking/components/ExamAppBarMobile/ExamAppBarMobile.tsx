import React, { SFC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { examAppBarBottomRow, examAppBarTopRow } from "../../../../css";
import { State } from "../../../../store";
import { DarkTheme } from "../../../../theme";
import { actions } from "../../actions";
import { buttonSelector } from "../../selectors";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Apps from "@material-ui/icons/Apps";
import Dashboard from "@material-ui/icons/Dashboard";

import { Typography } from "../../../../componentsV0/Typography";
import {
  TypographyButton,
  TypographyButtonProps,
} from "../../../../componentsV0/TypographyButton";
import { LanguageToggleButton } from "../../../localization";

import { FeatureKey } from "../../types/FeatureKey";
import { ExamAppBarTimer } from "../ExamAppBarTimer";
import { ExamQuestionPalettePopup } from "./ExamQuestionPalettePopup";

type StateProps = {
  showSubmissionSummaryScreen: boolean;
  showStartExamButton: boolean;
};

type DispatchProps = {
  onStartExamButtonClick: () => void;
  onSubmitButtonClick: () => void;
};

type OwnProps = FeatureKey;
export type ExamAppBarMobileProps = OwnProps;

type Props = StateProps & DispatchProps & OwnProps;

const ExamAppBarMobile: SFC<Props> = props => {
  const {
    showSubmissionSummaryScreen,
    showStartExamButton,
    onStartExamButtonClick,
    onSubmitButtonClick,
    featureKey,
  } = props;

  return (
    <DarkTheme>
      <AppBar position="static" color="inherit">
        <ToolbarHalfHeightDarkBlueBackground>
          <IconButtonGroup position="left">
            <IconButton>
              <Dashboard />
            </IconButton>

            <LanguageToggleButton />
          </IconButtonGroup>

          {featureKey === "examTaking" && (
            <AppBarCenterContentWrapper>
              {!showStartExamButton && <ExamAppBarTimer />}
            </AppBarCenterContentWrapper>
          )}

          {featureKey === "examTaking" && (
            <IconButtonGroup position="right">
              {showStartExamButton && (
                // TODO: Fix this type definition:
                <StartExamButton {...{ onClick: onStartExamButtonClick }}>
                  Start Exam
                </StartExamButton>
              )}

              {!showStartExamButton && !showSubmissionSummaryScreen && (
                <SubmitExamButton {...{ onClick: onSubmitButtonClick }}>
                  Submit Exam
                </SubmitExamButton>
              )}

              {showSubmissionSummaryScreen && (
                <>
                  <ButtonSpacer />
                  <ButtonSpacer />
                </>
              )}
            </IconButtonGroup>
          )}
        </ToolbarHalfHeightDarkBlueBackground>

        <ToolbarHalfHeightLightBlueBackground>
          <IconButtonGroup position="left">
            <ExamQuestionPalettePopup featureKey={featureKey}>
              <IconButton>
                <Apps />
              </IconButton>
            </ExamQuestionPalettePopup>
          </IconButtonGroup>

          <AppBarCenterContentWrapper>
            <Typography>Army Soldier GD Test 1</Typography>
          </AppBarCenterContentWrapper>

          <Typography variant="cardStatCaption">200 MM</Typography>
        </ToolbarHalfHeightLightBlueBackground>
      </AppBar>
    </DarkTheme>
  );
};

const ExamAppBarMobileContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  (state, { featureKey }) => ({
    showSubmissionSummaryScreen: state[featureKey].showSubmissionSummaryScreen,
    showStartExamButton: buttonSelector(state[featureKey])
      .startExamButtonVisible,
  }),
  {
    onStartExamButtonClick: () => actions.navigateToQuestion(0),
    onSubmitButtonClick: actions.displaySubmissionSummaryScreen,
  },
)(ExamAppBarMobile);

export { ExamAppBarMobileContainer as ExamAppBarMobile };

const ToolbarHalfHeight = styled(Toolbar)`
  height: 32px;
  min-height: 32px;
`;

const ToolbarHalfHeightDarkBlueBackground = styled(ToolbarHalfHeight)`
  background-color: ${examAppBarTopRow};
`;

const ToolbarHalfHeightLightBlueBackground = styled(ToolbarHalfHeight)`
  background-color: ${examAppBarBottomRow};
`;

const AppBarCenterContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const IconButtonGroup = styled.div<{ position: "left" | "right" }>`
  display: flex;

  ${({ position }) =>
    position === "left"
      ? `
          margin-left: -12px;
        `
      : `
          margin-right: -12px;
        `};
`;

const ButtonSpacer = styled.div`
  width: 48px;
`;

const StartExamButton = styled(TypographyButton).attrs({
  color: "lightGreen",
  variant: "outlined",
})`
  width: 100px;
  min-height: 26px;
  padding: 0;
`;

// TODO: Fix this type definition:
// @ts-ignore
const SubmitExamButton = styled<TypographyButtonProps>(
  StartExamButton as any,
).attrs({
  color: "orange",
  variant: "outlined",
})`
  width: 120px;
  min-height: 26px;
  padding: 0;
`;
