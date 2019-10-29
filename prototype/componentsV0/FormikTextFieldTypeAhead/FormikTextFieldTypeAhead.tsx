import React, { Component } from "react";

import { Suggestions } from "./Suggestions";
import { TextField } from "./TextField";
import {
  TypeAheadContextProvider,
  TypeAheadContextProviderProps,
} from "./TypeAheadContext";

export type FormikTextFieldTypeAheadProps<
  Values extends object
> = TypeAheadContextProviderProps<Values>;

export class FormikTextFieldTypeAhead<Values extends object> extends Component<
  FormikTextFieldTypeAheadProps<Values>
> {
  render() {
    return (
      <TypeAheadContextProvider {...this.props}>
        <TextField />
        <Suggestions />
      </TypeAheadContextProvider>
    );
  }
}
