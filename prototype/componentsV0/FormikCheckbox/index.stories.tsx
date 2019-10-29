import { storiesOf } from "@storybook/react";
import React from "react";

import { FormikCheckbox } from ".";
import { formik } from "../storybook/StorybookFormikAddon";

const initialValues = {
  someField: false,
};

type Values = typeof initialValues;

storiesOf("Components V0", module)
  .addParameters({ formik: { initialValues } })
  .add("FormikCheckbox", () => {
    const api = formik<Values>();

    return (
      <FormikCheckbox<Values>
        formikApi={api}
        name="someField"
        label="Some Field"
      />
    );
  });
