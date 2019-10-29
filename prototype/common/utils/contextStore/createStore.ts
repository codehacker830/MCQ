import { createContext, SFC } from "react";

import { ActionsType } from "./ActionsType";
import { ContextValue } from "./ContextValue";
import { createConsumer } from "./createConsumer";
import { createProvider } from "./createProvider";
import { createSetter } from "./createSetter";

/**
 * Creates a store that uses React Context.
 *
 * @param initialState Initial store state.
 * @param actions Action creators to provide state mutation.
 * @param storeName Optional store name for error messages.
 */
export function createStore<State, Actions extends ActionsType<State>>(
  initialState: State,
  actions: Actions,
  storeName?: string,
) {
  const context = createContext<ContextValue<State, Actions>>(null as any);

  const Provider = createProvider<State, Actions>(
    initialState,
    actions,
    context,
  );

  const Consumer = createConsumer<ContextValue<State, Actions>>(
    context,
    storeName,
  );

  return {
    Provider,
    Consumer,
    // TODO: Fix type:
    // @ts-ignore
    createSetter: createSetter.bind(null, Consumer, storeName) as (
      field: keyof State,
    ) => SFC<Pick<State, keyof State>>,
  };
}
