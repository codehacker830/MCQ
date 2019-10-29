import React, { SFC } from "react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import Assignment from "@material-ui/icons/Assignment";

import { Typography } from "../../../../componentsV0/Typography";
import {
  CardMediaSquareWithMargin,
  FlexRow,
  logoDimensions,
  VerticalFlexRowsContainer,
} from "../DashboardTestCard";

export type DashboardTestCardColumnHeaderProps = {
  /**
   * Icon to display to the left of the header text.
   */
  icon?: "exam";

  /**
   * Image url to display to the left of the header text.
   */
  imageLogoUrl?: string;

  /**
   * Title text.
   */
  title: string;
};

export const DashboardTestCardColumnHeader: SFC<
  DashboardTestCardColumnHeaderProps
> = props => {
  const { children, icon, imageLogoUrl, title } = props;

  const iconElement = icon ? <Assignment /> : undefined;

  return (
    <Paper elevation={4}>
      <VerticalFlexRowsContainer>
        <FlexRow style={{ alignItems: "center" }}>
          {iconElement && <IconWrapper>{iconElement}</IconWrapper>}

          {imageLogoUrl && <CardMediaSquareWithMargin image={imageLogoUrl} />}

          <Typography variant="cardTitle">{title}</Typography>
        </FlexRow>

        {children}
      </VerticalFlexRowsContainer>
    </Paper>
  );
};

const IconWrapper = styled.div`
  ${logoDimensions};

  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  > svg {
    width: 66.6%;
    height: 66.6%;
  }
`;
