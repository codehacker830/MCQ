import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { FilterButton } from ".";
import { createPlaceholderFilterButtonProps } from "./createPlaceholderFilterButtonProps";

storiesOf("Components V0", module).add("FilterButton", () => {
  const props = createPlaceholderFilterButtonProps();

  return <FilterButton {...props} onChange={action("onChange")} />;
});
