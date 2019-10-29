import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import uuid from "uuid/v1";
import { State } from "../../store";
import { actions } from "./actions";
import { ICategorySubscriptions } from "./models/ICategorySubscriptions";

type StateProps = Pick<
  State["subscriptionManagement"],
  "loaded" | "subscriptions" | "categories" | "skipOnboardingProcess"
>;

type DispatchProps = {
  setSkipOnboardingProcess: () => void;
  loadPlaceholderData: () => void;
  subscriptionsAdditionSuccess: (subscriptions: ICategorySubscriptions) => void;
};

type OwnProps = RouteComponentProps<{}>;

type Props = StateProps & DispatchProps & OwnProps;

/**
 * This is a component for development purposes. It loads placeholder data
 * when a user visits /dashboard directly rather than /welcome/entries. This
 * speeds up development by skipping the onboarding process.
 *
 * TODO: Remove this component after development.
 */
class PlaceholderSubscriptionLoader extends Component<Props> {
  componentDidMount() {
    const {
      loaded,
      loadPlaceholderData,
      location,
      setSkipOnboardingProcess,
    } = this.props;

    if (!loaded && location.pathname === "/dashboard") {
      setSkipOnboardingProcess();
      loadPlaceholderData();
      return;
    }
  }

  componentDidUpdate() {
    const {
      skipOnboardingProcess,
      loaded,
      categories,
      subscriptions,
      subscriptionsAdditionSuccess,
    } = this.props;

    if (!skipOnboardingProcess) return;

    if (loaded && !subscriptions) {
      const subscriptionID = uuid();

      subscriptionsAdditionSuccess(
        categories.slice(0, 5).map((category): ICategorySubscriptions[0] => ({
          categoryID: category.id,
          quantityIndex: 3,
          subscriptionID,
        })),
      );
    }
  }

  render() {
    const { children, subscriptions, skipOnboardingProcess } = this.props;

    if (!subscriptions && skipOnboardingProcess) {
      return <div>Loading placeholder subscriptions...</div>;
    }

    return children;
  }
}

const PlaceholderSubscriptionLoaderContainer = withRouter(
  connect<StateProps, DispatchProps, OwnProps, State>(
    ({ subscriptionManagement }): StateProps => ({
      skipOnboardingProcess: subscriptionManagement.skipOnboardingProcess,
      loaded: subscriptionManagement.loaded,
      categories: subscriptionManagement.categories,
      subscriptions: subscriptionManagement.subscriptions,
    }),
    {
      setSkipOnboardingProcess: actions.setSkipOnboardingProcess,
      loadPlaceholderData: actions.loadPlaceholderData,
      subscriptionsAdditionSuccess: actions.subscriptionAdditionSuccess,
    },
  )(PlaceholderSubscriptionLoader),
);
export {
  PlaceholderSubscriptionLoaderContainer as PlaceholderSubscriptionLoader,
};
