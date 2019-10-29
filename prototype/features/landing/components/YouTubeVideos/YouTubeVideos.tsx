import ButtonBase from "@material-ui/core/ButtonBase";
import Hidden from "@material-ui/core/Hidden";
import React, { Fragment, SFC } from "react";
import Loadable from "react-loadable";
import styled, { css } from "styled-components";
import { Button } from "../../../../components/Button";
import { Typography } from "../../../../components/Typography";
import { ContentCenterWrapper } from "../../../../componentsV0/ContentCenterWrapper";

import { fetchVideos, YouTubeVideoList } from "./client";
import YouTubeSubscribeOptimizedPng from "./YouTubeSubscribeOptimized.png";

const youtubeChannelUrl =
  "https://www.youtube.com/channel/UCegkxRhEtHGlE60RAo4ZwSg";

export type YouTubeVideosProps = {
  videos: YouTubeVideoList;
};

const YouTubeVideos: SFC<YouTubeVideosProps> = props => {
  const { videos } = props;

  /* tslint:disable-next-line:no-console */
  console.log("videos", videos);

  const categories: {
    title: string;
    videos: YouTubeVideoList;
  }[] = [
    { title: "Army", videos: [] },
    { title: "Air Force", videos: [] },
    { title: "Navy", videos: [] },
  ];

  // Distribute 4 videos per category.
  // TODO: Replace with logic which pulls from YouTube channels.
  let nextCategoryIndex = 0;
  for (const video of videos.slice(0, categories.length * 4)) {
    categories[nextCategoryIndex].videos.push(video);
    nextCategoryIndex += 1;
    if (nextCategoryIndex === categories.length) nextCategoryIndex = 0;
  }

  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <Header>Our Information Videos on Defense Jobs</Header>
          <YouTubeSubscriptionButton />
        </HeaderWrapper>

        <ContentCenterWrapper>
          {categories.map(category => (
            <Fragment key={category.title}>
              <Typography variant="H6">{category.title}</Typography>

              <Hidden smUp>
                <YouTubeVideoIframe
                  large
                  videoId={category.videos[0].contentDetails.videoId}
                />
              </Hidden>

              <VideoRow>
                {category.videos.map(
                  ({ contentDetails: { videoId } }, index) => (
                    <Hidden key={videoId} xsDown={index === 0 || index === 3}>
                      <YouTubeVideoIframe videoId={videoId} />
                    </Hidden>
                  ),
                )}
                <div style={{ flex: 1 }} />
                <ViewMoreVideosButton />
              </VideoRow>
            </Fragment>
          ))}
        </ContentCenterWrapper>
      </Wrapper>
    </>
  );
};

const LoadableYouTubeVideos = Loadable({
  loading: () => null,
  loader: () => fetchVideos(),
  render: videos => {
    return <YouTubeVideos videos={videos} />;
  },
});

export { LoadableYouTubeVideos as YouTubeVideos };

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;
  padding: 32px;
  background-color: #5cb4d0;
`;

const Header = styled(Typography)`
  font-size: 26px;
  font-weight: 600;
  color: #fff;
`;

const YouTubeSubscriptionButton = styled(
  ({ className }: { className?: string }) => (
    <ButtonBase
      className={className}
      component="a"
      href={youtubeChannelUrl}
      target="_blank"
    >
      <span className="background-image" />
    </ButtonBase>
  ),
)`
  position: absolute;
  width: 96px;
  height: 96px;
  top: 0%;
  left: 50%;
  transform: translateX(340px);

  @media (max-width: 999px) {
    display: none;
  }

  & .background-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url(${YouTubeSubscribeOptimizedPng});
    background-size: cover;
    background-position: center;
  }
`;

const VideoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const videoRowSplitCount = 5;

const videoDimensions = css`
  width: calc(100vw / ${videoRowSplitCount} - 32px);
  height: calc(100vw / ${videoRowSplitCount} - 32px);
  max-width: calc(1280px / ${videoRowSplitCount} - 32px);
  max-height: calc(1280px / ${videoRowSplitCount} - 32px);
`;

const YouTubeVideoIframe = styled(
  ({
    className,
    videoId,
  }: {
    className?: string;
    videoId: string;
    large?: boolean;
  }) => (
    <iframe
      className={className}
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder={0}
      allowFullScreen
    />
  ),
)`
  ${({ large }) =>
    !large
      ? css`
          ${videoDimensions};
          margin: 16px;
        `
      : `
          width: calc(100vmin - 32px);
          height: calc(100vmin - 32px);
          margin: 16px 0;
        `};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ViewMoreVideosButton = styled(({ className }: { className?: string }) => (
  <Button
    className={className}
    component="a"
    href={youtubeChannelUrl}
    target="_blank"
    color="blue"
    variant="contained"
  >
    View more videos...
  </Button>
))`
  ${videoDimensions};

  margin: 16px 0;

  ${({ theme }) => theme.breakpoints.down("xs")} {
    width: inherit;
    height: inherit;
  }
`;
