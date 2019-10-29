import React, { SFC } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { State } from "../../../../store";
import { UserAppDrawerTheme } from "../../../../theme";

import withWidth, { isWidthDown, WithWidth } from "@material-ui/core/withWidth";

import { DashboardTemplate } from "../../../../componentsV0/DashboardTemplate";

import { FeatureKey } from "../../types/FeatureKey";
import { ExamAppBar } from "../ExamAppBar";
import { ExamBottomNavFrame } from "../ExamBottomNavFrame";
import { ExamDrawerContents } from "../ExamDrawerContents";
import {
  ExamTemplateMobile,
  ExamTemplateMobileProps,
} from "../ExamTemplateMobile";

type StateProps = {
  showBottomNav: boolean;
};

type OwnProps = ExamTemplateMobileProps & FeatureKey;
export type ExamTemplateProps = OwnProps;

type Props = StateProps & WithWidth & OwnProps;

const ExamTemplate: SFC<Props> = props => {
  const {
    children,
    showBottomNav,
    width,
    staticView,
    paneKeyNodeMap,
    featureKey,
  } = props;

  const drawerContentsNode = <ExamDrawerContents featureKey={featureKey} />;
  const showMobileTemplate = isWidthDown("sm", width);

  const pageContentsWrapperComponent = !showBottomNav
    ? undefined
    : (wrapperProps: any) => (
        <ExamBottomNavFrame {...wrapperProps} featureKey={featureKey} />
      );

  return (
    <>
      {featureKey === "examTaking" && (
        <Prompt message="You have an exam in progress, are you sure you want to leave?" />
      )}

      {!showMobileTemplate ? (
        <DashboardTemplate
          appBarNode={<ExamAppBar featureKey={featureKey} />}
          drawerContentsNode={drawerContentsNode}
          drawerThemeElement={<UserAppDrawerTheme />}
          pageContentsWrapperComponent={pageContentsWrapperComponent}
          backgroundColor={"#fff"}
        >
          {children}
        </DashboardTemplate>
      ) : (
        <ExamTemplateMobile
          staticView={staticView}
          paneKeyNodeMap={paneKeyNodeMap}
          featureKey={featureKey}
        />
      )}
    </>
  );
};

const ExamTemplateWithWidth = withWidth()(ExamTemplate);

const ExamTemplateContainer = connect<StateProps, {}, OwnProps, State>(
  (store, { featureKey }): StateProps => ({
    showBottomNav:
      !store[featureKey].showOverviewScreen &&
      !store[featureKey].showSubmissionSummaryScreen,
  }),
)(ExamTemplateWithWidth);
export { ExamTemplateContainer as ExamTemplate };
