import React, { Component, PropsWithoutRef } from "react";

import TablePagination, {
  TablePaginationProps,
} from "@material-ui/core/TablePagination";

export type DashboardCardPaginationProps = PropsWithoutRef<
  TablePaginationProps
>;

export class DashboardCardPagination extends Component<
  DashboardCardPaginationProps
> {
  render() {
    return <TablePagination {...this.props} />;
  }
}
