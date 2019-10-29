import Carousel, { CarouselSlideRenderControlProps } from "nuka-carousel";
import React, { ReactNode, SFC } from "react";
import styled, { css } from "styled-components";
import { IEntry } from "../../../../models";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Hidden from "@material-ui/core/Hidden";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

import { BlockImage } from "../../../../componentsV0/BlockImage";
import { Typography } from "../../../../componentsV0/Typography";
import { TypographyButton } from "../../../../componentsV0/TypographyButton";

export type SelectedEntriesProps = {
  entries: IEntry[];
  minEntriesCount: number;
  maxEntriesCount: number;
  selectedEntryIDs: string[];
  onEntryRemoveButtonClick: (entryID: string) => any;
  onAddMoreButtonClick: () => any;
};

export const SelectedEntries: SFC<SelectedEntriesProps> = props => {
  const {
    entries,
    minEntriesCount,
    maxEntriesCount,
    selectedEntryIDs,
    onEntryRemoveButtonClick,
    onAddMoreButtonClick,
  } = props;

  const selectedEntries = entries.filter(e => selectedEntryIDs.includes(e.id));
  const isDeleteEnabled = selectedEntries.length - 1 >= minEntriesCount;
  const isAddMoreEnabled = selectedEntries.length < maxEntriesCount;

  return (
    <>
      <Hidden mdUp>
        <MobileWrapper>
          {selectedEntries.map(entry => (
            <div key={entry.id}>
              <StyledChip
                avatar={<Avatar src={entry.logoUrlByWidth["48"]} />}
                // TODO: Select correct localization.
                label={entry.title.en}
                onClick={() => onEntryRemoveButtonClick(entry.id)}
                onDelete={() => onEntryRemoveButtonClick(entry.id)}
              />
            </div>
          ))}

          {isAddMoreEnabled && (
            // <StyledChip
            //   label="Add More"
            //   onClick={onAddMoreButtonClick}
            //   style={{ justifyContent: "center" }}
            // />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 0,
                marginRight: 8,
                marginTop: 32,
                marginBottom: -8,
              }}
            >
              <TypographyButton
                color="primary"
                variant="contained"
                filled
                onClick={onAddMoreButtonClick}
                style={{
                  height: 16,
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                Add More
              </TypographyButton>
            </div>
          )}
        </MobileWrapper>
      </Hidden>
      <Hidden smDown>
        <TabletWrapper>
          <StyledCarousel>
            {selectedEntries.map(entry => (
              // TODO: Using onMouseDown due to:
              // https://github.com/FormidableLabs/nuka-carousel/issues/399
              <EntryButton
                key={entry.id}
                disabled={!isDeleteEnabled}
                onMouseDown={() => onEntryRemoveButtonClick(entry.id)}
              >
                <StyledBlockImage src={entry.logoUrlByWidth["48"]} />

                {isDeleteEnabled && (
                  <StyledAvatar>
                    <Remove />
                  </StyledAvatar>
                )}

                {/* TODO: Select correct localization. */}
                <StyledTypography>{entry.title.en}</StyledTypography>
              </EntryButton>
            ))}

            {isAddMoreEnabled && (
              // TODO: Using onMouseDown due to:
              // https://github.com/FormidableLabs/nuka-carousel/issues/399
              <EntryButton onMouseDown={onAddMoreButtonClick}>
                <AddMoreBlock>
                  <Add />
                </AddMoreBlock>

                {/* TODO: Select correct localization. */}
                <Typography>Add More</Typography>
              </EntryButton>
            )}
          </StyledCarousel>
        </TabletWrapper>
      </Hidden>
    </>
  );
};

const MobileWrapper = styled.div`
  & > * {
    margin: ${({ theme }) => theme.spacing(1)}px;
  }
`;

const StyledChip = styled(Chip).attrs({
  classes: { label: "selected-entries-chip-label" },
})`
  display: flex;
  justify-content: space-between;
  border-radius: 0;

  .selected-entries-chip-label {
    display: block;
    min-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const TabletWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
`;

const EntryButton = styled.button`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }

  > *:last-child {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`;

const StyledAvatar = styled(Avatar)`
  position: absolute;
  width: 24px;
  height: 24px;
  right: -4px;
  top: -4px;
`;

const blockStyle = css`
  width: 100px;
  height: 100px;
  padding: 26px;
  background-color: ${({ theme }) => theme.palette.grey["200"]};
`;

const StyledBlockImage = styled(BlockImage)`
  ${blockStyle};
`;

const AddMoreBlock = styled.div`
  ${blockStyle};
  padding: 16px;

  svg {
    width: 100%;
    height: 100%;
    fill: #828282;
  }
`;

const StyledTypography = styled(Typography)`
  text-overflow: ellipsis;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledCarousel = styled(
  (props: { children?: ReactNode; className?: string }) => (
    <div className={props.className}>
      <Carousel
        slideWidth="120px"
        dragging={false}
        swiping={false}
        renderCenterLeftControls={null as any}
        renderCenterRightControls={null as any}
        renderBottomCenterControls={api => <CarouselBottomNav {...api} />}
      >
        {props.children}
      </Carousel>
    </div>
  ),
)`
  width: 100%;

  .slider {
    height: 132px !important;
  }

  .slider-frame {
    padding-top: 4px !important;
  }
`;

const CarouselBottomNav = styled(
  (props: CarouselSlideRenderControlProps & { className?: string }) => {
    if (!props.frameWidth || typeof props.frameWidth !== "number") return null;
    const slidesShown = Math.floor((props.frameWidth + 20) / 120);
    if (slidesShown === props.slideCount) return null;

    const buttonCount = Math.ceil(props.slideCount / slidesShown);
    const selectedIndex = Math.floor(props.currentSlide / slidesShown);
    if (buttonCount === 1) return null;

    return (
      <div className={props.className}>
        {Array.from({ length: buttonCount }, (_, index) => (
          <div
            key={index}
            className={`carousel-bottom-nav-button ${
              index === selectedIndex
                ? "carousel-bottom-nav-button--selected"
                : ""
            }`}
            onClick={() => props.goToSlide(index * slidesShown)}
          >
            <span />
          </div>
        ))}
      </div>
    );
  },
)`
  display: flex;
  position: absolute;
  top: 4px;
  left: -50%;
  transform: translateX(-50%);
  cursor: pointer;

  .carousel-bottom-nav-button {
    height: 16px;
    padding-top: 8px;
  }

  .carousel-bottom-nav-button > span {
    display: block;
    width: 100px;
    height: 2px;
    margin: 0 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.grey["500"]};
  }

  .carousel-bottom-nav-button--selected > span {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;
