import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { bottomNavBoxShadow, fromToolbarHeight } from "../../../../css";
import { State } from "../../../../store";
import { actions } from "../../actions";
import { buttonSelector } from "../../selectors";
import { FeatureKey } from "../../types/FeatureKey";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";

import { TypographyButton } from "../../../../componentsV0/TypographyButton";
import { ExamQuestionReportModal } from "../ExamQuestionReportModal";

type StateProps = {
  previousButtonEnabled: boolean;
  showSubmitExamButton: boolean;
};

type DispatchProps = {
  onPreviousButtonClick: () => any;
  onNextButtonClick: () => any;
  onSubmitExamButtonClick: () => any;
};

type OwnProps = FeatureKey;
export type ExamBottomNavFrameProps = OwnProps;

type Props = StateProps & DispatchProps & OwnProps;

class ExamBottomNavFrame extends Component<Props> {
  private questionReportModal = createRef<ExamQuestionReportModal>();

  render() {
    const {
      children,
      previousButtonEnabled,
      showSubmitExamButton,
      onPreviousButtonClick,
      onNextButtonClick,
      onSubmitExamButtonClick,
      featureKey,
    } = this.props;

    return (
      <Wrapper>
        <ExamQuestionReportModal ref={this.questionReportModal} />

        <PageContentsWrapper>{children}</PageContentsWrapper>

        <PaperWithBoxShadowUpperDirection>
          <ToolbarWithButtonMargins>
            {featureKey === "examTaking" && (
              <>
                <TypographyButton>Mark for Review</TypographyButton>
                <TypographyButton>Clear</TypographyButton>
              </>
            )}
            {featureKey === "examReview" && (
              <TypographyButton onClick={this.handleReportErrorButtonClick}>
                Report Error
              </TypographyButton>
            )}

            <ToolbarSpacer />

            <TypographyButton
              disabled={!previousButtonEnabled}
              onClick={onPreviousButtonClick}
            >
              Previous
            </TypographyButton>

            {!showSubmitExamButton ? (
              <TypographyButton onClick={onNextButtonClick}>
                Next
              </TypographyButton>
            ) : (
              featureKey === "examTaking" && (
                <TypographyButton
                  color="yellow"
                  filled
                  onClick={onSubmitExamButtonClick}
                >
                  Submit Exam
                </TypographyButton>
              )
            )}
          </ToolbarWithButtonMargins>
        </PaperWithBoxShadowUpperDirection>
      </Wrapper>
    );
  }

  private handleReportErrorButtonClick = () => {
    if (!this.questionReportModal.current) return;
    this.questionReportModal.current.openModal();
  };
}

const ExamBottomNavFrameContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  (store, { featureKey }): StateProps => ({
    previousButtonEnabled: buttonSelector(store[featureKey])
      .previousButtonEnabled,
    showSubmitExamButton: buttonSelector(store[featureKey]).submitButtonVisible,
  }),
  {
    onPreviousButtonClick: actions.navigateToPreviousQuestion,
    onNextButtonClick: actions.navigateToNextQuestion,
    onSubmitExamButtonClick: actions.displaySubmissionSummaryScreen,
  },
)(ExamBottomNavFrame);
export { ExamBottomNavFrameContainer as ExamBottomNavFrame };

// Make the page contents the screen height minus the size of both the top and
// bottom nav bars. The base template has top and bottom padding of 24px so we
// subtract the bottom padding to remove the space under the bottom nav bar.
const pageContentsHeight = fromToolbarHeight(
  "height",
  height => `calc(100vh - ${height * 2}px - 24px)`,
);

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: -24px;
`;

const PageContentsWrapper = styled.div`
  padding-bottom: 24px;
  overflow-y: auto;
  ${pageContentsHeight};
`;

const PaperWithBoxShadowUpperDirection = styled(Paper)`
  border-radius: 0;
  ${bottomNavBoxShadow};
  z-index: 1;
`;

const ToolbarWithButtonMargins = styled(Toolbar)`
  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

const ToolbarSpacer = styled.div`
  flex: 1;
`;
