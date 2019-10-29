import { button } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React, { createRef } from "react";

import { ExamQuestionReportModal } from "./ExamQuestionReportModal";

const stories = storiesOf("Exam Taking", module);
const modal = createRef<ExamQuestionReportModal>();

stories.add("ExamQuestionReportModal", () => {
  button("Open Modal", () => {
    if (modal.current) modal.current.openModal();
  });

  return <ExamQuestionReportModal ref={modal} />;
});
