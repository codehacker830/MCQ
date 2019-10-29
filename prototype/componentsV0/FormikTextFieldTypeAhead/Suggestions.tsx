import React, { Component } from "react";

import { Popover } from "./Popover";
import { Suggestion } from "./Suggestion";
import { TypeAheadContextConsumer } from "./TypeAheadContext";

// tslint:disable-next-line:no-empty-interface
export interface SuggestionsProps {}

export class Suggestions extends Component<SuggestionsProps> {
  render() {
    return (
      <TypeAheadContextConsumer>
        {api => {
          if (!api) throw new Error("Used outside of context.");

          const { suggestions: possibleSuggestions, downshiftApi } = api;
          const { inputValue } = downshiftApi;

          const suggestions = getSuggestions(possibleSuggestions, inputValue);

          return (
            <Popover>
              {suggestions.map((suggestion, index) => (
                <Suggestion
                  key={suggestion}
                  suggestion={suggestion}
                  index={index}
                />
              ))}
            </Popover>
          );
        }}
      </TypeAheadContextConsumer>
    );
  }
}

// ref: https://material-ui-next.com/demos/autocomplete/#downshift
function getSuggestions(suggestions: string[], inputValue: string | null) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue ||
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}
