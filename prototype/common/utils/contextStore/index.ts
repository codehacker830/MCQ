export { createStore } from "./createStore";

import { ActionsType as BaseActionsType } from "./ActionsType";
export type ActionsType<S> = BaseActionsType<S>;

import { ContextValue as BaseContextValue } from "./ContextValue";
export type ContextValue<S, A extends ActionsType<S>> = BaseContextValue<S, A>;
