import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { DashboardFormDialog, DashboardFormDialogFieldConfigs } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";
import { TypographyButton } from "../TypographyButton";

storiesOf("Components V0", module).add("DashboardFormDialog", () => {
  const onSubmitValue = action("onSubmit");

  // Simulate delay from submitting by way of an api call.
  const onSubmit = (values: object) =>
    new Promise(resolve =>
      setTimeout(() => {
        /* tslint:disable-next-line:no-console */
        console.log("values", values);
        onSubmitValue(values);
        resolve();
      }, 1000),
    );

  const validate = () => Promise.resolve(true);

  const initialValues = {
    entryType: "AirForce",
    categoryType: "AFCAT",
    normalTextField: "normal text field",
    logo: null as File | null,
  };

  const fields: DashboardFormDialogFieldConfigs<typeof initialValues> = {
    entryType: {
      inputType: "text-autocomplete",
      inputLabel: "Entry Type",
      placeholder: "Enter Entry name here...",
      suggestions: ["AirForce", "Assam Rifles", "Coast Guard", "ITBP"],
    },
    categoryType: {
      inputType: "text-autocomplete",
      inputLabel: "Category Type",
      placeholder: "Enter category name here...",
      suggestions: ["AFCAT", "NDA", "Paramilitary"],
    },
    normalTextField: {
      inputType: "text",
      inputLabel: "Just a normal text field (no autocomplete)",
      placeholder: "Just text...",
    },
    logo: {
      inputType: "file-upload",
      inputLabel: "Upload Logo",
      placeholder: "Select logo path here...",
      acceptedFileTypes: "image/*",
    },
  };

  return (
    <ContentCenterWrapper style={{ padding: 16 }}>
      <DashboardFormDialog
        title="Create a New Entry"
        initialValues={initialValues}
        fieldConfigs={fields}
        validate={validate}
        onSubmit={onSubmit}
      >
        <TypographyButton>Open Modal</TypographyButton>
      </DashboardFormDialog>
    </ContentCenterWrapper>
  );
});
