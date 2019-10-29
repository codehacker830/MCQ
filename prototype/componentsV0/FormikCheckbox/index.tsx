import { FormikProps } from "formik";
import React, { Component } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export interface FormikCheckboxProps<Values extends object> {
  /**
   * Form field name.
   */
  name: Extract<keyof Values, string>;

  /**
   * Label text to be displayed to the right of the checkbox.
   */
  label: string;

  /**
   * The Formik api provided by Formik's render function.
   */
  formikApi: FormikProps<Values>;
}

/**
 * Wraps a Material UI Checkbox control with a label and connects it to a Formik
 * form.
 */
export class FormikCheckbox<Values extends object> extends Component<
  FormikCheckboxProps<Values>
> {
  render() {
    const { formikApi: api, label, name } = this.props;

    return (
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={Boolean(api.values[name])}
            onChange={api.handleChange}
            color="primary"
          />
        }
        label={label}
      />
    );
  }
}
