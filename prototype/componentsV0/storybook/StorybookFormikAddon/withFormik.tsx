import addons, { makeDecorator } from "@storybook/addons";
import { Parameters } from "@storybook/react";
import { Formik, FormikProps } from "formik";
import React, { Component, ReactNode } from "react";

// tslint:disable-next-line:no-empty
const noop = () => {};

let formikProps: FormikProps<any> | null = null;

type FormikInstanceProps = Parameters["formik"] & {
  children: (values: object) => ReactNode;
};

class FormikInstance extends Component<FormikInstanceProps> {
  componentWillUnmount() {
    formikProps = null;
  }

  render() {
    const { children, initialValues, validate } = this.props;

    return (
      <Formik<typeof initialValues>
        initialValues={initialValues}
        onSubmit={noop}
        validate={validate}
      >
        {nextFormikProps => {
          formikProps = nextFormikProps;

          return children(nextFormikProps.values);
        }}
      </Formik>
    );
  }
}

// TODO: Fix type:
// @ts-ignore
export const withFormik = makeDecorator<{}, NonNullable<Parameters["formik"]>>({
  name: "withFormik",
  parameterName: "formik",
  skipIfNoParametersOrOptions: true,
  // TODO: Fix type:
  // @ts-ignore
  wrapper: (storyFn, context, options) => {
    const { initialValues, validate } = options.parameters;

    return (
      <FormikInstance initialValues={initialValues} validate={validate}>
        {(values: object) => {
          const channel = addons.getChannel();
          channel.emit("FORMIK/update_state", values);

          return storyFn(context);
        }}
      </FormikInstance>
    );
  },
});

export const formik = <Values extends any>() => {
  if (!formikProps) {
    throw new Error(
      "Formik instance not initialized, make sure to provide formik parameter to Storybook.",
    );
  }

  return formikProps as FormikProps<Values>;
};
