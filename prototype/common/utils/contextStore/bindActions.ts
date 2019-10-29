import { Component } from "react";
import { ActionsType } from "./ActionsType";

export const bindActions = <State, Actions extends ActionsType<State>>(
  contextProviderComponent: Component<{}, State>,
  actions: Actions,
) => {
  // tslint:disable-next-line:no-object-literal-type-assertion
  const boundActions = {} as Actions;

  Object.keys(actions).forEach(key => {
    const boundAction = (...actionCreatorArgs: any[]) => {
      const actionCreator = actions[key];
      const action = actionCreator(...actionCreatorArgs);

      contextProviderComponent.setState(state => {
        const update = action(state);
        return update as Pick<State, keyof State>;
      });
    };

    // TODO: Fix type:
    // @ts-ignore
    boundActions[key] = boundAction as typeof actions[keyof Actions];
  });

  return boundActions;
};
