import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import { DashboardCard } from "../../componentsV0/DashboardCard";
import { SideSheetButtonMenu } from "../../componentsV0/SideSheetButtonMenu";
import { SideSheetFieldGroup } from "../../componentsV0/SideSheetFieldGroup";

import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

export class AdminQuestionManagerReportedQuestions extends Component {
  render() {
    return (
      <AdminDashboardTemplateContainer
        sideSheetContents={
          <SideSheetFieldGroup fieldGroupTitle="Questions">
            <SideSheetButtonMenu
              options={[
                "All Questions",
                "Reported Questions",
                "Reported Answers",
              ]}
            />
          </SideSheetFieldGroup>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DashboardCard
              title="Reported Questions"
              columnLabels={[
                "Question",
                "Incorrect Answer",
                "Incorrect Question",
              ]}
              columnTypes={["dual-line", "single-line", "single-line"]}
              items={Array.from({ length: 20 }, (_item, index) => ({
                key: index.toString(),
                columns: [
                  {
                    primaryText: `${index + 1}. Question Label...`,
                    secondaryText: "Date uploaded...",
                  },
                  {
                    primaryText: "2",
                  },
                  {
                    primaryText: "3",
                  },
                ],
              }))}
            />
          </Grid>
        </Grid>
      </AdminDashboardTemplateContainer>
    );
  }
}
