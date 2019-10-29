import React, { SFC } from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import {
  ExamAnalysisPanelMobile,
  ExamAnswerExplanation,
  ExamAnswerSelect,
  examAnswerSelectPlaceholderProps,
  ExamAnswerSelectProps,
  ExamContents,
  examContentsPlaceholderProps,
  ExamHeader,
  examHeaderPlaceholderProps,
  ExamLayout,
  ExamTemplate,
} from "../exam-taking";

const examAnswerSelectProps: ExamAnswerSelectProps = {
  ...examAnswerSelectPlaceholderProps,
  areClickable: false,
  correctAnswerIndex: 2,
};

const paneKeyNodeMap = Array.from({ length: 15 }, (_, index) => ({
  key: `pane-${index}`,
  node: (
    <>
      <ExamAnalysisPanelMobile />
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
            answerNode={<ExamAnswerSelect {...examAnswerSelectProps} />}
          />
        }
        answerExplanationNode={
          <ExamAnswerExplanation explanation="The explanation to the answer can come here in any length so that the look of the site donot get distorted and it can scroll down. The only issue is where to position the analysis of this question." />
        }
      />
    </>
  ),
}));

export type ExamReviewPageProps = {
  currentQuestion: number;
};

const ExamReviewPage: SFC<ExamReviewPageProps> = props => {
  const { currentQuestion } = props;

  return (
    <ExamTemplate paneKeyNodeMap={paneKeyNodeMap} featureKey="examReview">
      {paneKeyNodeMap[currentQuestion].node}
    </ExamTemplate>
  );
};

const ExamReviewPageContainer = connect((state: State) => ({
  currentQuestion: state.examReview.currentQuestion,
}))(ExamReviewPage);
export { ExamReviewPageContainer as ExamReviewPage };
