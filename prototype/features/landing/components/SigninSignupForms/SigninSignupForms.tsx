import React, { SFC } from "react";
import styled from "styled-components";

// import { SessionForm } from "../../../session";

export type SigninSignupFormsProps = {};

/**
 * Provides the onboarding page enrollment forms.
 */
export const SigninSignupForms: SFC<SigninSignupFormsProps> = () => {
  return (
    <Wrapper>
      {/* <SessionForm type="user-sign-in" />
      <SessionForm type="user-sign-up" /> */}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > form:nth-child(2) {
    margin-top: ${props => props.theme.spacing(4)}px;
  }
`;
