import { ReactNode } from "react";
import { createStore } from "../common/utils";

interface IconGroup {
  iconGroupKey: string;
  iconGroupNode: ReactNode;
}

const initialState = {
  iconGroups: [] as IconGroup[],
};

const actions = {
  addIconGroup: (iconGroupKey: string, iconGroupNode: ReactNode) => (
    state: State,
  ) => {
    if (state.iconGroups.find(i => i.iconGroupKey === iconGroupKey)) return {};

    return {
      iconGroups: [{ iconGroupKey, iconGroupNode }, ...state.iconGroups],
    };
  },

  removeIconGroup: (iconGroupKey: string) => (state: State) => {
    if (!state.iconGroups.find(i => i.iconGroupKey === iconGroupKey)) return {};

    return {
      iconGroups: state.iconGroups.filter(
        i => i.iconGroupNode !== iconGroupKey,
      ),
    };
  },
};

type State = typeof initialState;
type Actions = typeof actions;
export type DashboardAppBarIconStoreState = State & Actions;

export const DashboardAppBarIconStore = createStore(
  initialState,
  actions,
  "DashboardAppBarIconStore",
);
