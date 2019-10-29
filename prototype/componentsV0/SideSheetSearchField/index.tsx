import React, { ChangeEventHandler, Component, FormEventHandler } from "react";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Search from "@material-ui/icons/Search";

let nextId = 0;

export interface SideSheetSearchFieldProps {
  /**
   * Field label.
   */
  label?: string;

  /**
   * Field placeholder.
   */
  placeholder?: string;

  /**
   * Called when user submits the search request.
   */
  onSubmit?: (query: string) => any;
}

interface SideSheetSearchFieldState {
  value: string;
}

/**
 * Provides a search box for use in the side sheet filtering panel.
 */
export class SideSheetSearchField extends Component<
  SideSheetSearchFieldProps,
  SideSheetSearchFieldState
> {
  state: SideSheetSearchFieldState = { value: "" };
  private id: number;

  constructor(props: SideSheetSearchFieldProps) {
    super(props);

    this.id = nextId;
    nextId += 1;
  }

  handleSubmit: FormEventHandler<any> = event => {
    event.preventDefault();

    const trimmedQuery = this.state.value.trim();
    if (trimmedQuery && this.props.onSubmit) {
      this.props.onSubmit(trimmedQuery);
    }
  };

  handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { label, placeholder } = this.props;
    const { value } = this.state;
    const id = `side-sheet-search-field-${this.id}`;

    return (
      <form action="." onSubmit={this.handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <Input
            id={id}
            type="search"
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={this.handleSubmit}>
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    );
  }
}
