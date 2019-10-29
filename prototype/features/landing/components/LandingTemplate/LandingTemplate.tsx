import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

// TODO: Remove Development Snackbar Link
import { DevelopmentAdminDashboardSnackbar } from "./DevelopmentAdminDashboardSnackbar";

export interface LandingTemplateProps {
  /** Hero section node. Image, text, and signup/sign-in forms. */
  heroNode: ReactNode;

  /** Product offering cards, main content. */
  testCardNode: ReactNode;

  /** YouTube videos.  */
  youTubeVideosNode: ReactNode;

  /** Page footer. */
  footerNode: ReactNode;
}

/**
 * Page template for main landing page.
 */
export const LandingTemplate: SFC<LandingTemplateProps> = props => {
  const { heroNode, testCardNode, youTubeVideosNode, footerNode } = props;

  return (
    <>
      <DevelopmentAdminDashboardSnackbar />

      <HeaderHeroWrapper>{heroNode}</HeaderHeroWrapper>

      <MainContentBackground>{testCardNode}</MainContentBackground>

      {youTubeVideosNode}

      <FooterWrapper>{footerNode}</FooterWrapper>
    </>
  );
};

const HeaderHeroWrapper = styled.header`
  display: block;
`;

const MainContentBackground = styled.div`
  &::before {
    content: " ";
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    will-change: transform;
    z-index: -1;
  }
`;

const FooterWrapper = styled.footer`
  display: block;
  max-height: ${props => props.theme.spacing(5)}px;
  overflow: hidden;
`;
