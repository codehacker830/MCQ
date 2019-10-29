import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { StorybookPlaceholderImage } from "../../../../componentsV0/storybook/StorybookPlaceholderImage";
import { LandingTemplate } from "./LandingTemplate";

const testCardNodes: ReactNode[] = [];
for (let i = 0; i < 3; i += 1) {
  testCardNodes.push(<StorybookPlaceholderImage key={i} />);
}

storiesOf("Landing", module).add("LandingTemplate", () => (
  <Router>
    <LandingTemplate
      heroNode={<StorybookPlaceholderImage />}
      testCardNode={<div>{testCardNodes}</div>}
      youTubeVideosNode={<StorybookPlaceholderImage />}
      footerNode={<StorybookPlaceholderImage />}
    />
  </Router>
));
