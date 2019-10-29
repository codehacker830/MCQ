import Paper from "@material-ui/core/Paper";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Typography, Variant } from ".";

const variants = Object.values(Variant) as Variant[];

storiesOf("Components V0", module)
  .addParameters({ info: { propTablesExclude: [Paper] } })
  .add("Typography (old)", () => (
    <Paper style={{ maxWidth: 500, padding: 16, marginLeft: 16 }}>
      {variants.map(variant => (
        <div key={variant} style={{ margin: "16px" }}>
          <Typography variant={variant}>
            {variant.charAt(0).toUpperCase()}
            {variant.slice(1)}
          </Typography>
        </div>
      ))}
    </Paper>
  ));
