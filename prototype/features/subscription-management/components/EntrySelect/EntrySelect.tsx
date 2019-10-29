import React, { Component } from "react";
import styled from "styled-components";
import { IEntry } from "../../../../models";

import { fromGutters } from "../../../../css";
import { EntrySelectItem } from "./EntrySelectItem";

export type EntrySelectProps = {
  /**
   * Item icons, labels, and optional education requirements.
   * Icon key will be used in the callback as part of the results list.
   */
  entries: IEntry[];

  initialSelectedEntries?: string[];

  /**
   * Minimum number of selection required. Handler will be called with a boolean
   * indicated whether this requirement has been meet.
   */
  minSelectedCount: number;

  /**
   * Maximum number of items which can be selected at once.
   */
  maxSelectedCount: number;

  /**
   * Called with the entry IDs of the selected items.
   */
  onSelectionChange: (selectedItemIDs: string[]) => void;
};

export type EntrySelectState = {
  selectedItemIDs: string[];
};

/**
 * Entry select provides a list of military services which can be selected. It
 * supports selecting more than one item and requiring a minimum number of
 * selections.
 */
export class EntrySelect extends Component<EntrySelectProps, EntrySelectState> {
  state: EntrySelectState = {
    selectedItemIDs: this.props.initialSelectedEntries || [],
  };

  handleItemClick = (entryID: string) => {
    let selectedItemIDs = [...this.state.selectedItemIDs];
    const { maxSelectedCount, onSelectionChange } = this.props;

    // Don't select item if we are at the maximum number of selections.
    const isSelected = selectedItemIDs.find(i => i === entryID) !== undefined;
    let totalSelected = selectedItemIDs.length;
    if (!isSelected && totalSelected === maxSelectedCount) return;

    // Update selections.
    selectedItemIDs = isSelected
      ? selectedItemIDs.filter(i => i !== entryID)
      : selectedItemIDs.concat(entryID);
    this.setState({ selectedItemIDs });

    // Call the handler with the new selection list and whether or not the
    // minimum number of selections are selected.
    totalSelected += isSelected ? -1 : 1;
    onSelectionChange(selectedItemIDs);
  };

  render() {
    const { entries } = this.props;
    const { selectedItemIDs } = this.state;

    const selectItems = entries.map(entry => {
      const isSelected =
        selectedItemIDs.find(i => i === entry.id) !== undefined;

      return (
        <EntrySelectItemWrapper key={entry.id}>
          <EntrySelectItem
            entry={entry}
            selected={isSelected}
            onClick={() => this.handleItemClick(entry.id)}
          />
        </EntrySelectItemWrapper>
      );
    });

    return <Wrapper>{selectItems}</Wrapper>;
  }
}

// Exported as default only because it seems to be needed for docgen information
// to be properly generated for Storybook.
export default EntrySelect;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EntrySelectItemWrapper = styled.div`
  ${fromGutters(["margin-bottom"])};
  width: 100%;
`;
