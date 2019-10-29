import Button from "@material-ui/core/Button";
import React, { SFC } from "react";
import styled from "styled-components";
import { Card } from "../../../../components/Card";
import {
  CardDualColumnsTextContent,
  CardDualColumnsTextContentRow,
} from "../../../../components/CardDualColumnsTextContent";
import { CardHeader } from "../../../../components/CardHeader";
import { Typography } from "../../../../components/Typography";

export type OverviewCardStat = {
  id: string;
  title: string;
  value: string;
};

export type OverviewCardProps = {
  title: string;

  stats: OverviewCardStat[];

  /**
   * If supplied, turns the stat value into a button. This handler is called
   * when the button is pressed with the stat id.
   */
  onStatValueClick?: (id: string) => void;
};

export const OverviewCard: SFC<OverviewCardProps> = props => {
  const { title, stats, onStatValueClick } = props;

  const rows = stats.map(
    (stat): CardDualColumnsTextContentRow => ({
      id: stat.id,
      leftNode: <Typography variant="Subtitle2">{stat.title}</Typography>,
      rightNode: onStatValueClick ? (
        <ValueButton
          size="small"
          classes={{ label: "label" }}
          onClick={() => onStatValueClick(stat.id)}
        >
          <Typography variant="Subtitle2">{stat.value}</Typography>
        </ValueButton>
      ) : (
        <Typography variant="Subtitle2">{stat.value}</Typography>
      ),
    }),
  );

  return (
    <Card>
      <CardHeader title={title} />

      <CardDualColumnsTextContent rows={rows} />
    </Card>
  );
};

const ValueButton = styled(Button)`
  & > .label {
    text-transform: none;
  }

  * {
    /* TODO: Pull this color value from a central location or theme */
    color: #2d9cdb !important;
  }
`;
