import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../storybook/StorybookContentCenterWrapper";
import { formik } from "../storybook/StorybookFormikAddon";
import { FormikTextFieldTypeAhead } from "./FormikTextFieldTypeAhead";

const initialValues = {
  entryType: "",
};

type Values = typeof initialValues;

storiesOf("Components V0", module)
  .addParameters({ formik: { initialValues } })
  .add("FormikTextFieldTypeAhead", () => {
    const api = formik<Values>();

    return (
      <StorybookContentCenterWrapper>
        <FormikTextFieldTypeAhead
          formikApi={api}
          name="entryType"
          label="Entry Type"
          placeholder="Enter entry type here..."
          suggestions={["AFCAT", "NDA", "Paramilitary"]}
        />
      </StorybookContentCenterWrapper>
    );
  });
