import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import TextField from "@material-ui/core/TextField";

import { DashboardCard } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";
import { TypographyButton } from "../TypographyButton";
import { DashboardCardColumnType } from "./DashboardCardColumnType";
import { DashboardCardItem } from "./DashboardCardItem";
import { DashboardCardPaginationProps } from "./DashboardCardPagination";

storiesOf("Components V0", module)
  .addParameters({ info: { propTablesExclude: [ContentCenterWrapper] } })
  .add("DashboardCard", () => {
    const items: DashboardCardItem[] = [
      {
        key: "0",
        columns: [
          { primaryText: "Soldier GD", secondaryText: "10th" },
          { imgUrl: `${process.env.PUBLIC_URL}/images/entry/airforce.svg` },
          { primaryText: "Rs 10 pp" },
          { switchChecked: false },
        ],
      },
      {
        key: "1",
        columns: [
          { primaryText: "Soldier Tradesman", secondaryText: "10th" },
          { imgUrl: `${process.env.PUBLIC_URL}/images/entry/army.svg` },
          { primaryText: "Rs 10 pp" },
          { switchChecked: true },
        ],
      },
      {
        key: "2",
        columns: [
          {
            primaryText: "Soldier Tradesman 8th Grade",
            secondaryText: "8th",
          },
          {
            imgUrl: `${process.env.PUBLIC_URL}/images/entry/assamrifles.svg`,
          },
          { primaryText: "Rs 10 pp" },
          { switchChecked: true },
        ],
      },
      {
        key: "3",
        columns: [
          { primaryText: "Soldier GD", secondaryText: "12th" },
          { imgUrl: `${process.env.PUBLIC_URL}/images/entry/bsf.svg` },
          { primaryText: "Rs 10 pp" },
          { switchChecked: false },
        ],
      },
    ];

    const columnLabels = ["Category", "", "Cost Per Paper", ""];
    const columnTypes: DashboardCardColumnType[] = [
      "dual-line",
      "image",
      "single-line",
      "switch",
    ];

    const paginationProps: DashboardCardPaginationProps = {
      count: 60,
      onChangePage: action("onChangePage"),
      page: 0,
      rowsPerPage: 30,
    };

    return (
      <ContentCenterWrapper>
        <DashboardCard
          items={items}
          title="Army Entry"
          titleSiblingNode={
            <TypographyButton>Some Sibling Component</TypographyButton>
          }
          editCaptionText="Click to Edit Entry"
          columnLabels={columnLabels}
          columnTypes={columnTypes}
          onItemEditClick={action("onItemEditClick")}
          onRequestDeleteClick={action("onRequestDeleteClick")}
          paginationProps={paginationProps}
          paginationListItemType="entries"
          additionalActionNode={
            <TextField
              name="textField"
              label="A Custom Action Node"
              placeholder="Custom action node's contents..."
            />
          }
        />
      </ContentCenterWrapper>
    );
  });
