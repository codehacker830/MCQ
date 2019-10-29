import Head from "next/head";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { State } from "../../store";
import { actions } from "./actions";

type StateProps = {
  locationPageTitle: string;
  localizationLanguage: "en" | "hi";
};

type DispatchProps = {
  onLocationChange: (locationPathname: string) => void;
};

type OwnProps = {};
export type ReduxRouterConnectorProps = OwnProps;

type Props = StateProps & DispatchProps & RouteComponentProps<{}> & OwnProps;

/**
 * Updates the page title to match the currently view page and localization
 * language.
 */
class ReduxRouterConnector extends Component<Props> {
  componentDidMount() {
    this.props.onLocationChange(this.props.location.pathname);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.location.pathname === this.props.location.pathname &&
      prevProps.localizationLanguage === this.props.localizationLanguage
    ) {
      return;
    }

    this.props.onLocationChange(this.props.location.pathname);
  }

  render() {
    const { children, locationPageTitle } = this.props;

    return (
      <>
        <Head>
          <title>{locationPageTitle}</title>
        </Head>

        {children}
      </>
    );
  }
}

const ReduxRouterConnectorContainer = withRouter(
  connect<StateProps, DispatchProps, OwnProps, State>(
    ({ navigation, localization }): StateProps => ({
      locationPageTitle: navigation.locationPageTitle,
      localizationLanguage: localization.localizationLanguage,
    }),
    {
      onLocationChange: actions.updateLocation,
    },
  )(ReduxRouterConnector),
);
export { ReduxRouterConnectorContainer as ReduxRouterConnector };
