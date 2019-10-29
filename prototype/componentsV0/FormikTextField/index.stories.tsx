import { storiesOf } from "@storybook/react";
import React from "react";

import { FormikTextField } from ".";
import { formik } from "../storybook/StorybookFormikAddon";

const initialValues = {
  someField: "",
};

type Values = typeof initialValues;

storiesOf("Components V0", module)
  .addParameters({
    formik: {
      initialValues,
      // TODO: Fix type:
      // @ts-ignore
      validate: values => {
        const errors: Partial<Record<keyof Values, string>> = {};
        if (values.someField.length > 5) errors.someField = "Too long!";
        return errors;
      },
    },
  })
  .add("FormikTextField", () => {
    const api = formik<Values>();

    return (
      <FormikTextField
        name="someField"
        label="Some Field"
        placeholder="A test field..."
        formikApi={api}
      />
    );
  });
