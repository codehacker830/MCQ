import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { DarkTheme, LightTheme } from "../../theme";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { Logo, PageFooter } from "../../../components";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

export interface AdminLoginTemplateProps {
  heroNode: ReactNode;
  loginForm: ReactNode;
}

export const AdminLoginTemplate: SFC<AdminLoginTemplateProps> = props => {
  const { heroNode, loginForm } = props;

  return (
    <DarkTheme>
      <Wrapper>
        <div className="appBar">
          <ContentCenterWrapper>
            <Logo />
          </ContentCenterWrapper>
        </div>

        <div className="content">
          <ContentCenterWrapper>
            <Grid container>
              <Hidden xsDown>
                <Grid item sm={8}>
                  {heroNode}
                </Grid>
              </Hidden>
              <Grid item sm={4} xs={12}>
                <LightTheme>{loginForm}</LightTheme>
              </Grid>
            </Grid>
          </ContentCenterWrapper>
        </div>

        <PageFooter />
      </Wrapper>
    </DarkTheme>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #404040;

  .appBar {
    padding: ${({ theme }) => theme.spacing(2)}px 0;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 3%,
      rgba(0, 0, 0, 0)
    );
  }

  .content {
    flex: 1;
  }
`;
