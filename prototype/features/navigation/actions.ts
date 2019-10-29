import { ActionsUnion } from "../../types";
import { createAction } from "../../utils";

export enum NavigationAction {
  UpdateLocation = "[navigation] Update Location",
}

export const actions = {
  updateLocation: (location: string) =>
    createAction(NavigationAction.UpdateLocation, location),
};

export type Actions = ActionsUnion<typeof actions>;
