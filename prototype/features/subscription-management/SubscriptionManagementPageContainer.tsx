import { withFormik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuid from "uuid/v1";
import { State } from "../../store";
import { actions } from "./actions";
import { isOnboardingSelector } from "./selectors";
import { DispatchProps, FormState, OwnProps, Props, StateProps } from "./types";

import { SubscriptionManagementPage } from "./SubscriptionManagementPage";

export type SubscriptionManagementPageProps = OwnProps;

const initialFormState: FormState = {
  selectedEntryIDs: [],
  selectedQuantities: [],
};

const SubscriptionManagementPageContainer = withRouter(
  connect<StateProps, DispatchProps, OwnProps, State>(
    (state): StateProps => {
      const {
        subscriptionManagement: {
          loaded,
          entries,
          categories,
          categoryQuantitySelectionSettings,
          subscriptions,
        },
      } = state;

      return {
        loaded,
        isOnboarding: isOnboardingSelector(state),

        entries,
        categories,
        categoryQuantitySelectionSettings,

        subscriptions,
      };
    },
    {
      loadPlaceholderData: actions.loadPlaceholderData,
      submitSubscriptions: actions.subscriptionAdditionSuccess,
    },
  )(
    withFormik<Props, FormState>({
      mapPropsToValues: () => initialFormState,
      handleSubmit: (values, formikBag) => {
        const { selectedQuantities: intermediateSelectedQuantities } = values;
        const { submitSubscriptions } = formikBag.props;

        // Filter out category quantities that are un-selected (null).
        const selectedQuantities = intermediateSelectedQuantities.filter(
          quantity => quantity.quantityIndex !== null,
        );
        const subscriptionID = uuid();

        submitSubscriptions(
          selectedQuantities.map(quantity => ({
            categoryID: quantity.categoryID,
            quantityIndex: quantity.quantityIndex!,
            subscriptionID,
          })),
        );

        if (!formikBag.props.isOnboarding) {
          alert(
            "Display congratulations or summary of additional subscriptions purchase.",
          );
          formikBag.resetForm();
        }
      },
    })(SubscriptionManagementPage),
  ),
);
export { SubscriptionManagementPageContainer as SubscriptionManagementPage };
