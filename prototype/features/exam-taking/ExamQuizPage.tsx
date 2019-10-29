import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { actions } from "./actions";

import { DashboardColumnContainer } from "../../componentsV0/DashboardColumnContainer";

import {
  ExamOverviewBluePrint,
  ExamOverviewMarkings,
  ExamOverviewMobile,
} from "../exam-overview";
import { ExamTakingTourModal } from "../interface-tours";
import { ExamAnswerSelect } from "./components/ExamAnswerSelect";
import { examAnswerSelectPlaceholderProps } from "./components/ExamAnswerSelect/ExamAnswerSelect.placeholder";
import { ExamContents } from "./components/ExamContents";
import { examContentsPlaceholderProps } from "./components/ExamContents/ExamContents.placeholder";
import {
  ExamHeader,
  examHeaderPlaceholderProps,
} from "./components/ExamHeader";
import { ExamLayout } from "./components/ExamLayout";
import { ExamSubmissionSummary } from "./components/ExamSubmissionSummary";
import { examSubmissionSummaryPlaceholderProps } from "./components/ExamSubmissionSummary/ExamSubmissionSummary.placeholder";
import { ExamTemplate } from "./components/ExamTemplate";

interface StateProps {
  showOverviewScreen: boolean;
  showSubmissionSummaryScreen: boolean;
  currentQuestion: number;
}

interface DispatchProps {
  loadPlaceholderExam: () => void;
}

// tslint:disable-next-line:no-empty-interface
interface OwnProps {}

type ExamQuizPageProps = StateProps & DispatchProps & OwnProps;

class ExamQuizPage extends Component<ExamQuizPageProps> {
  constructor(props: ExamQuizPageProps) {
    super(props);

    props.loadPlaceholderExam();
  }

  render() {
    const {
      showOverviewScreen,
      showSubmissionSummaryScreen,
      currentQuestion,
    } = this.props;

    const paneKeyNodeMap = Array.from({ length: 15 }, (_, index) => ({
      key: `pane-${index}`,
      node: (
        <ExamLayout
          headerNode={
            <ExamHeader
              questionNumber={index + 1}
              {...examHeaderPlaceholderProps}
            />
          }
          contentsNode={
            <ExamContents
              {...examContentsPlaceholderProps}
              answerNode={
                <ExamAnswerSelect {...examAnswerSelectPlaceholderProps} />
              }
            />
          }
        />
      ),
    }));

    return (
      <>
        <ExamTemplate
          staticView={
            showOverviewScreen ? (
              <ExamOverviewMobile />
            ) : showSubmissionSummaryScreen ? (
              <ExamSubmissionSummary
                {...examSubmissionSummaryPlaceholderProps}
              />
            ) : (
              undefined
            )
          }
          paneKeyNodeMap={paneKeyNodeMap}
          featureKey="examTaking"
        >
          {showOverviewScreen && (
            <DashboardColumnContainer>
              {[
                <ExamOverviewBluePrint key="blue-print" />,
                <ExamOverviewMarkings key="markings" />,
              ]}
            </DashboardColumnContainer>
          )}

          {showSubmissionSummaryScreen && (
            <ExamSubmissionSummary {...examSubmissionSummaryPlaceholderProps} />
          )}

          {!showOverviewScreen &&
            !showSubmissionSummaryScreen &&
            paneKeyNodeMap[currentQuestion].node}
        </ExamTemplate>

        {!showOverviewScreen && !showSubmissionSummaryScreen && (
          <ExamTakingTourModal />
        )}
      </>
    );
  }
}

const ExamQuizPageContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  state => ({
    showOverviewScreen: state.examTaking.showOverviewScreen,
    showSubmissionSummaryScreen: state.examTaking.showSubmissionSummaryScreen,
    currentQuestion: state.examTaking.currentQuestion,
  }),
  {
    loadPlaceholderExam: actions.loadPlaceholderExam,
  },
)(ExamQuizPage);

export { ExamQuizPageContainer as ExamQuizPage };
