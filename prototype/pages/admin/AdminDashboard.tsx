import React, { Component } from "react";
import { serviceStatistics } from "../../common/structures/serviceStatistics";
import { strings } from "../../features/localization";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { DashboardCardStatsContent } from "../../componentsV0/DashboardCardStatsContent";
import { DashboardTableCell } from "../../componentsV0/DashboardTableCell";
import { DashboardTableRow } from "../../componentsV0/DashboardTableRow";
import { FilterButton } from "../../componentsV0/FilterButton";
import { Typography } from "../../componentsV0/Typography";
import { TypographyL10 } from "../../componentsV0/TypographyL10";

import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";
import { ReactComponent as ManSvg } from "./man.svg";

import { randomNumber } from "../../common/utils";
import { createPlaceholderFilterButtonProps } from "../../componentsV0/FilterButton/createPlaceholderFilterButtonProps";

// tslint:disable-next-line:no-empty-interface
interface AdminDashboardProps {}

export class AdminDashboard extends Component<AdminDashboardProps> {
  render() {
    const filterButtonProps = createPlaceholderFilterButtonProps();

    return (
      <AdminDashboardTemplateContainer>
        <Grid container spacing={2}>
          {/* Users */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <TypographyL10
                    variant="cardTitle"
                    localizationKey="pages_admin_Dashboard_CardUsersTitle"
                  />
                }
                action={<FilterButton {...filterButtonProps} />}
              />
              <DashboardCardStatsContent
                leftIcon={<ManSvg style={{ fill: "#757575" }} />}
              >
                {([
                  "pages_admin_Dashboard_CardUsersStatTotalUsers",
                  "pages_admin_Dashboard_CardUsersStatActiveUsers",
                  "pages_admin_Dashboard_CardUsersStatRegistrationsPastWeek",
                ] as (keyof typeof strings)[]).map(statCaption => (
                  <DashboardCardStatsContent.Item key={statCaption}>
                    <Typography variant="cardLargeStatText">
                      {randomNumber()}
                    </Typography>
                    <TypographyL10
                      variant="cardStatCaption"
                      localizationKey={statCaption}
                    />
                  </DashboardCardStatsContent.Item>
                ))}
              </DashboardCardStatsContent>
            </Card>
          </Grid>

          {/* Membership Status */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <TypographyL10
                    variant="cardTitle"
                    localizationKey="pages_admin_Dashboard_CardMembershipStatusTitle"
                  />
                }
                action={<FilterButton {...filterButtonProps} />}
              />
              <DashboardCardStatsContent>
                {["5 Exams", "10 Exams", "20 Exams", "30 Exams"].map(
                  caption => (
                    <DashboardCardStatsContent.Item key={caption}>
                      <Typography variant="cardLargeStatText">
                        {randomNumber()}
                      </Typography>
                      <Typography variant="cardStatCaption">
                        {caption}
                      </Typography>
                    </DashboardCardStatsContent.Item>
                  ),
                )}
              </DashboardCardStatsContent>
            </Card>
          </Grid>

          {/* Entry wise Users */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                // title="Entry wise Users"
                title={
                  <TypographyL10
                    variant="cardTitle"
                    localizationKey="pages_admin_Dashboard_CardEntryWiseUsersTitle"
                  />
                }
                action={<FilterButton {...filterButtonProps} />}
              />
              {serviceStatistics && (
                <Table>
                  <TableHead>
                    <TableRow>
                      {["Entry", "Signup Count"].map(label => (
                        <DashboardTableCell key={label} firstCellWidth="50%">
                          <Typography variant="tableHeadCell">
                            {label}
                          </Typography>
                        </DashboardTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {serviceStatistics.entries.map((e, index) => (
                      <DashboardTableRow key={e}>
                        <TableCell>
                          <Typography>{e}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {serviceStatistics.entriesRegistrationsToday[index]}
                          </Typography>
                        </TableCell>
                      </DashboardTableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </Grid>

          {/* Question Bank */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <TypographyL10
                    variant="cardTitle"
                    localizationKey="pages_admin_Dashboard_CardQuestionBankTitle"
                  />
                }
              />
              {serviceStatistics && (
                <Table>
                  <TableHead>
                    <TableRow>
                      {["Subjects", "Questions Count"].map(label => (
                        <DashboardTableCell key={label} firstCellWidth="50%">
                          <Typography variant="tableHeadCell">
                            {label}
                          </Typography>
                        </DashboardTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {serviceStatistics.questionSubjects.map(
                      (subject, index) => (
                        <DashboardTableRow key={subject}>
                          <TableCell>
                            <Typography>{subject}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {
                                serviceStatistics.questionCountsPerSubjects[
                                  index
                                ]
                              }
                            </Typography>
                          </TableCell>
                        </DashboardTableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </Grid>
        </Grid>
      </AdminDashboardTemplateContainer>
    );
  }
}
