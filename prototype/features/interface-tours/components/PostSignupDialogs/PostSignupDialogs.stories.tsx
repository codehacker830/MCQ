import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from "../../../../componentsV0/Button";
import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { formik } from "../../../../componentsV0/storybook/StorybookFormikAddon";
import { PostSignupDialogs } from "./PostSignupDialogs";

const initialValues = { showDialogs: false, key: 0 };
type Values = typeof initialValues;

storiesOf("Interface Tours", module)
  .addParameters({ formik: { initialValues } })
  .addDecorator(story => (
    <StorybookContentCenterWrapper>{story()}</StorybookContentCenterWrapper>
  ))
  .add("PostSignupDialogs", () => {
    const formikBag = formik<Values>();

    return (
      <div>
        <Button onClick={() => formikBag.setFieldValue("showDialogs", true)}>
          Show Dialogs
        </Button>

        {formikBag.values.showDialogs && (
          <PostSignupDialogs
            onSubmit={() => {
              formikBag.setFieldValue("key", formikBag.values.key + 1);
              formikBag.setFieldValue("showDialogs", false);
            }}
          />
        )}
      </div>
    );
  });
