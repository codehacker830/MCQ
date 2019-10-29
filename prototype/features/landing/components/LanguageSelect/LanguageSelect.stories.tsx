import { storiesOf } from "@storybook/react";
import React from "react";

import { SplitThemesPreviewer } from "../../../../componentsV0/SplitThemesPreviewer/index";
import { LanguageSelect } from "./LanguageSelect";

storiesOf("Landing", module).add(
  "LanguageSelect",

  () => (
    <SplitThemesPreviewer>
      <LanguageSelect />
    </SplitThemesPreviewer>
  ),
);
