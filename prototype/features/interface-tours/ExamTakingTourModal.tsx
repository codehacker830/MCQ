import { ArcherElement, ArcherElementProps } from "@strothj/react-archer";
import React, { SFC } from "react";
import styled from "styled-components";

import { Typography } from "../../componentsV0/Typography";
import { ArrowContainer } from "./components/ArrowContainer";
import { ArrowTargetDescription } from "./components/ArrowTargetDescription";
import { ArrowTargetRow } from "./components/ArrowTargetRow";
import { ArrowTargetRowItem } from "./components/ArrowTargetRowItem";
import { SwipeInstructions } from "./components/SwipeInstructions";
import { TourDismissalButton } from "./components/TourDismissalButton";
import { TourPortal } from "./components/TourPortal";
import { TourPortalContents } from "./components/TourPortalContents";

export const ExamTakingTourModal: SFC = () => {
  return (
    <TourPortal>
      {({ closeModal }) => (
        <TourPortalContents>
          <SwipeInstructions topOffset="60%">
            Swipe LEFT/RIGHT to goto next or previous questions
          </SwipeInstructions>

          <ArrowContainer>
            <ArrowTargetRow variant="exam-half-toolbar">
              <ArrowTargetRowItem
                id="dashboard-button"
                width={24}
                marginLeft={32}
              />

              <ArrowTargetRowItem id="change-language-button" width={40} />

              <ToolbarPauseButtonWrapper>
                <ArcherElement id="pause-button">
                  <ToolbarPauseButton />
                </ArcherElement>
              </ToolbarPauseButtonWrapper>

              <ArcherElement id="submit-exam-button">
                <SubmitExamButton />
              </ArcherElement>
            </ArrowTargetRow>

            <ArrowTargetRow variant="exam-half-toolbar">
              <ToolbarButtonSpacer />
              <ArcherElement id="question-palette-button">
                <ToolbarButton />
              </ArcherElement>
            </ArrowTargetRow>

            <ArrowTargetDescription
              id="pause-button-description"
              relations={[
                {
                  from: { anchor: "top" },
                  to: { anchor: "bottom", id: "pause-button" },
                },
              ]}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              Pause Exam
            </ArrowTargetDescription>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Description
                id="submit-exam-button-description"
                relations={[
                  {
                    from: { anchor: "right" },
                    to: { anchor: "bottom", id: "submit-exam-button" },
                  },
                ]}
              >
                Submit Exam
              </Description>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <Description
                id="change-language-button-description"
                relations={[
                  {
                    from: { anchor: "left" },
                    to: { anchor: "bottom", id: "change-language-button" },
                  },
                ]}
              >
                Change Language
              </Description>
            </div>

            <div style={{ display: "flex", marginTop: 24, paddingLeft: 100 }}>
              <Description
                id="question-palette-button-description"
                relations={[
                  {
                    from: { anchor: "left" },
                    to: { anchor: "bottom", id: "question-palette-button" },
                  },
                ]}
              >
                Exit Exam / Question Palette
              </Description>
            </div>

            <TourDismissalButton onClick={closeModal}>
              OK, GOT IT!
            </TourDismissalButton>
          </ArrowContainer>
        </TourPortalContents>
      )}
    </TourPortal>
  );
};

const ToolbarButtonSpacer = styled.div`
  width: 16px;
`;

const ToolbarButton = styled.div`
  width: 24px;
  height: 32px;
`;

const ToolbarPauseButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ToolbarPauseButton = styled.div`
  width: 120px;
  height: 32px;
`;

const SubmitExamButton = styled.div`
  width: 100px;
  height: 32px;
`;

const Description: SFC<ArcherElementProps> = ({ children, ...rest }) => (
  <ArcherElement {...rest}>
    <div style={{ paddingLeft: 4, paddingRight: 4 }}>
      <Typography style={{ color: "#fff" }}>{children}</Typography>
    </div>
  </ArcherElement>
);
