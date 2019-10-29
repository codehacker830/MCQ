// Reference: https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

type FunctionType = (...args: any[]) => any;
// tslint:disable-next-line:interface-over-type-literal
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };

/**
 * @see https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575
 */
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export type ActionHandler<State, Payload = any> = (
  state: State,
  action: { type: string; payload?: Payload },
) => State;
