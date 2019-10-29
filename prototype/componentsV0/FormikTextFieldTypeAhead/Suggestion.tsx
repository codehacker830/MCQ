import React, { Component } from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { TypeAheadContextConsumer } from "./TypeAheadContext";

export interface SuggestionProps {
  suggestion: string;

  index: number;
}

export class Suggestion extends Component<SuggestionProps> {
  render() {
    return (
      <TypeAheadContextConsumer>
        {api => {
          if (!api) throw new Error("Used outside of context.");

          const { downshiftApi } = api;
          const { getItemProps, selectedItem, highlightedIndex } = downshiftApi;
          const { suggestion, index } = this.props;

          const itemProps = getItemProps({ item: suggestion });
          const isHighlighted = highlightedIndex === index;
          const isSelected =
            ((selectedItem as string | null) || "").indexOf(suggestion) > -1;

          return (
            <MenuItem
              selected={isHighlighted}
              component="div"
              styled={{ fontWeight: isSelected ? 500 : 400 }}
              {...itemProps}
            >
              {suggestion}
            </MenuItem>
          );
        }}
      </TypeAheadContextConsumer>
    );
  }
}
