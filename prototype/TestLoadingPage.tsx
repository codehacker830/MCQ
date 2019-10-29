import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import withWidth, { isWidthDown, WithWidth } from "@material-ui/core/withWidth";
import React, { cloneElement, SFC } from "react";
import styled from "styled-components";
import { Card, CardProps } from "./components/Card";
import { CardContent } from "./components/CardContent";
import { Typography } from "./components/Typography";
import { LogoImage } from "./componentsV0/LogoImage";

export type TestLoadingPageProps = {};

export const TestLoadingPage: SFC<TestLoadingPageProps> = props => {
  const {} = props;

  return (
    <StyledResponsiveCard>
      <StyledCardContent>
        <ProgressWrapper>
          <StyledLogoImage />
          <StyledCircularProgress />
        </ProgressWrapper>

        <TextWrapper>
          <Typography paragraph align="center" style={{ fontWeight: 500 }}>
            Hold On! We are generating Your Test.
          </Typography>
          <Typography variant="Subtitle1" align="center" color="textSecondary">
            (It will just take a minute or so)
          </Typography>
        </TextWrapper>
      </StyledCardContent>
    </StyledResponsiveCard>
  );
};

const ResponsiveCard: SFC<CardProps & WithWidth> = ({ width, ...rest }) => {
  const isMobile = isWidthDown("sm", width);

  const Wrapper = isMobile ? <div /> : <Card />;

  return cloneElement(Wrapper, rest);
};

const ResponsiveCardWithWith = withWidth()(ResponsiveCard);

const StyledResponsiveCard = styled(ResponsiveCardWithWith)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 400px;
    height: 400px;
  }
`;

const ProgressWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const StyledLogoImage = styled(LogoImage)`
  position: absolute;
  width: 72px;
  height: 72px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledCircularProgress = styled(CircularProgress).attrs(
  (): Partial<CircularProgressProps> => ({
    size: 120,
    thickness: 1.2,
  }),
)`
  position: absolute;
  left: -10px;
  top: -10px;
`;

const TextWrapper = styled.div`
  margin-top: 64px;
`;
