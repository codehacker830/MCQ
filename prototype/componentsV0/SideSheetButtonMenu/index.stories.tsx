import { action } from "@storybook/addon-actions";
import { array } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { SideSheetButtonMenu } from ".";

storiesOf("Components V0", module).add("SideSheetButtonMenu", () => {
  //

  return (
    <div style={{ width: 300, margin: "0 auto", backgroundColor: "#fff" }}>
      <SideSheetButtonMenu
        options={array("Options", [
          "Single Choice",
          "Multiple Choice",
          "Subjective",
        ])}
        value="Single Choice"
        onChange={action("onChange")}
      />
    </div>
  );
});
