import React, { Component, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import { fromToolbarHeight } from "../../../../css";
import { routePathFromLocalizationKey } from "../../../navigation";

type OwnProps = {
  children: ReactNode;
};
export type TourPortalContentsProps = OwnProps;

type Props = OwnProps & RouteComponentProps<{}>;

class TourPortalContents extends Component<Props> {
  componentDidMount() {
    try {
      // Modern browsers not default to handling the "touchmove" event as
      // passive. This means that "preventDefault" can not be called without
      // explicitly setting passive to false.
      document.addEventListener("touchmove", this.handleTouchMove, {
        passive: false,
      });
    } catch (e) {
      document.addEventListener("touchmove", this.handleTouchMove);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  render() {
    const { children, location } = this.props;

    const examPageStaticAppBarHeight =
      location.pathname ===
      routePathFromLocalizationKey("routes_ExamTaking_ExamQuizPage");

    return (
      <BackgroundMask examPageStaticAppBarHeight={examPageStaticAppBarHeight}>
        {children}
      </BackgroundMask>
    );
  }

  /**
   * Prevent the background underneath the modal from being scrollable. This is
   * a visual fix/enhancement for iOS devices.
   *
   * On iOS, finger scrolling causes the background portion of the window to
   * move independently from the mask overlay.
   */
  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };
}

const TourPortalContentsWithRouter = withRouter(TourPortalContents);
export { TourPortalContentsWithRouter as TourPortalContents };

const backgroundGradientAppBarRevealed = fromToolbarHeight(
  "background",
  height => `
    linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) ${height}px,
      rgba(0, 0, 0, 0.85) ${height}px,
      rgba(0, 0, 0, 0.75)
    );
  `,
);

const backgroundGradientExamAppBarRevealed = css`
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 64px,
    rgba(0, 0, 0, 0.85) 64px,
    rgba(0, 0, 0, 0.75)
  );
`;

type BackgroundMaskProps = {
  examPageStaticAppBarHeight: boolean;
};

const BackgroundMask = styled.div<BackgroundMaskProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  ${({ examPageStaticAppBarHeight }) =>
    examPageStaticAppBarHeight
      ? backgroundGradientExamAppBarRevealed
      : backgroundGradientAppBarRevealed};
`;
