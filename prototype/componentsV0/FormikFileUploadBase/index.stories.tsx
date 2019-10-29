import { storiesOf } from "@storybook/react";
import React from "react";

import { FormikFileUploadBase } from ".";
import { formik } from "../storybook/StorybookFormikAddon";

const initialValues = {
  someFile: null as File | null,
};

type Values = typeof initialValues;

storiesOf("Components V0", module)
  .addParameters({ formik: { initialValues } })
  .add("FormikFileUploadBase", () => {
    const api = formik<Values>();

    return (
      <FormikFileUploadBase<Values>
        formikApi={api}
        name="someFile"
        acceptedFileTypes="image/*"
      >
        {fileUploadApi => (
          <button onMouseDown={fileUploadApi.onMouseDown}>Upload File</button>
        )}
      </FormikFileUploadBase>
    );
  });
