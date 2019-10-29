import produce from "immer";
import {
  Actions as ExamTakingActions,
  createExamQuestionCategoryPlaceholder,
  ExamTakingAction as ExamTakingActionTypes,
  // reducer as examTakingReducer,
  State as ExamTakingState,
} from "../exam-taking";
import { createQuestionsPlaceholder } from "./placeholders/createQuestionsPlaceholder";

type State = ExamTakingState;

type Actions = ExamTakingActions;

const initialState: State = {
  // #region Inherited from exam-taking module.
  questions: createQuestionsPlaceholder(),
  questionCategories: createExamQuestionCategoryPlaceholder(),

  showOverviewScreen: false,
  showSubmissionSummaryScreen: false,
  currentQuestion: 0,
  // #endregion
};

export const reducer = (state = initialState, action: Actions): State =>
  produce(state, draft => {
    switch (action.type) {
      case ExamTakingActionTypes.NavigateToNextQuestion:
        if (state.currentQuestion - 1 !== state.questions!.length) {
          draft.currentQuestion = state.currentQuestion + 1;
        }
        break;

      case ExamTakingActionTypes.NavigateToPreviousQuestion:
        if (state.currentQuestion !== 0) {
          draft.currentQuestion = state.currentQuestion - 1;
        }
        break;

      case ExamTakingActionTypes.NavigateToQuestion:
        draft.currentQuestion = action.payload;
        break;
    }
  });
