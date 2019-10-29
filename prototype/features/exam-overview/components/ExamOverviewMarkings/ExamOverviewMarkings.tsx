import React, { SFC } from "react";
import { connect } from "react-redux";
import { State } from "../../../../store";
import { IExamMetaMarkings } from "../../models/IExamMetaMarkings";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Hidden from "@material-ui/core/Hidden";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { DashboardTableRow } from "../../../../componentsV0/DashboardTableRow";
import { Typography } from "../../../../componentsV0/Typography";

const titles = [
  "Total Marks",
  "Passing Marks",
  "Total Time",
  "Total Questions",
  "Marks for correct answer",
  "Marks for wrong answer",
];

const statFieldKeys: (keyof IExamMetaMarkings)[] = [
  "totalMarks",
  "passingMarks",
  "totalTimeMinutes",
  "questionsCount",
  "marksPerCorrectAnswer",
  "marksPerIncorrectAnswer",
];

const renderStats = (markings: IExamMetaMarkings) =>
  statFieldKeys.map(s => {
    let stat: string;

    switch (s) {
      case "passingMarks":
        stat = `${(markings.passingMarks / markings.totalMarks) * 100}% (${
          markings.passingMarks
        })`;
        break;
      case "totalTimeMinutes":
        stat = `${markings.totalMarks} minutes`;
        break;
      case "questionsCount":
        stat = `${markings.questionsCount} Questions`;
        break;
      case "marksPerCorrectAnswer":
        stat = `+${markings.marksPerCorrectAnswer} marks`;
        break;
      case "marksPerIncorrectAnswer":
        stat = `-${markings.marksPerIncorrectAnswer} marks`;
        break;
      default:
        stat = markings[s].toString();
    }

    return stat;
  });

interface StateProps {
  markings: IExamMetaMarkings;
}

interface OwnProps {
  /**
   * Render without wrapping the contents in a Material UI Card component.
   */
  noCard?: boolean;
}

export type ExamOverviewMarkingsProps = StateProps & OwnProps;

const ExamOverviewMarkings: SFC<ExamOverviewMarkingsProps> = props => {
  const { markings, noCard } = props;

  const stats = renderStats(markings);

  const contents = (
    <Table>
      {/* Show a blank table head on desktop so both ExamOverviewMarkings and
          ExamOverviewBluePrint have the same height header/toolbar. */}
      <Hidden smDown>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
      </Hidden>
      <TableBody>
        {titles.map((title, index) => (
          <DashboardTableRow key={title}>
            <TableCell>{titles[index]}</TableCell>
            <TableCell>{stats[index]}</TableCell>
          </DashboardTableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (noCard) return contents;

  return (
    <Card>
      <CardHeader
        title={<Typography variant="cardTitle">Markings</Typography>}
      />
      {contents}
    </Card>
  );
};

const ExamOverviewMarkingsContainer = connect<StateProps, {}, OwnProps, State>(
  (state: State): StateProps => ({
    markings: state.examOverview.examMeta.markings,
  }),
)(ExamOverviewMarkings);

export { ExamOverviewMarkingsContainer as ExamOverviewMarkings };
