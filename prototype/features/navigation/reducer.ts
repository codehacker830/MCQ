import { createReducer } from "../../utils";
import { Actions, NavigationAction } from "./actions";
import { getPageTitleFromLocation } from "./getPageTitleFromLocation";

export type State = {
  locationPathname: string;
  locationPageTitle: string;
  locationPageTitleWithoutProductName: string;
};

const initialState: State = {
  locationPathname: "/",
  locationPageTitle: getPageTitleFromLocation("/"),
  locationPageTitleWithoutProductName: getPageTitleFromLocation("/", {
    withoutProductName: true,
  }),
};

export const reducer = createReducer<State, Actions, NavigationAction>(
  initialState,
  {
    [NavigationAction.UpdateLocation]: (state, action) => {
      const { payload: locationPathname } = action;

      return {
        ...state,
        locationPathname,
        locationPageTitle: getPageTitleFromLocation(locationPathname),
        locationPageTitleWithoutProductName: getPageTitleFromLocation(
          locationPathname,
          { withoutProductName: true },
        ),
      };
    },
  },
);
