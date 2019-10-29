import React, { FC } from "react";
import styled from "styled-components";
import { DarkTheme, LightTheme } from "../../../../theme";

import { ContentCenterWrapper } from "../../../../componentsV0/ContentCenterWrapper";
import { HeroDescription } from "../HeroDescription";
import { HeroFooter } from "../HeroFooter";
import { LanguageSelect } from "../LanguageSelect";
import { SigninSignupForms } from "../SigninSignupForms";

export const Hero: FC = () => {
  return (
    <DarkTheme>
      <>
        <div>
          <ContentCenterWrapper>
            <DivideWrapper>
              <div>
                <div style={{ marginTop: 2, marginBottom: 16 }}>
                  <LanguageSelect />
                </div>

                <LightTheme>
                  <SigninSignupForms />
                </LightTheme>
              </div>
            </DivideWrapper>
          </ContentCenterWrapper>
        </div>

        <HeroDescription />

        <HeroFooter />
      </>
    </DarkTheme>
  );
};

const DivideWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing(4)}px;

  > div:nth-child(1) {
    flex: 1;
    width: 100%;
    margin-bottom: ${props => props.theme.spacing(2)}px;
  }

  > div:nth-child(2) {
    width: 100%;

    ${props => props.theme.breakpoints.up("md")} {
      flex-basis: 400px;
    }
  }
`;
