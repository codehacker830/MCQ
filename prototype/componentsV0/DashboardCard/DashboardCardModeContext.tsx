import React, { Component, createContext } from "react";

export interface DashboardCardModeContextProps {
  /**
   * Children which later can use the DashboardCardModeConsumer component to
   * access the passed api.
   */
  children: Component<any>["props"]["children"];

  /**
   * String keys for use tracking the contents of the data list. When an item is
   * removed or added, the component's internal state will update to reflect.
   */
  itemKeys: string[];

  /**
   * Called when an item is clicked in edit mode.
   */
  onItemEditClick?: (key: string) => any;

  /**
   * Called when the user requests items be deleted.
   */
  onRequestDeleteClick?: (keys: string[]) => any;
}

interface DashboardCardModeContextState {
  mode: "display" | "edit" | "deletion";
  selected: boolean[];
}

export interface DashboardCardModeApi {
  actions: {
    enterEditMode: () => void;
    enterDeletionMode: () => void;
    exitMode: () => void;
    clickItem: (key: string) => void;
    requestDelete: () => void;
    toggleSelectAll: () => void;
    getSelectedCount: () => number;
    getIsIndeterminate: () => boolean;
    getIsAllSelected: () => boolean;
  };
  state: DashboardCardModeContextState;
}

const initialState: DashboardCardModeContextState = {
  mode: "display",
  selected: [],
};

const uninitializedAction = () => {
  throw new Error("Uninitialized action was called.");
};

const context = createContext<DashboardCardModeApi>({
  actions: {
    enterEditMode: uninitializedAction,
    enterDeletionMode: uninitializedAction,
    exitMode: uninitializedAction,
    clickItem: uninitializedAction,
    requestDelete: uninitializedAction,
    toggleSelectAll: uninitializedAction,
    getSelectedCount: uninitializedAction,
    getIsIndeterminate: uninitializedAction,
    getIsAllSelected: uninitializedAction,
  },
  state: initialState,
});

/**
 * Wraps the functionality of the DashboardCard which deals with entering the
 * edit and deletion modes. It tracks the checkbox states for rows.
 */
export class DashboardCardModeProvider extends Component<
  DashboardCardModeContextProps,
  DashboardCardModeContextState
> {
  /**
   * Returns the card to display mode and sets all items to unselected.
   */
  static getResetSelectionStateFromProps(
    props: DashboardCardModeContextProps,
  ): Partial<DashboardCardModeContextState> {
    return {
      mode: "display",
      selected: props.itemKeys.map(() => false),
    };
  }

  /**
   * If the number of items provided to this component changes, recalculate the
   * "selected" state property to prevent range errors.
   */
  static getDerivedStateFromProps(
    nextProps: DashboardCardModeContextProps,
    prevState: DashboardCardModeContextState,
  ): Partial<DashboardCardModeContextState> | null {
    if (nextProps.itemKeys.length !== prevState.selected.length) {
      return DashboardCardModeProvider.getResetSelectionStateFromProps(
        nextProps,
      );
    }

    return null;
  }

  constructor(props: DashboardCardModeContextProps) {
    super(props);

    this.state = {
      ...initialState,
      ...DashboardCardModeProvider.getResetSelectionStateFromProps(props),
    };
  }

  /**
   * If any item key has changed, reset the display state (exit back to display
   * mode) for safety. This relies on getDerivedStateFromProps correctly
   * resizing the "selected" state array.
   */
  componentDidUpdate(prevProps: DashboardCardModeContextProps) {
    for (let i = 0; i < prevProps.itemKeys.length; i += 1) {
      if (prevProps.itemKeys[i] !== this.props.itemKeys[i]) {
        this.handleExitMode();
        return;
      }
    }
  }

  handleEnterEditMode = () => this.setState({ mode: "edit" });

  handleEnterDeletionMode = () => this.setState({ mode: "deletion" });

  handleExitMode = () =>
    this.setState(
      // FIXME: Not sure what's going with this type definition problem.
      // @ts-ignore
      DashboardCardModeProvider.getResetSelectionStateFromProps(this.props),
    );

  handleItemClick = (key: string) => {
    const itemIndex = this.props.itemKeys.indexOf(key);
    if (itemIndex < 0) return;

    if (this.state.mode === "deletion") {
      const { selected } = this.state;

      this.setState({
        selected: [
          ...selected.slice(0, itemIndex),
          !selected[itemIndex],
          ...selected.slice(itemIndex + 1),
        ],
      });
    } else if (this.state.mode === "edit" && this.props.onItemEditClick) {
      this.props.onItemEditClick(key);
    }
  };

  handleRequestDeleteClick = () => {
    if (!this.props.onRequestDeleteClick) return;
    if (this.getSelectedCount() === 0) return;

    const selectedItemKeys = this.props.itemKeys.reduce(
      (acc, key, index) => {
        if (this.state.selected[index]) return acc.concat(key);
        return acc;
      },
      [] as string[],
    );

    if (selectedItemKeys.length === 0) return;
    this.props.onRequestDeleteClick(selectedItemKeys);
  };

  handleSelectAll = () => {
    if (this.state.mode !== "deletion") return;

    this.setState({
      selected: this.props.itemKeys.map(() => !this.getIsAllSelected()),
    });
  };

  getSelectedCount = () =>
    this.state.selected.reduce((acc, val) => (val ? acc + 1 : acc), 0);

  getIsIndeterminate = () => {
    const selectedCount = this.getSelectedCount();
    return selectedCount > 0 && selectedCount < this.state.selected.length;
  };

  getIsAllSelected = () =>
    this.getSelectedCount() === this.props.itemKeys.length;

  render() {
    const { children } = this.props;
    const api: DashboardCardModeApi = {
      actions: {
        enterEditMode: this.handleEnterEditMode,
        enterDeletionMode: this.handleEnterDeletionMode,
        exitMode: this.handleExitMode,
        clickItem: this.handleItemClick,
        requestDelete: this.handleRequestDeleteClick,
        toggleSelectAll: this.handleSelectAll,
        getSelectedCount: this.getSelectedCount,
        getIsIndeterminate: this.getIsIndeterminate,
        getIsAllSelected: this.getIsAllSelected,
      },
      state: this.state,
    };

    return <context.Provider value={api}>{children}</context.Provider>;
  }
}

export const DashboardCardModeConsumer = context.Consumer;
