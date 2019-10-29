import { storiesOf } from "@storybook/react";
import React from "react";
import { TypographyL10 } from ".";

storiesOf("Components V0", module).add("TypographyL10", () => {
  //

  return (
    <TypographyL10
      replaceValues={["Some field"]}
      localizationKey="components_AuthenticationForm_FieldIsRequired"
    />
  );
});
