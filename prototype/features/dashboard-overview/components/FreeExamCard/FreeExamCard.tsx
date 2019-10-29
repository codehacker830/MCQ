import CardActions from "@material-ui/core/CardActions";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import styled, { css } from "styled-components";
import { entryImages } from "../../../../common/structures/entryImages";
// import { Typography } from "../../../../components/Typography";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { CardActionArea } from "../../../../components/CardActionArea";
// import {
//   CardDualColumnsTextContent,
//   CardDualColumnsTextContentRow,
// } from "../../../../components/CardDualColumnsTextContent";
import { CardHeader } from "../../../../components/CardHeader";
import { freeExamCardBackgroundColor } from "../../../../css";

export const FreeExamCard = () => {
  // const rows: CardDualColumnsTextContentRow[] = [
  //   { id: "attempted", leftNode: "Attempted", rightNode: "02 Tests" },
  //   { id: "remaining", leftNode: "Remaining", rightNode: "08 Tests" },
  // ].map(row => ({
  //   ...row,
  //   leftNode: <Typography variant="Subtitle2">{row.leftNode}</Typography>,
  //   rightNode: <Typography variant="Subtitle2">{row.rightNode}</Typography>,
  // }));

  const onCardClick = () => alert("Start free exam");

  return (
    <StyledCard hoverable>
      <CardActionArea onClick={onCardClick}>
        <div style={{ position: "relative" }}>
          <CardHeader
            title="Soldier Tradesman"
            subheader="Validity 31st Jan 2019"
            overline="1 Free Test"
            imageUrl={entryImages.Army}
          />
          <Hidden smDown>
            <AttemptButton position="right" />
          </Hidden>
        </div>
      </CardActionArea>
      <Hidden mdUp>
        <CardActions>
          <AttemptButton position="bottom" onClick={onCardClick} />
        </CardActions>
      </Hidden>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background-color: ${freeExamCardBackgroundColor};
`;

const AttemptButton = styled(
  ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
    position: "right" | "bottom";
  }) => (
    <Button
      className={className}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      Attempt
    </Button>
  ),
)`
  ${({ position }) =>
    position === "right"
      ? css`
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
        `
      : css`
          margin-left: auto;
        `};
`;
