import { Parameters } from "@storybook/react";
import { FormikProps, FormikConfig } from "formik";

declare module "@storybook/react" {
  export interface Parameters {
    formik?: Pick<FormikConfig<any>, "initialValues" | "validate">;
  }
}
