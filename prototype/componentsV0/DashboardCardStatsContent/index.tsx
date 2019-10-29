import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

const Item = styled((({ children, className }) => (
  <Grid className={className} item xs={12} sm container justify="center">
    <div>{children}</div>
  </Grid>
)) as SFC<{ className?: string }>)`
  > div {
    margin: 8px;
  }
`;

export interface DashboardCardStatsContentProps {
  className?: string;

  leftIcon?: ReactNode;
}

const DashboardCardStatsContentBase = styled((props => {
  const { className, children, leftIcon } = props;

  return (
    <CardContent className={className}>
      <div>
        {leftIcon && (
          <Box className="item-left-icon" clone>
            <Hidden xsDown implementation="css">
              {leftIcon}
            </Hidden>
          </Box>
        )}

        <Grid className="item-content" container justify="space-around">
          {children}
        </Grid>
      </div>
    </CardContent>
  );
}) as SFC<DashboardCardStatsContentProps>)`
  > div {
    display: flex;
  }

  .item-left-icon,
  .item-left-icon svg {
    width: 64px;
    height: 64px;
  }

  .item-content > * {
    text-align: center;
  }
`;

type DashboardCardStatsContentWithItem = typeof DashboardCardStatsContentBase & {
  Item: typeof Item;
};

/**
 * A wrapper around the Material UI CardContent component. I spreads grid items
 * horizontally on larger displays and vertically on mobile. It applies
 * centering and margins to grid items.
 */
const DashboardCardStatsContent = DashboardCardStatsContentBase as DashboardCardStatsContentWithItem;
DashboardCardStatsContent.Item = Item;

export { DashboardCardStatsContent };
