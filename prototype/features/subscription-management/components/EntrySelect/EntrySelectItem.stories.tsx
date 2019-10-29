import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createEntryPlaceholders } from "../../placeholders/createEntryPlaceholders";

import { EntrySelectItem } from "./EntrySelectItem";

const entry = createEntryPlaceholders()[0];

storiesOf("Subscription Management", module).add(
  "EntrySelectItem",
  withInfo()(() => (
    <div style={{ width: 320, margin: 16 }}>
      <EntrySelectItem
        entry={entry}
        selected={boolean("Selected", false)}
        onClick={action("onClick")}
      />
      <div style={{ marginTop: 8 }} />
      <EntrySelectItem
        entry={entry}
        selected={boolean("Selected", false)}
        onClick={action("onClick")}
      />
    </div>
  )),
);
