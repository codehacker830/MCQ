import React, { SFC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State } from "../../../../store";
import { IExamMetaSubject } from "../../models/IExamMetaSubject";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { DashboardTableRow } from "../../../../componentsV0/DashboardTableRow";
import { Typography } from "../../../../componentsV0/Typography";

interface StateProps {
  subjects: IExamMetaSubject[];
}

interface OwnProps {
  /**
   * Render the component without wrapping it with a Material UI Card component.
   *
   * Also reduce the table cell padding to prevent horizontal overflow.
   */
  noCard?: boolean;
}

export type ExamOverviewBluePrintProps = StateProps & OwnProps;

const ExamOverviewBluePrint: SFC<ExamOverviewBluePrintProps> = props => {
  const { subjects, noCard } = props;

  const contents = (
    <Table>
      <TableHead>
        <TableRow>
          {/* TODO: Add localized strings here. */}
          {["Subjects Covered", "No. of Questions", "Marks Allocated"].map(
            t => (
              <TableCellWithNoRightPadding key={t}>
                <Typography variant="tableHeadCell">{t}</Typography>
              </TableCellWithNoRightPadding>
            ),
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {subjects.map(s => (
          <DashboardTableRow key={s.id}>
            <TableCellWithNoRightPadding>
              {/* TODO: Choose correct localization string. */}
              {s.title.en}
            </TableCellWithNoRightPadding>
            <TableCellWithNoRightPadding>
              {s.questionCount}
            </TableCellWithNoRightPadding>
            <TableCellWithNoRightPadding>
              {s.marksAllocated}
            </TableCellWithNoRightPadding>
          </DashboardTableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (noCard) return contents;

  return (
    <CardFlexGrow>
      <CardHeader
        /* TODO: Add localized strings here. */
        title={<Typography variant="cardTitle">Blue Print</Typography>}
      />
      {contents}
    </CardFlexGrow>
  );
};

const ExamOverviewBluePrintContainer = connect<StateProps, {}, OwnProps, State>(
  (state): StateProps => ({
    subjects: state.examOverview.examMeta.subjects,
  }),
)(ExamOverviewBluePrint);

export { ExamOverviewBluePrintContainer as ExamOverviewBluePrint };

const CardFlexGrow = styled(Card)`
  flex: 1;
`;

const TableCellWithNoRightPadding = styled(TableCell)`
  padding-right: 0;
`;
