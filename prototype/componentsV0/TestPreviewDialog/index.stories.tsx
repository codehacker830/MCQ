import { storiesOf } from "@storybook/react";
import React from "react";

import { TestPreviewDialog } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";
import { TypographyButton } from "../TypographyButton";
import { createPlaceholderTestPreviewFieldsProp } from "./createPlaceholderTestPreviewFieldsProp";

storiesOf("Components V0", module)
  .addParameters({
    info: { propTablesExclude: [ContentCenterWrapper, TypographyButton] },
  })
  .add("TestPreviewDialog", () => {
    const fields = createPlaceholderTestPreviewFieldsProp();

    return (
      <ContentCenterWrapper>
        <TestPreviewDialog fields={fields}>
          <TypographyButton>Open Dialog</TypographyButton>
        </TestPreviewDialog>
      </ContentCenterWrapper>
    );
  });
