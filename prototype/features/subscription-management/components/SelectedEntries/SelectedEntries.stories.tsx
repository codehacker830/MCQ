import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { createEntryPlaceholders } from "../../placeholders/createEntryPlaceholders";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { SelectedEntries } from "./SelectedEntries";

const stories = storiesOf("Subscription Management", module);
stories.addDecorator(story => (
  <StorybookContentCenterWrapper>{story()}</StorybookContentCenterWrapper>
));

const entries = createEntryPlaceholders();
const minEntriesCount = 1;
const maxEntriesCount = 3;
const selectedEntryIDs = entries.slice(0, 3).map(e => e.id);

stories.add("SelectedEntries", () => {
  const selectedEntryIDsToggle = boolean("Minimum Entries", false)
    ? selectedEntryIDs.slice(0, 1)
    : selectedEntryIDs;

  return (
    <SelectedEntries
      entries={entries}
      minEntriesCount={minEntriesCount}
      maxEntriesCount={maxEntriesCount}
      selectedEntryIDs={selectedEntryIDsToggle}
      onEntryRemoveButtonClick={action("onEntryRemoveButtonClick")}
      onAddMoreButtonClick={action("onAddMoreButtonClick")}
    />
  );
});
