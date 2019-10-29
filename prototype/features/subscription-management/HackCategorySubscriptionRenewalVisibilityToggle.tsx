import { Component, ConsumerProps } from "react";

export type HackCategorySubscriptionRenewalVisibilityToggleProps = ConsumerProps<
  HackCategorySubscriptionRenewalVisibilityToggleState
>;

export type HackCategorySubscriptionRenewalVisibilityToggleState = {
  revealed: boolean;
  toggleReveal: () => void;
};

export class HackCategorySubscriptionRenewalVisibilityToggle extends Component<
  HackCategorySubscriptionRenewalVisibilityToggleProps,
  HackCategorySubscriptionRenewalVisibilityToggleState
> {
  toggleReveal = () => {
    this.setState(state => ({ revealed: !state.revealed }));
  };

  // tslint:disable-next-line: member-ordering
  state: HackCategorySubscriptionRenewalVisibilityToggleState = {
    revealed: false,
    toggleReveal: this.toggleReveal,
  };

  render() {
    return this.props.children(this.state);
  }
}
