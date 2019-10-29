import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import React, { Component, createRef } from "react";
import { Card } from "../../components/Card";
import { SelectedEntries } from "../subscription-management";
import { ExamOverviewDialog } from "./components/ExamOverviewDialog";
import { FreeExamCard } from "./components/FreeExamCard";
import { OverviewCard, OverviewCardStat } from "./components/OverviewCard";

import { createEntryCategoryPlaceholders } from "../subscription-management/placeholders/createEntryCategoryPlaceholders";
import { createEntryPlaceholders } from "../subscription-management/placeholders/createEntryPlaceholders";

const entries = createEntryPlaceholders().slice(1, 3);
const categories = createEntryCategoryPlaceholders();
// tslint:disable-next-line:no-empty
const noop = () => {};

export class DashboardOverviewPage extends Component {
  private dialogRef = createRef<ExamOverviewDialog>();

  render() {
    return (
      <Grid container spacing={2}>
        {[
          <FreeExamCard />,

          <OverviewCard title="Rank" stats={createPlaceholderStats()} />,

          <Card>
            <CardHeader title="Your Selected Entries" />
            <CardContent>
              <SelectedEntries
                entries={entries}
                minEntriesCount={2}
                maxEntriesCount={2}
                selectedEntryIDs={entries.map(entry => entry.id)}
                onEntryRemoveButtonClick={noop}
                onAddMoreButtonClick={noop}
              />
            </CardContent>
          </Card>,

          <OverviewCard
            title="Exam Pattern"
            stats={createPlaceholderExamPatternStats()}
            onStatValueClick={this.handleStatClick}
          />,

          <ExamOverviewDialog ref={this.dialogRef} />,
        ].map((node, index) => (
          <Grid key={index} item xs={12}>
            {node}
          </Grid>
        ))}
      </Grid>
    );
  }

  private handleStatClick = (_id: string) => {
    if (this.dialogRef.current) {
      // tslint:disable-next-line: no-floating-promises
      this.dialogRef.current.openDialogForCategory("some-category-id");
    }
  };
}

const createPlaceholderStats = () => {
  const stats: OverviewCardStat[] = entries.map(
    (entry, index): OverviewCardStat => {
      const category = categories.find(c => c.entryID === entry.id)!;

      const title = `${category.title.en} (${entry.title.en})`;
      const value = `123/999 (92% from ${5 + index * 3} papers)`;

      return {
        id: title,
        title,
        value,
      };
    },
  );

  return stats;
};

const createPlaceholderExamPatternStats = () => {
  const stats = createPlaceholderStats();

  return stats.map(stat => ({
    ...stat,
    value: "View",
  }));
};
