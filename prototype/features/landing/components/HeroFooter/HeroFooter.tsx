import React, { SFC } from "react";
import styled from "styled-components";
import { strings } from "../../../localization";
// import armyGreenPng from "./armyGreen.png";

import Typography from "@material-ui/core/Typography";

/**
 * Footer of hero image section of landing page.
 *
 * Needs background image.
 */
export const HeroFooter: SFC<{}> = () => (
  <Wrapper>
    {/* <Bar /> */}
    {/* <Text>{strings.landing_HeroFooter_Text}</Text> */}
    <Text>{strings.landing_Hero_PrimaryText}</Text>
    {/* <Text>{strings.landing_Hero_SecondaryText}</Text> */}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: rgba(23, 133, 70, 0.7); */
  background-color: #5ba87c;

  > * {
    margin: ${props => props.theme.spacing(4)}px;
  }

  > * {
    /* > *:first-child { */
    font-size: 26px !important;
    /* font-size: 26px; */
    /* margin-bottom: 0; */
  }
`;

/* background-image:
    linear-gradient(
      rgba(0,0,0,0.4),
      rgba(0,0,0, 0.4)
    ),
    url("${armyGreenPng}"
  );
  background-size: cover; */

// const Bar = styled.div`
//   width: 97px;
//   height: 5px;
//   background-color: #f2c94c;
// `;

const Text = styled(Typography).attrs({
  variant: "h4",
})`
  /* margin-top: 0 !important; */
  /* font-size: 18px;
  font-size: 18px; */
  font-weight: 600;
  letter-spacing: 0.01rem;
`;
