import { createSelector } from "reselect";
import { State } from "./reducer";

const currentQuestionSelector = (state: State) => state.currentQuestion;
const questionsSelector = (state: State) => state.questions;
const showOverviewScreenSelector = (state: State) => state.showOverviewScreen;

export const buttonSelector = createSelector(
  currentQuestionSelector,
  questionsSelector,
  showOverviewScreenSelector,
  (currentQuestion, questions, showOverviewScreen) => ({
    previousButtonEnabled: questions !== null && currentQuestion > 0,
    submitButtonVisible:
      questions !== null && currentQuestion === questions.length - 1,
    startExamButtonVisible: showOverviewScreen,
  }),
);
