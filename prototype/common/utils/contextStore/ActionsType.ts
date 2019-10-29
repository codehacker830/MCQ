export interface ActionsType<State> {
  [key: string]: (...args: any[]) => (state: State) => Partial<State>;
}
