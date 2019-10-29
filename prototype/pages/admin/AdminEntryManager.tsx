import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";

import { DashboardCard } from "../../componentsV0/DashboardCard";
import {
  DashboardFormDialog,
  DashboardFormDialogFieldConfigs,
} from "../../componentsV0/DashboardFormDialog";
import { ResponsiveToolbarTypographyButton } from "../../componentsV0/ResponsiveToolbarTypographyButton";

import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

export const AdminEntryManager: SFC<{}> = () => {
  const noop = () => {}; // tslint:disable-line

  const dialogFields = {
    entryType: "Army",
    entryExplanation: "",
    categoryType: "",
    categoryEducation: "",
    pricePerPaper: 10,
    logo: null as File | null,
  };

  const fieldConfigs: DashboardFormDialogFieldConfigs<typeof dialogFields> = {
    entryType: {
      inputLabel: "Entry Type",
      inputType: "text-autocomplete",
      placeholder: "Enter Entry name here...",
      suggestions: ["AirForce", "Army", "Navy"],
    },
    entryExplanation: {
      inputLabel: "Entry Explanation",
      inputType: "text",
      placeholder: "Enter Entry Explanation here...",
    },
    categoryType: {
      inputLabel: "Category Type",
      inputType: "text-autocomplete",
      placeholder: "Enter category name here...",
      suggestions: ["Soldier GD", "Soldier Tradesman", "Soldier GD"],
    },
    categoryEducation: {
      inputLabel: "Category Education",
      inputType: "text-autocomplete",
      placeholder: "Education requirement for the category",
      suggestions: ["8th", "10th", "12th"],
    },
    pricePerPaper: {
      inputLabel: "Price per paper",
      inputType: "text",
      placeholder: "Enter price",
    },
    logo: {
      inputLabel: "Upload Logo",
      inputType: "file-upload",
      placeholder: "Select logo path here...",
      acceptedFileTypes: "image/*",
    },
  };

  const appBarActionButtons = [
    <DashboardFormDialog
      title="Create a New Entry"
      fieldConfigs={fieldConfigs}
      initialValues={dialogFields}
      onSubmit={noop}
    >
      <ResponsiveToolbarTypographyButton
        iconNode={<Add />}
        tooltipTitle="Add New Entry"
        color="orange"
      >
        Entry
      </ResponsiveToolbarTypographyButton>
    </DashboardFormDialog>,
  ];

  return (
    <AdminDashboardTemplateContainer actionButtonElements={appBarActionButtons}>
      <Grid container spacing={2}>
        {["AirForce", "Army", "Navy"].map(title => (
          <Grid key={title} item xs={12}>
            <DashboardCard
              title={`${title} Entry`}
              columnLabels={[
                "Category",
                "Icons",
                "Cost Per Paper (Rs)",
                "Activated",
              ]}
              columnTypes={["dual-line", "image", "single-line", "switch"]}
              editCaptionText="Click to Edit Entry"
              onItemEditClick={_item => {
                // alert(`Open edit dialog for item: ${item}`);
              }}
              onRequestDeleteClick={_items => {
                // alert(`Open verification dialog for items: ${items}`)
              }}
              items={[
                {
                  key: "0",
                  columns: [
                    { primaryText: "Soldier GD", secondaryText: "10th" },
                    {
                      imgUrl: `${process.env.PUBLIC_URL}/images/entry/airforce.svg`,
                    },
                    { primaryText: "10" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Activation",
                    },
                  ],
                },
                {
                  key: "1",
                  columns: [
                    { primaryText: "Soldier Tradesman", secondaryText: "10th" },
                    {
                      imgUrl: `${process.env.PUBLIC_URL}/images/entry/army.svg`,
                    },
                    { primaryText: "10" },
                    {
                      switchChecked: true,
                      switchTooltipTitle: "Toggle Activation",
                    },
                  ],
                },
                {
                  key: "2",
                  columns: [
                    {
                      primaryText: "Soldier Tradesman",
                      secondaryText: "8th",
                    },
                    {
                      imgUrl: `${process.env.PUBLIC_URL}/images/entry/assamrifles.svg`,
                    },
                    { primaryText: "10" },
                    {
                      switchChecked: true,
                      switchTooltipTitle: "Toggle Activation",
                    },
                  ],
                },
                {
                  key: "3",
                  columns: [
                    { primaryText: "Soldier GD", secondaryText: "12th" },
                    {
                      imgUrl: `${process.env.PUBLIC_URL}/images/entry/bsf.svg`,
                    },
                    { primaryText: "10" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Activation",
                    },
                  ],
                },
              ]}
            />
          </Grid>
        ))}
      </Grid>
    </AdminDashboardTemplateContainer>
  );
};
