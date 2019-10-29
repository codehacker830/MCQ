import React, { Component, Context } from "react";

import { ActionsType } from "./ActionsType";
import { bindActions } from "./bindActions";
import { ContextValue } from "./ContextValue";

/**
 * Provides the state and actions to children components.
 *
 * @param initialState Initial store state.
 * @param actions Actions which can be applied to the store.
 * @param context The React Context to wrap.
 */
export const createProvider = <State, Actions extends ActionsType<State>>(
  initialState: State,
  actions: Actions,
  context: Context<ContextValue<State, Actions>>,
) => {
  class Provider extends Component<{}, ContextValue<State, Actions>> {
    constructor(props: {}) {
      super(props);

      this.state = {
        ...(initialState as any),
        ...bindActions(this, actions as any),
        setState: this.setState.bind(this),
      };
    }

    render() {
      const { children } = this.props;

      return <context.Provider value={this.state}>{children}</context.Provider>;
    }
  }

  return Provider;
};
