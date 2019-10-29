import React, { Component, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ImportExport from "@material-ui/icons/ImportExport";

import { DashboardCard } from "../../componentsV0/DashboardCard";
import { DashboardSecondaryToolbar } from "../../componentsV0/DashboardSecondaryToolbar";
import { DropdownButton } from "../../componentsV0/DropdownButton";
import { ResponsiveToolbarTypographyButton } from "../../componentsV0/ResponsiveToolbarTypographyButton";
import { Typography } from "../../componentsV0/Typography";
import { TypographyButton } from "../../componentsV0/TypographyButton";

interface AdminRevenueManagerState {
  financialYearDropdownOpen: boolean;
  financialYearDropdownAnchorElement: HTMLElement | null;
}

class AdminRevenueManager extends Component<
  RouteComponentProps<void>,
  AdminRevenueManagerState
> {
  state: AdminRevenueManagerState = {
    financialYearDropdownOpen: false,
    financialYearDropdownAnchorElement: null,
  };

  handleFinancialYearDropdownButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    this.setState({ financialYearDropdownAnchorElement: event.currentTarget });
  };

  handleFinancialYearDropdownClose = () => {
    this.setState({ financialYearDropdownAnchorElement: null });
  };

  handleViewReportClick = () => {
    this.props.history.push("/admin/revenue-manager/details");
  };

  render() {
    const { financialYearDropdownAnchorElement } = this.state;

    const reportYearSelect = (
      <>
        <DropdownButton
          variant="text"
          onClick={this.handleFinancialYearDropdownButtonClick}
        >
          <Typography variant="buttonBold">Current Year Report</Typography>
        </DropdownButton>
        <Menu
          id="simple-menu"
          anchorEl={financialYearDropdownAnchorElement || undefined}
          open={Boolean(financialYearDropdownAnchorElement)}
          onClose={this.handleFinancialYearDropdownClose}
        >
          {["Current Year Report", "2015-2016", "2016-2017", "2017-2018"].map(
            financialYear => (
              <MenuItem
                key={financialYear}
                onClick={this.handleFinancialYearDropdownClose}
              >
                {financialYear}
              </MenuItem>
            ),
          )}
        </Menu>
      </>
    );

    return (
      <AdminDashboardTemplateContainer>
        <Grid container spacing={2}>
          {/* Financial Year Drop Down / Report Button */}
          <Grid item xs={12}>
            <DashboardSecondaryToolbar>
              <DropdownButton
                variant="text"
                onClick={this.handleFinancialYearDropdownButtonClick}
              >
                <Typography variant="buttonBold">
                  From Date: 27 Feb 2018
                </Typography>
              </DropdownButton>
              <Menu
                id="simple-menu"
                anchorEl={financialYearDropdownAnchorElement || undefined}
                open={Boolean(financialYearDropdownAnchorElement)}
                onClose={this.handleFinancialYearDropdownClose}
              >
                {["2015-2016", "2016-2017", "2017-2018"].map(financialYear => (
                  <MenuItem
                    key={financialYear}
                    onClick={this.handleFinancialYearDropdownClose}
                  >
                    {financialYear}
                  </MenuItem>
                ))}
              </Menu>

              <DropdownButton
                variant="text"
                onClick={this.handleFinancialYearDropdownButtonClick}
              >
                <Typography variant="buttonBold">
                  To Date: 27 Feb 2018
                </Typography>
              </DropdownButton>
              <Menu
                id="simple-menu"
                anchorEl={financialYearDropdownAnchorElement || undefined}
                open={Boolean(financialYearDropdownAnchorElement)}
                onClose={this.handleFinancialYearDropdownClose}
              >
                {["2015-2016", "2016-2017", "2017-2018"].map(financialYear => (
                  <MenuItem
                    key={financialYear}
                    onClick={this.handleFinancialYearDropdownClose}
                  >
                    {financialYear}
                  </MenuItem>
                ))}
              </Menu>

              <DashboardSecondaryToolbar.Spacer />

              <Hidden smUp>{reportYearSelect}</Hidden>

              <TypographyButton
                variant="text"
                color="blue"
                onClick={this.handleViewReportClick}
              >
                Submit
              </TypographyButton>
            </DashboardSecondaryToolbar>
          </Grid>

          {/* Plan Records */}
          <Grid item xs={12}>
            <DashboardCard
              title="Revenue Report"
              titleSiblingNode={<Hidden xsDown>{reportYearSelect}</Hidden>}
              additionalActionNode={
                <ResponsiveToolbarTypographyButton
                  iconNode={<ImportExport />}
                  tooltipTitle="Export Report"
                >
                  Export Report
                </ResponsiveToolbarTypographyButton>
              }
              items={[
                "Trial Pack",
                "5 Plan Pack",
                "10 Pack Plan",
                "15 Plan Pack",
                "20 Pack Plan",
              ].map((plan, index) => ({
                key: plan,
                columns: [
                  {
                    primaryText: plan,
                  },
                  {
                    primaryText: ((index + 1) * 200).toString(),
                  },
                  {
                    primaryText: ((index + 1) * 400).toString(),
                  },
                ],
              }))}
              columnLabels={["Plan Name", "No. of Users", "Revenue"]}
              columnTypes={["single-line", "single-line", "single-line"]}
            />
          </Grid>
        </Grid>
      </AdminDashboardTemplateContainer>
    );
  }
}

const AdminRevenueManagerWithRouter = withRouter(AdminRevenueManager);
export { AdminRevenueManagerWithRouter as AdminRevenueManager };
