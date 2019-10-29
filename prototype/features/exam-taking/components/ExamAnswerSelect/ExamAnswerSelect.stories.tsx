import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { formik } from "../../../../componentsV0/storybook/StorybookFormikAddon";
import { TypographyButton } from "../../../../componentsV0/TypographyButton";
import { ExamAnswerSelect } from "./ExamAnswerSelect";

const initialValues = { selectedAnswerIndex: null as number | null };
type Values = typeof initialValues;

const stories = storiesOf("Exam Taking", module);

stories.addParameters({ formik: { initialValues } });

stories.add("ExamAnswerSelect", () => {
  const answerLabels = ["Lat", "Vimana", "Gopura", "Shikhara"];

  const formikBag = formik<Values>();
  const selectedAnswerIndex = formikBag.values.selectedAnswerIndex;
  const onChangeAnswerIndex = (answerIndex: number | null) =>
    formikBag.setFieldValue("selectedAnswerIndex", answerIndex);

  const areClickable = boolean("Are Clickable", true);

  return (
    <StorybookContentCenterWrapper maxWidthPercent={50}>
      <ExamAnswerSelect
        answerLabels={answerLabels}
        selectedAnswerIndex={selectedAnswerIndex}
        correctAnswerIndex={0}
        onChangeAnswerIndex={onChangeAnswerIndex}
        areClickable={areClickable}
      />

      <TypographyButton
        style={{ marginTop: 16 }}
        onClick={() => onChangeAnswerIndex(null)}
      >
        Clear
      </TypographyButton>
    </StorybookContentCenterWrapper>
  );
});
