import React, { SFC } from "react";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import { Logo } from "../../../components";

// import { LogoutButton, LogoutButtonProps } from "../LogoutButton";

// tslint:disable-next-line:no-empty-interface
export interface OnboardingHeaderProps {
  // logoutButtonProps: LogoutButtonProps;
}

/**
 * Header for onboarding screens.
 */
export const OnboardingHeader: SFC<OnboardingHeaderProps> = _props => {
  // const { logoutButtonProps } = props;

  return (
    <Wrapper>
      <Logo size={64} />
      <Text>Welcome Jay, let's setup your account</Text>
      <LogoutButtonWrapper>
        {/* <LogoutButton {...logoutButtonProps} /> */}
      </LogoutButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: ${props => props.theme.spacing(2)}px;
`;

const Text = styled(Typography).attrs({ variant: "caption" })`
  flex: 1;
  font-size: 24px;
  text-align: center;

  ${props => props.theme.breakpoints.down("sm")} {
    flex-basis: 100%;
    order: 2;
    margin-top: ${props => props.theme.spacing(2)}px;
  }
`;

const LogoutButtonWrapper = styled.div`
  ${props => props.theme.breakpoints.down("sm")} {
    margin-left: auto;
  }
`;
