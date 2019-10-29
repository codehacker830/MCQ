import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

export type CardDualColumnsTextContentRow = {
  /** Row id. */
  id: string;

  /** Left column contents. */
  leftNode: ReactNode;

  /** Right column contents. */
  rightNode: ReactNode;
};

export type CardDualColumnsTextContentProps = {
  rows: CardDualColumnsTextContentRow[];
};

export const CardDualColumnsTextContent: SFC<
  CardDualColumnsTextContentProps
> = props => {
  const { rows } = props;

  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {rows.map((row, index) => (
            <Grid key={row.id} container spacing={2}>
              <Grid item xs={12} md={6}>
                <RowWrapper>{row.leftNode}</RowWrapper>
              </Grid>
              <Grid item xs={12} md={6}>
                <RowWrapper>{row.rightNode}</RowWrapper>
              </Grid>

              {index < rows.length - 1 && (
                <Hidden mdUp>
                  <Grid item xs={12} style={{ marginBottom: 8 }}>
                    <Divider />
                  </Grid>
                </Hidden>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </CardContent>
  );
};

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
`;
