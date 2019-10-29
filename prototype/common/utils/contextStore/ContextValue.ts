import { Component } from "react";
import { ActionsType } from "./ActionsType";

export type ContextValue<State, Actions extends ActionsType<State>> = Readonly<
  State &
    Actions & {
      setState: Component<{}, State>["setState"];
    }
>;
