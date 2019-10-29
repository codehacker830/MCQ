import lodashDebounce from "lodash.debounce";
import React, { Component, SFC } from "react";
import {
  ActionsType,
  ContextValue,
  createStore,
} from "../../common/utils/contextStore";

interface SideSheetToggleStoreState {
  /**
   * Whether the side sheet is open (toggled) on mobile.
   */
  open: boolean;

  /**
   * Whether or not the toggle button is visible in the app bar. Set to true
   * when there is sheet contents.
   */
  toggleButtonVisibility: boolean;

  /**
   * True when the screen width is large enough to accommodate the fixed panel.
   */
  fixedPanelVisible: boolean;
}

interface SideSheetToggleStoreActions
  extends ActionsType<SideSheetToggleStoreState> {
  /**
   * Toggles the open state of the side sheet on mobile. Should be called by way
   * of a button.
   */
  toggleOpen: () => (
    state: SideSheetToggleStoreState,
  ) => Partial<SideSheetToggleStoreState>;

  /**
   * Sets visibility of toggle button. Called with true if there is panel
   * contents.
   */
  setToggleButtonVisibility: (
    visibility: boolean,
  ) => () => Partial<SideSheetToggleStoreState>;

  /**
   * Sets visibility of the side sheet panel.
   */
  setFixedPanelVisibility: (
    visibility: boolean,
  ) => () => Partial<SideSheetToggleStoreState>;
}

const SideSheetToggleStore = createStore<
  SideSheetToggleStoreState,
  SideSheetToggleStoreActions
>(
  {
    open: false,
    toggleButtonVisibility: false,
    fixedPanelVisible: false,
  },
  {
    toggleOpen: () => state => ({ open: !state.open }),

    setToggleButtonVisibility: visibility => () => ({
      toggleButtonVisibility: visibility,
    }),

    setFixedPanelVisibility: visibility => () => ({
      fixedPanelVisible: visibility,
    }),
  },
  "SideSheetToggleStore",
);

class SideSheetToggleStoreResizeListener extends Component<{
  contextValue: ContextValue<
    SideSheetToggleStoreState,
    SideSheetToggleStoreActions
  >;
}> {
  handleResize = lodashDebounce(() => {
    // https://material.io/design/layout/responsive-layout-grid.html#breakpoints
    // Portrait - Large Tablet - Upper Bound
    const { contextValue } = this.props;
    const fixedPanelVisible = window.innerWidth > 839;

    if (contextValue.fixedPanelVisible !== fixedPanelVisible) {
      contextValue.setFixedPanelVisibility(fixedPanelVisible);
    }
  }, 166 /* Corresponds to 10 frames at 60 Hz. */);

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orientationchange", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("orientationchange", this.handleResize);
  }

  render() {
    return this.props.children;
  }
}

export const SideSheetToggleStoreProvider: SFC<{}> = props => (
  <SideSheetToggleStore.Provider>
    <SideSheetToggleStore.Consumer>
      {store => (
        <SideSheetToggleStoreResizeListener contextValue={store}>
          {props.children}
        </SideSheetToggleStoreResizeListener>
      )}
    </SideSheetToggleStore.Consumer>
  </SideSheetToggleStore.Provider>
);

export const SideSheetToggleStoreConsumer = SideSheetToggleStore.Consumer;
