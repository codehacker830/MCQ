import React, { Component } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  DashboardTableRow,
  DashboardTableRowProps,
} from "../DashboardTableRow";
import { Typography } from "../Typography";
import {
  DashboardEntryCardToolbar,
  DashboardEntryCardToolbarProps,
} from "./DashboardEntryCardToolbar";

export interface DashboardEntryCardProps
  extends Pick<DashboardEntryCardToolbarProps, "entryTitle"> {
  categoryLabels: string[];
  categoryPrices: number[];
  categoryActivated: boolean[];
}

interface DashboardEntryCardState
  extends Pick<DashboardEntryCardToolbarProps, "mode"> {
  categorySelected: boolean[];
}

export class DashboardEntryCard extends Component<
  DashboardEntryCardProps,
  DashboardEntryCardState
> {
  constructor(props: DashboardEntryCardProps) {
    super(props);

    this.state = {
      mode: "display",
      categorySelected: props.categoryLabels.map(() => false),
    };
  }

  handleEnterEditModeClick = () => this.setState({ mode: "edit" });
  handleEnterDeletionModeClick = () => this.setState({ mode: "deletion" });
  handleExitModeClick = () =>
    this.setState({
      mode: "display",
      categorySelected: this.props.categoryLabels.map(() => false),
    });

  handleSelectAllClick = () => {
    const { categorySelected } = this.state;
    const selectedCount = categorySelected.reduce((a, c) => (c ? a + 1 : a), 0);

    this.setState({
      categorySelected: categorySelected.map(
        () => selectedCount < categorySelected.length,
      ),
    });
  };

  handleRowClick = (index: number) => {
    const { mode, categorySelected } = this.state;

    if (mode === "deletion") {
      this.setState({
        categorySelected: [
          ...categorySelected.slice(0, index),
          !categorySelected[index],
          ...categorySelected.slice(index + 1),
        ],
      });
    }
  };

  render() {
    const {
      entryTitle,
      categoryLabels,
      categoryPrices,
      categoryActivated,
    } = this.props;
    const { mode, categorySelected } = this.state;
    const itemCount = categoryLabels.length;
    const selectedCount = categorySelected.reduce((a, c) => (c ? a + 1 : a), 0);

    // tslint:disable-next-line:no-empty
    const noop = () => {};

    return (
      <Card>
        <DashboardEntryCardToolbar
          mode={mode}
          entryTitle={entryTitle}
          selectedCount={selectedCount}
          onEnterEditModeClick={this.handleEnterEditModeClick}
          onEnterDeletionModeClick={this.handleEnterDeletionModeClick}
          onExitModeClick={this.handleExitModeClick}
          onDeleteSelectedClick={noop}
        />

        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ width: 72 }}>
                {mode === "deletion" && (
                  <RedCheckbox
                    indeterminate={
                      selectedCount > 0 && selectedCount < itemCount
                    }
                    checked={selectedCount === itemCount}
                    onChange={this.handleSelectAllClick}
                  />
                )}
              </TableCell>

              {["Category", "Cost Per Paper"].map(caption => (
                <TableCell key={caption}>
                  <Typography variant="tableHeadCell">{caption}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Contents */}
          <TableBody>
            {categoryLabels.map((label, index) => (
              <ClickableTableRow
                key={label}
                selected={categorySelected[index]}
                onClick={() => this.handleRowClick(index)}
                mode={mode}
              >
                <TableCell padding="checkbox">
                  {mode === "deletion" && (
                    <RedCheckbox checked={categorySelected[index]} />
                  )}
                </TableCell>

                {[label, categoryPrices[index]].map(caption => (
                  <TableCell key={caption}>
                    <Typography
                      muiTypographyProps={{
                        color: categoryActivated[index] ? "primary" : undefined,
                      }}
                    >
                      {caption}
                    </Typography>
                  </TableCell>
                ))}
              </ClickableTableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}

const RedCheckbox = styled(Checkbox).attrs({
  classes: {
    checked: "checked",
  },
})`
  &.checked {
    color: #e10050;
  }
`;

type ModeProp = Pick<DashboardEntryCardToolbarProps, "mode">;

const ClickableTableRow = styled(
  ({ mode, ...rest }: DashboardTableRowProps & ModeProp) => (
    <DashboardTableRow {...rest} />
  ),
)`
  cursor: ${({ mode }) => (mode !== "display" ? "pointer" : "inherit")};
`;
