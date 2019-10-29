import { storiesOf } from "@storybook/react";
import React from "react";

import { createCategoryQuantitySelectionSettingsPlaceholder } from "../../placeholders/createCategoryQuantitySelectionSettingsPlaceholder";
import { createEntryCategoryPlaceholders } from "../../placeholders/createEntryCategoryPlaceholders";

import CardContent from "@material-ui/core/CardContent";
import { Card } from "../../../../components/Card";
import { StorybookContentCenterWrapper } from "../../../../componentsV0/storybook/StorybookContentCenterWrapper";
import { formik } from "../../../../componentsV0/storybook/StorybookFormikAddon";
import { CategoryQuantitySelector } from "./CategoryQuantitySelector";

const categoryQuantitySelectionSettings = createCategoryQuantitySelectionSettingsPlaceholder();
const category = createEntryCategoryPlaceholders()[1];

const stories = storiesOf("Subscription Management", module);

const initialValues = {
  selectedQuantityIndex: null as number | null,
};

stories.addParameters({ formik: { initialValues } });

stories.addDecorator(story => (
  <StorybookContentCenterWrapper>
    <Card>
      <CardContent>{story()}</CardContent>
    </Card>
  </StorybookContentCenterWrapper>
));

stories.add("CategoryQuantitySelector", () => {
  const store = formik<typeof initialValues>();

  return (
    <CategoryQuantitySelector
      categoryQuantitySelectionSettings={categoryQuantitySelectionSettings}
      categoryLabel={category.title}
      selectedQuantityIndex={store.values.selectedQuantityIndex}
      onChange={quantityIndex =>
        store.setFieldValue("selectedQuantityIndex", quantityIndex)
      }
    />
  );
});
