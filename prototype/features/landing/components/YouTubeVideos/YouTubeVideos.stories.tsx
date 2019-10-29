import { storiesOf } from "@storybook/react";
import React from "react";

import { YouTubeVideos } from "./YouTubeVideos";

const stories = storiesOf("Landing", module);

stories.add("YouTubeVideos", () => {
  //
  return <YouTubeVideos />;
});
