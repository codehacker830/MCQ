import { storiesOf } from "@storybook/react";
import React from "react";
import { createCategoryQuantitySelectionSettingsPlaceholder } from "../../placeholders/createCategoryQuantitySelectionSettingsPlaceholder";

import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { CategorySubscription } from "./CategorySubscription";

const categoryQuantitySelectionSettings = createCategoryQuantitySelectionSettingsPlaceholder();

storiesOf("Subscription Management", module)
  .addDecorator(story => (
    <StorybookContentCenterWrapper>{story()}</StorybookContentCenterWrapper>
  ))
  .add("CategorySubscription", () => {
    return (
      <CategorySubscription
        categoryLabel={{ en: "Army GD" }}
        categoryQuantitySelectionSettings={categoryQuantitySelectionSettings}
        selectedQuantityIndex={0}
      />
    );
  });
