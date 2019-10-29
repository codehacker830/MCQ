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

export const AdminPlanManager: SFC<{}> = () => {
  const noop = () => {}; // tslint:disable-line

  const dialogFields = {
    planName: "",
    numTests: 5,
    planValidityDays: 5,
  };

  const fieldConfigs: DashboardFormDialogFieldConfigs<typeof dialogFields> = {
    planName: {
      inputLabel: "Plan Name",
      inputType: "text",
      placeholder: "Enter plan name here...",
    },
    numTests: {
      inputLabel: "Number of test papers",
      inputType: "number",
    },
    planValidityDays: {
      inputLabel: "Plan Validity",
      inputType: "number",
      placeholder: "Enter in number of days",
    },
  };

  const appBarActionButtons = [
    <DashboardFormDialog
      title="Create a New Plan"
      fieldConfigs={fieldConfigs}
      initialValues={dialogFields}
      onSubmit={noop}
    >
      <ResponsiveToolbarTypographyButton
        iconNode={<Add />}
        tooltipTitle="Add New Plan"
        color="orange"
      >
        Plan
      </ResponsiveToolbarTypographyButton>
    </DashboardFormDialog>,
  ];

  return (
    <AdminDashboardTemplateContainer actionButtonElements={appBarActionButtons}>
      <Grid container spacing={2}>
        {["Plans"].map(title => (
          <Grid key={title} item xs={12}>
            <DashboardCard
              title={title}
              columnLabels={["Plan", "Availability"]}
              columnTypes={["single-line", "switch"]}
              onItemEditClick={noop}
              onRequestDeleteClick={noop}
              items={[
                {
                  key: "0",
                  columns: [
                    { primaryText: "5 Exam Plan" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Availability",
                    },
                  ],
                },
                {
                  key: "1",
                  columns: [
                    { primaryText: "10 Exam Plan" },
                    {
                      switchChecked: true,
                      switchTooltipTitle: "Toggle Availability",
                    },
                  ],
                },
                {
                  key: "2",
                  columns: [
                    { primaryText: "15 Exam Plan" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Availability",
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
