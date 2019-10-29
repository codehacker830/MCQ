import React from "react";

/**
 * Quiz pages (placeholder data).
 */
export const createExamPaneKeyNodeMapPlaceholder = () =>
  Array.from({ length: 15 }, (_, index) => ({
    key: `exam-page-${index}`,
    node: <div>Exam Page {index + 1}</div>,
  }));
