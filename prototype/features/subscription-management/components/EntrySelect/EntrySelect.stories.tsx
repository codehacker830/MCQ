import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createEntryPlaceholders } from "../../placeholders/createEntryPlaceholders";

import { ContentCenterWrapper } from "../../../../componentsV0/ContentCenterWrapper";
import { EntrySelect } from "./EntrySelect";

const entries = createEntryPlaceholders();

storiesOf("Subscription Management", module)
  .addParameters({ info: { propTablesExclude: [ContentCenterWrapper as any] } })
  .add("EntrySelect", () => (
    <ContentCenterWrapper>
      <EntrySelect
        entries={entries}
        minSelectedCount={1}
        maxSelectedCount={3}
        onSelectionChange={action("onSelectionChange")}
      />
    </ContentCenterWrapper>
  ));
