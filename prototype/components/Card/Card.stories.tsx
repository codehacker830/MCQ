import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import CardContent from "@material-ui/core/CardContent";
import { Typography } from "../Typography";

import { StorybookContentCenterWrapper } from "../../componentsV0/storybook/StorybookContentCenterWrapper";
import { CardActionArea } from "../CardActionArea";
import { Card } from "./Card";

storiesOf("Components", module)
  .addDecorator(story => (
    <StorybookContentCenterWrapper>{story()}</StorybookContentCenterWrapper>
  ))
  .add("Card", () => {
    //

    return (
      <Card hoverable={boolean("Hoverable", false)}>
        <CardActionArea>
          <CardContent>
            <Typography color="textSecondary">Word of the Day</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
