import { storiesOf } from "@storybook/react";
import React from "react";

import { StorybookContentCenterWrapper } from "../../componentsV0/storybook/StorybookContentCenterWrapper";
import { Card } from "../Card";
import { Typography } from "../Typography";
import {
  CardDualColumnsTextContent,
  CardDualColumnsTextContentRow,
} from "./CardDualColumnsTextContent";

storiesOf("Components", module).add("CardDualColumnsTextContent", () => {
  const rows: CardDualColumnsTextContentRow[] = [
    {
      id: "1",
      leftNode: "Soldier Tradesman (Army)",
      rightNode: "123/999 (92% from 5 papers)",
    },
    {
      id: "2",
      leftNode:
        "Group 'X' Trades (Technical except Education Instructor) (Airforce)",
      rightNode: "123/999 (92% from 8 papers)",
    },
  ].map(
    (row): CardDualColumnsTextContentRow => ({
      ...row,
      leftNode: <Typography>{row.leftNode}</Typography>,
      rightNode: <Typography>{row.rightNode}</Typography>,
    }),
  );

  return (
    <StorybookContentCenterWrapper>
      <Card>
        <CardDualColumnsTextContent rows={rows} />
      </Card>
    </StorybookContentCenterWrapper>
  );
});
