import React, { Fragment, SFC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State } from "../../../../store";
import { actions } from "../../actions";
import { buttonSelector } from "../../selectors";
import { FeatureKey } from "../../types/FeatureKey";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Divider } from "../../../../components/Divider";
import { Typography } from "../../../../components/Typography";
import { TypographyButton } from "../../../../componentsV0/TypographyButton";
import { LanguageToggleButton } from "../../../localization";

type StateProps = {
  showStartExamButton: boolean;
  showSubmitButton: boolean;
};

type DispatchProps = {
  onStartExamButtonClick: () => any;
  onSubmitExamButtonClick: () => any;
};

type OwnProps = FeatureKey;
export type ExamAppBarProps = OwnProps;

type Props = StateProps & DispatchProps & OwnProps;

const ExamAppBar: SFC<Props> = props => {
  const {
    showStartExamButton,
    showSubmitButton,
    onStartExamButtonClick,
    onSubmitExamButtonClick,
    featureKey,
  } = props;

  return (
    <AppBar color="inherit" position="static">
      <ToolbarWithButtonMargins>
        <TypographyButton>{"<"} Dashboard</TypographyButton>

        {featureKey === "examTaking" && (
          <>
            {showStartExamButton && (
              <TypographyButton
                color="primary"
                onClick={onStartExamButtonClick}
              >
                Start Exam
              </TypographyButton>
            )}

            {showSubmitButton && (
              <TypographyButton
                color="orange"
                onClick={onSubmitExamButtonClick}
              >
                Submit Exam
              </TypographyButton>
            )}
          </>
        )}

        {featureKey === "examReview" &&
          ["Success - 80%", "Wrong - 14%", "Left - 6%"].map(stat => (
            <Fragment key={stat}>
              <Divider direction="vertical" verticalVariantHeight="40px" />

              <Typography color="primary">{stat}</Typography>
            </Fragment>
          ))}

        {featureKey === "examReview" && (
          <>
            <Divider direction="vertical" verticalVariantHeight="40px" />
            <Typography>Difficulty - Easy</Typography>
          </>
        )}

        <FlexSpacer />

        <LanguageToggleButton />
      </ToolbarWithButtonMargins>
    </AppBar>
  );
};

const ExamAppBarContainer = connect<StateProps, DispatchProps, OwnProps, State>(
  (store, { featureKey }): StateProps => ({
    showStartExamButton: buttonSelector(store[featureKey])
      .startExamButtonVisible,
    showSubmitButton:
      !store[featureKey].showOverviewScreen &&
      !store[featureKey].showSubmissionSummaryScreen &&
      !buttonSelector(store[featureKey]).submitButtonVisible,
  }),
  {
    onStartExamButtonClick: () => actions.navigateToQuestion(0),
    onSubmitExamButtonClick: actions.displaySubmissionSummaryScreen,
  },
)(ExamAppBar);
export { ExamAppBarContainer as ExamAppBar };

const ToolbarWithButtonMargins = styled(Toolbar)`
  > *:not(:last-child) {
    margin-right: 16px;
  }
`;

const FlexSpacer = styled.div`
  flex: 1;
`;
