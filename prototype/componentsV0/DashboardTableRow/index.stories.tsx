import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import { DashboardTableRow } from ".";

storiesOf("Components V0", module).add("DashboardTableRow", () => {
  const cells: ReactNode[] = [];
  for (let i = 0; i < 10; i += 1) {
    cells.push(
      <DashboardTableRow key={i}>
        <TableCell>John</TableCell>
        <TableCell align="right">500</TableCell>
      </DashboardTableRow>,
    );
  }

  return (
    <div style={{ margin: 24 }}>
      <Card>
        {/* <CardContent> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{cells}</TableBody>
        </Table>
        {/* </CardContent> */}
      </Card>
    </div>
  );
});
