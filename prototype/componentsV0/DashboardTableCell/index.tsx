import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import React, { SFC } from "react";
import styled from "styled-components";

export interface DashboardTableCellProps extends TableCellProps {
  /**
   * Provides the width of the first cell when not viewed on mobile devices. If
   * set to 50% and there are two columns, then the table with be 50%/50% split.
   */
  firstCellWidth?: string;
}

/**
 * Wraps Material UI TableCell to provide options around aligning the table
 * column.
 */
export const DashboardTableCell = styled((props => {
  const { className, firstCellWidth, ...rest } = props;

  const classNames: string[] = [];
  if (className) classNames.push(className);
  if (firstCellWidth) classNames.push("with-first-cell-width");

  return <TableCell className={classNames.join(" ")} {...rest} />;
}) as SFC<DashboardTableCellProps>)`
  &.with-first-cell-width:first-child {
    width: ${({ firstCellWidth }) => firstCellWidth};
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    width: inherit !important;
  }
`;
