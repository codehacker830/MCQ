import React, { Component, ReactNode } from "react";
import {
  DashboardAppBarIconStore,
  DashboardAppBarIconStoreState,
} from "../../stores";

/**
 * Adds the supplied node to the dashboard app bar. This is used to add buttons
 * to the dashboard app bar. They are removed when the component unmounts.
 */
export class DashboardAppBarIconGroup extends Component<{
  /**
   * The node to add to the app bar.
   */
  children: ReactNode;

  /**
   * A unique key identifying this node in the app bar.
   *
   * This is used to keep track of nodes when this component unmounts.
   */
  iconGroupKey: string;
}> {
  private store: DashboardAppBarIconStoreState | null = null;

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { children, iconGroupKey } = this.props;

    if (this.store) this.store.addIconGroup(iconGroupKey, children);
  }

  componentWillUnmount() {
    if (!this.store) return;
    this.store.removeIconGroup(this.props.iconGroupKey);
    this.store = null;
  }

  render() {
    return (
      <DashboardAppBarIconStore.Consumer>
        {store => this.grabStoreReference(store)}
      </DashboardAppBarIconStore.Consumer>
    );
  }

  private grabStoreReference = (store: DashboardAppBarIconStoreState): null => {
    this.store = store;
    return null;
  };
}
