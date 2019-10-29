import { State } from "../../../store";

export type FeatureKey = {
  /**
   * Redux store to use while rendering the component. This allows using the
   * store from the feature "exam-review" or "exam-taking" depending on which
   * feature is importing the component.
   */
  featureKey: keyof Pick<State, "examReview" | "examTaking">;
};
