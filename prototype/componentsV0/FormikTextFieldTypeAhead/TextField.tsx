import React, { Component } from "react";

// tslint:disable-next-line:import-name
import MuiTextField from "@material-ui/core/TextField";

import { TypeAheadContextConsumer } from "./TypeAheadContext";

// tslint:disable-next-line:no-empty-interface
export interface TextFieldProps {}

export class TextField extends Component<TextFieldProps> {
  render() {
    return (
      <TypeAheadContextConsumer>
        {api => {
          if (!api) throw new Error("Used outside of context.");

          const { formikApi, downshiftApi, textFieldProps, setInputRef } = api;
          const { name, label, fullWidth = true, ...rest } = textFieldProps;
          const inputProps = downshiftApi.getInputProps();

          return (
            <MuiTextField
              {...rest}
              name={name}
              label={formikApi.errors[name] || label}
              value={formikApi.values[name]}
              fullWidth={fullWidth}
              error={Boolean(formikApi.errors[name])}
              // TODO: Fix type error:
              // @ts-ignore
              InputProps={{
                ...inputProps,
                inputRef: setInputRef,
              }}
            />
          );
        }}
      </TypeAheadContextConsumer>
    );
  }
}
