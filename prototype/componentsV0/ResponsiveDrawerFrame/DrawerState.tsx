import React, { Component, createContext } from "react";

export interface DrawerProps {
  /**
   * Provided for testing purposes. Allowing explicitly setting the mobileOpen
   * state.
   */
  mobileOpen?: boolean;
}

interface DrawerState {
  /**
   * Whether or not the drawer is open on mobile.
   */
  mobileOpen: boolean;

  /**
   * Toggles the open state of the app drawer on mobile.
   */
  toggleDrawer: () => void;
}

const defaultState: DrawerState = {
  mobileOpen: false,
  toggleDrawer: () => {
    throw new Error(`"toggleDrawer" was called outside a DrawerStateProvider.`);
  },
};

const DrawerStateContext = createContext<DrawerState>(defaultState);

export class DrawerStateProvider extends Component<DrawerProps, DrawerState> {
  // Provide a mechanism to override the mobileOpen state value from the outside
  // during testing in Storybook.
  static getDerivedStateFromProps(
    nextProps: DrawerProps,
    prevState: DrawerState,
  ) {
    if (nextProps.mobileOpen === undefined) return null;
    if (nextProps.mobileOpen === prevState.mobileOpen) return null;

    /* tslint:disable-next-line:no-console */
    console.log(
      "DrawerStateProvider: overriding mobileOpen:",
      nextProps.mobileOpen,
    );
    return { mobileOpen: nextProps.mobileOpen };
  }

  state = defaultState;

  componentDidMount() {
    if (this.state.toggleDrawer === this.toggleDrawer) return;
    this.setState({ toggleDrawer: this.toggleDrawer });
  }

  toggleDrawer = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    return (
      <DrawerStateContext.Provider value={this.state}>
        {this.props.children}
      </DrawerStateContext.Provider>
    );
  }
}

export const DrawerStateConsumer = DrawerStateContext.Consumer;
