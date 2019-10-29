import { FormikProps } from "formik";
import React, { Component } from "react";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export interface FormikTextFieldProps<Values extends object>
  extends Pick<
    TextFieldProps,
    | "autoFocus"
    | "label"
    | "placeholder"
    | "fullWidth"
    | "margin"
    | "type"
    | "disabled"
  > {
  name: Extract<keyof Values, string>;

  rawValue?: any;

  formikApi: FormikProps<Values>;
}

export class FormikTextField<Values extends object> extends Component<
  FormikTextFieldProps<Values>
> {
  render() {
    const {
      formikApi: api,
      name,
      label,
      fullWidth = true,
      rawValue,
      ...rest
    } = this.props;

    const value =
      rawValue === undefined
        ? (api.values as { [P: string]: string })[name]
        : rawValue;

    return (
      <TextField
        {...rest}
        name={name}
        label={api.errors[name] || label}
        value={value}
        fullWidth={fullWidth}
        error={Boolean(api.errors[name])}
        onChange={api.handleChange}
        onBlur={api.handleBlur}
      />
    );
  }
}
