import { Component, ComponentType, ConsumerProps } from "react";
import { connect } from "react-redux";
import { State } from "../../../store";
import { actions } from "../actions";

type StateProps = {
  localizationLanguage: "en" | "hi";
};

type DispatchProps = {
  setLocalizationLanguage: (localizationLanguage: "en" | "hi") => void;
};

type ContextProps = StateProps & DispatchProps;

type OwnProps = ConsumerProps<ContextProps>;

type Props = StateProps & DispatchProps & OwnProps;

/**
 * Provides a component with a render method which exposes the contents of the
 * Localization store. This is provided as a convenience.
 */
class LocalizationStateConsumer extends Component<Props, ContextProps> {
  static getDerivedStateFromProps(
    props: Props,
    state: ContextProps,
  ): ContextProps | null {
    if (
      props.localizationLanguage !== state.localizationLanguage ||
      props.setLocalizationLanguage !== state.setLocalizationLanguage
    ) {
      return {
        localizationLanguage: props.localizationLanguage,
        setLocalizationLanguage: props.setLocalizationLanguage,
      };
    }

    return null;
  }
  state: ContextProps = {
    localizationLanguage: "en",
    // tslint:disable-next-line:no-empty
    setLocalizationLanguage: () => {},
  };

  render() {
    return this.props.children(this.state);
  }
}

const LocalizationStateConsumerContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  ({ localization }) => ({
    localizationLanguage: localization.localizationLanguage,
  }),
  {
    setLocalizationLanguage: actions.setLocalizationLanguage,
  },
  // TODO: Fix this typing issue.
)((LocalizationStateConsumer as any) as ComponentType<Props>);
export { LocalizationStateConsumerContainer as LocalizationStateConsumer };
