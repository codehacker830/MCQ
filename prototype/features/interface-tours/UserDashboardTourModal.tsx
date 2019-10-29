import React, { SFC } from "react";
import { ArrowContainer } from "./components/ArrowContainer";
import { ArrowTargetDescription } from "./components/ArrowTargetDescription";
import { ArrowTargetRow } from "./components/ArrowTargetRow";
import { ArrowTargetRowItem } from "./components/ArrowTargetRowItem";
import { SwipeInstructions } from "./components/SwipeInstructions";
import { TourDismissalButton } from "./components/TourDismissalButton";
import { TourPortal } from "./components/TourPortal";
import { TourPortalContents } from "./components/TourPortalContents";

export const UserDashboardTourModal: SFC = () => {
  return (
    <TourPortal>
      {({ closeModal }) => (
        <TourPortalContents>
          <SwipeInstructions topOffset="50%">
            Swipe LEFT/RIGHT to goto next or previous dashboard pages.
          </SwipeInstructions>

          <ArrowContainer>
            <ArrowTargetRow variant="toolbar">
              <div style={{ flex: 1 }} />

              <ArrowTargetRowItem id="change-language-button" width={50} />
              <ArrowTargetRowItem id="log-out-button" width={50} />
            </ArrowTargetRow>

            <ArrowTargetDescription
              id="change-language-button-description"
              relations={[
                {
                  from: { anchor: "right" },
                  to: { anchor: "bottom", id: "change-language-button" },
                },
              ]}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 100,
                marginTop: 32,
              }}
            >
              Change Language
            </ArrowTargetDescription>

            <ArrowTargetDescription
              id="log-out-button-description"
              relations={[
                {
                  from: { anchor: "right" },
                  to: { anchor: "bottom", id: "log-out-button" },
                },
              ]}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 100,
                marginTop: 32,
              }}
            >
              Log Out
            </ArrowTargetDescription>
          </ArrowContainer>

          <TourDismissalButton onClick={closeModal}>
            OK, GOT IT!
          </TourDismissalButton>
        </TourPortalContents>
      )}
    </TourPortal>
  );
};
