import React, { ReactNode, SFC } from "react";
import styled from "styled-components";

import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth";

import { BlockImage } from "../../../../componentsV0/BlockImage";

export interface ExamContentsProps {
  /**
   * Orientation to display the question image and answers.
   *
   * Horizontal will display the various question answers on the left, followed
   * by the question image on the right. On mobile, this will be arranged
   * vertically.
   *
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Node with answer selection component.
   */
  answerNode: ReactNode;

  /**
   * Optional question image.
   */
  questionImageUrl?: string;
}

const ExamContents: SFC<ExamContentsProps & WithWidth> = props => {
  const {
    orientation = "horizontal",
    width,
    answerNode,
    questionImageUrl,
  } = props;

  const isHorizontalOrientation =
    orientation === "horizontal" && isWidthUp("sm", width);

  const Container = isHorizontalOrientation
    ? ContainerHorizontal
    : ContainerVertical;

  const questionImageNode = questionImageUrl ? (
    <div>
      <BlockImage src={questionImageUrl} />
    </div>
  ) : null;

  return (
    <Container>
      <div>{answerNode}</div>
      {questionImageNode}
    </Container>
  );
};

const ExamContentsWithWidth = withWidth()(ExamContents);
export { ExamContentsWithWidth as ExamContents };

const ContainerHorizontal = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;

  > div {
    width: 100%;
    padding: ${({ theme }) => theme.spacing(1)}px;
  }
`;

const ContainerVertical = styled(ContainerHorizontal)`
  flex-direction: column;

  > *:first-child {
    order: 2;
  }
`;
