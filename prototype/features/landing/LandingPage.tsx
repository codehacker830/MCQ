import React, { SFC } from "react";

import { PageFooter } from "../../../components";
import { Hero } from "./components/Hero";
import { IndexCards } from "./components/IndexCards";
import { LandingTemplate } from "./components/LandingTemplate";
// import { YouTubeVideos } from "./components/YouTubeVideos";

export const LandingPage: SFC<{}> = () => {
  return (
    <LandingTemplate
      heroNode={<Hero />}
      testCardNode={<IndexCards />}
      // TODO: Add mechanism to safely retrieve API key and video listings.
      // youTubeVideosNode={<YouTubeVideos />}
      youTubeVideosNode={<></>}
      footerNode={<PageFooter />}
    />
  );
};
