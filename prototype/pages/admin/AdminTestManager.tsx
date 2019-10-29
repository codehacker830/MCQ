import React, { cloneElement, ReactElement, SFC } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";

import {
  DashboardCard,
  DashboardCardItemColumn,
} from "../../componentsV0/DashboardCard";
import { TestPreviewDialog } from "../../componentsV0/TestPreviewDialog";
import { createPlaceholderTestPreviewFieldsProp } from "../../componentsV0/TestPreviewDialog/createPlaceholderTestPreviewFieldsProp";

import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

export const AdminTestManager: SFC<{}> = () => {
  const testPreviewDialogFields = createPlaceholderTestPreviewFieldsProp();

  return (
    <AdminDashboardTemplateContainer>
      <Grid container spacing={2}>
        {["AirForce", "Army", "Navy"].map(title => (
          <Grid key={title} item xs={12}>
            <DashboardCard
              title={`${title} Entry`}
              columnLabels={["Category", "Availability", "Actions"]}
              columnTypes={["dual-line", "switch", "button"]}
              onItemEditClick={item =>
                alert(`Open edit page for item: ${item}`)
              }
              items={[
                {
                  key: "0",
                  columns: [
                    { primaryText: "Soldier GD", secondaryText: "10th" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Test Availability",
                    },
                    {
                      primaryText: "Template",
                      buttonIconNode: <Add />,
                      buttonTooltipTitle: "Add New Template",
                    },
                  ],
                },
                {
                  key: "1",
                  columns: [
                    { primaryText: "Soldier Tradesman", secondaryText: "10th" },
                    {
                      switchChecked: true,
                      switchTooltipTitle: "Toggle Test Availability",
                    },
                    {
                      primaryText: "View",
                      buttonIconNode: <RemoveRedEye />,
                      buttonTooltipTitle: "Preview Template",
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
                      switchChecked: true,
                      switchTooltipTitle: "Toggle Test Availability",
                    },
                    {
                      primaryText: "View",
                      buttonIconNode: <RemoveRedEye />,
                      buttonTooltipTitle: "Preview Template",
                    },
                  ],
                },
                {
                  key: "3",
                  columns: [
                    { primaryText: "Soldier GD", secondaryText: "12th" },
                    {
                      switchChecked: false,
                      switchTooltipTitle: "Toggle Test Availability",
                    },
                    {
                      primaryText: "View",
                      buttonIconNode: <RemoveRedEye />,
                      buttonTooltipTitle: "Preview Template",
                    },
                  ],
                },
              ].map(i => {
                const itemColumn: DashboardCardItemColumn = i.columns[2];

                // Redirect to new template page for Add Template Button
                const AddTemplateRedirectButton = withRouter(props => {
                  const wrappedChildren = cloneElement(
                    props.children as ReactElement<any>,
                    {
                      onClick: () =>
                        props.history.push("/admin/test-manager/new"),
                    },
                  );

                  return <>{wrappedChildren}</>;
                });

                if (itemColumn.primaryText === "View") {
                  itemColumn.wrapper = (
                    <TestPreviewDialog fields={testPreviewDialogFields} />
                  );
                } else {
                  itemColumn.wrapper = <AddTemplateRedirectButton />;
                }

                return i;
              })}
            />
          </Grid>
        ))}
      </Grid>
    </AdminDashboardTemplateContainer>
  );
};
