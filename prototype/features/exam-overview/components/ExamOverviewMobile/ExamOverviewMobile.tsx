import React, { Component, ReactNode } from "react";

import Tab from "@material-ui/core/Tab";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";

import { Typography } from "../../../../componentsV0/Typography";
import { ExamOverviewBluePrint } from "../ExamOverviewBluePrint";
import { ExamOverviewMarkings } from "../ExamOverviewMarkings";

enum OverviewTab {
  BluePrint = "Blue Print",
  Markings = "Markings",
}

// tslint:disable-next-line:no-empty-interface
export interface ExamOverviewMobileProps {}

interface ExamOverviewMobileState {
  value: OverviewTab;
}

export class ExamOverviewMobile extends Component<
  ExamOverviewMobileProps,
  ExamOverviewMobileState
> {
  state: ExamOverviewMobileState = {
    value: OverviewTab.BluePrint,
  };

  handleTabChange: TabsProps["onChange"] = (_event, value: OverviewTab) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const tabs: [OverviewTab, string, ReactNode][] = [
      [OverviewTab.BluePrint, "Blue Print", <ExamOverviewBluePrint noCard />],
      [OverviewTab.Markings, "Markings", <ExamOverviewMarkings noCard />],
    ];

    return (
      <>
        <Tabs width="100%" value={value} onChange={this.handleTabChange}>
          {tabs.map(([key, label]) => (
            <Tab
              key={key}
              value={key}
              label={
                <Typography style={{ textTransform: "none" }}>
                  {label}
                </Typography>
              }
            />
          ))}
        </Tabs>

        {tabs.find(t => t[0] === value)![2]}
      </>
    );
  }
}
